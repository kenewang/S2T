package com.kenewang.share2teach.files;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.Map;

import org.springframework.web.reactive.function.BodyInserters;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FileService {

    private final FileRepository fileRepository;
    private final KeywordRepository keywordRepository;
    private final SubjectRepository subjectRepository;
    private final GradeRepository gradeRepository;
    private final UserRepository userRepository;

    public FileService(FileRepository fileRepository, KeywordRepository keywordRepository,
            SubjectRepository subjectRepository, GradeRepository gradeRepository, UserRepository userRepository) {
        this.fileRepository = fileRepository;
        this.keywordRepository = keywordRepository;
        this.subjectRepository = subjectRepository;
        this.gradeRepository = gradeRepository;
        this.userRepository = userRepository;
    }
    // ===== EXISTING FILE FETCH METHODS =====

    public List<Long> getFirst20FileIds() {
        return fileRepository.findFirst20FileIds();
    }

    public List<String> getFirst20FileNames() {
        return fileRepository.findFirst20FileNames();
    }

    public List<String> getFirst20FileLinks() {
        return fileRepository.findFirst20FileLinks();
    }

    public List<Double> getFirst20FileRatings() {
        return fileRepository.findFirst20FileRatings();
    }

    public List<Long> getFileIdsBySubject(String subject) {
        Pageable limit = PageRequest.of(0, 20);
        return fileRepository.findFileIdsBySubject(subject, limit);
    }

    public List<String> getFileNamesBySubject(String subject) {
        Pageable limit = PageRequest.of(0, 20);
        return fileRepository.findFileNamesBySubject(subject, limit);
    }

    public List<String> getFileLinksBySubject(String subject) {
        Pageable limit = PageRequest.of(0, 20);
        return fileRepository.findFileLinksBySubject(subject, limit);
    }

    public List<Double> getFileRatingsBySubject(String subject) {
        Pageable limit = PageRequest.of(0, 20);
        return fileRepository.findFileRatingsBySubject(subject, limit);
    }

    public List<FileSearchResponse> searchFiles(String query) {
        List<FileEntity> files = fileRepository.findByFileNameContainingIgnoreCase(query);
        return files.stream().map(file -> new FileSearchResponse(file.getId(), file.getFileName(),
                file.getStoragePath(), file.getFileRating())).toList();
    }

    public List<FileEntity> getFilesBySubjectAndGrade(String subjectName, String category) {
        List<String> grades;

        switch (category.toLowerCase()) {
        case "primary":
        case "r - 7":
            grades = List.of("R", "1", "2", "3", "4", "5", "6", "7");
            break;
        case "secondary":
        case "8 - 12":
            grades = List.of("8", "9", "10", "11", "12");
            break;
        case "tertiary":
        case "higher education":
            grades = List.of("Higher Education");
            break;
        default:
            grades = List.of();
        }

        return fileRepository.findBySubjectAndGradeNames(subjectName, grades);
    }

    public List<FileEntity> getPendingDocuments() {
        return fileRepository.findPendingDocuments();
    }

    public List<FileEntity> getFilesByGrade(String category) {
        List<String> grades;

        switch (category.toLowerCase()) {
        case "primary":
        case "r - 7":
            grades = List.of("R", "1", "2", "3", "4", "5", "6", "7");
            break;
        case "secondary":
        case "8 - 12":
            grades = List.of("8", "9", "10", "11", "12");
            break;
        case "tertiary":
        case "higher education":
            grades = List.of("Higher Education");
            break;
        default:
            grades = List.of();
        }

        return fileRepository.findByGradeNames(grades);
    }

    // ===== FILE UPLOAD =====

    public void uploadFile(MultipartFile file, Long subjectId, Long gradeId, String keywords, Long userId)
            throws IOException {

        // ✅ (1) Check file type
        String mimeType = file.getContentType();
        byte[] processedFile = file.getBytes();

        // (Optional) Add watermark depending on type
        /*
         * if ("application/pdf".equals(mimeType)) { processedFile =
         * addWatermarkToPDF(processedFile); } else if ("text/plain".equals(mimeType)) {
         * processedFile = addWatermarkToTxt(processedFile); } else { throw new
         * IllegalArgumentException("Unsupported file format"); }
         */

        // ✅ (2) Upload to SeaweedFS
        String seaweedUrl = uploadToSeaweedFS(file.getOriginalFilename(), mimeType, processedFile);

        // ✅ (3) Fetch Subject & Grade entities
        SubjectEntity subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid subject ID"));

        GradeEntity grade = gradeRepository.findById(gradeId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid grade ID"));

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        // ✅ (4) Save file metadata to database
        FileEntity fileEntity = new FileEntity();
        fileEntity.setFileName(file.getOriginalFilename());
        fileEntity.setStoragePath(seaweedUrl);
        fileEntity.setFileRating(0.0);
        fileEntity.setSubject(subject);
        fileEntity.setGrade(grade);
        fileEntity.setUploadedBy(user);
        fileEntity.setStatus("pending");
        fileRepository.save(fileEntity);

        // ✅ (4) Attach keywords to the file
        attachKeywordsToFile(fileEntity, keywords);
    }

    // ===== HELPER METHODS =====

    @Transactional
    public void attachKeywordsToFile(FileEntity file, String keywordCsv) {
        List<String> keywordList = Arrays.stream(keywordCsv.split(",")).map(String::trim).filter(s -> !s.isEmpty())
                .collect(Collectors.toList());

        List<KeywordEntity> keywordEntities = new ArrayList<>();

        for (String word : keywordList) {
            KeywordEntity keyword = keywordRepository.findByKeywordName(word).orElseGet(() -> {
                KeywordEntity newKeyword = new KeywordEntity();
                newKeyword.setKeywordName(word);
                return keywordRepository.save(newKeyword);
            });
            keywordEntities.add(keyword);
        }

        file.setKeywords(keywordEntities);
        fileRepository.save(file);
    }

    private String uploadToSeaweedFS(String filename, String mimeType, byte[] fileData) throws IOException {
        MultipartBodyBuilder body = new MultipartBodyBuilder();
        body.part("file", new ByteArrayResource(fileData))
                .header("Content-Disposition", "form-data; name=file; filename=" + filename)
                .header("Content-Type", mimeType);

        WebClient client = WebClient.create("http://localhost:9333");

        Map<String, Object> responseMap = client.post().uri("/submit")
                .body(BodyInserters.fromMultipartData(body.build())).retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                }).block();

        // 🟢 Log the entire response map to see what SeaweedFS sent back
        System.out.println("SeaweedFS upload response: " + responseMap);

        if (responseMap != null && responseMap.containsKey("fileUrl")) {
            String url = responseMap.get("fileUrl").toString();
            if (!url.startsWith("http")) {
                url = "http://" + url;
            }
            return url;
        }

        throw new IOException("Failed to upload file to SeaweedFS: missing fileUrl in response");
    }

    // Dummy watermark methods for now
    private byte[] addWatermarkToPDF(byte[] file) {
        return file;
    }

    private byte[] addWatermarkToTxt(byte[] file) {
        return file;
    }

    public String getFileStoragePath(Long fileId) {
        String path = fileRepository.findStoragePathByFileId(fileId);

        if (path == null) {
            throw new IllegalArgumentException("File not found");
        }

        return path;
    }

}
