package com.kenewang.share2teach.files;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FileService {

    private final FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

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
        // Fetch files matching the query
        List<FileEntity> files = fileRepository.findByFileNameContainingIgnoreCase(query);

        // Convert to DTO
        return files.stream().map(file -> new FileSearchResponse(file.getId(), file.getFileName(),
                file.getStoragePath(), file.getFileRating())).toList();
    }

    public List<FileEntity> getFilesBySubjectAndGrade(String subjectName, String category) {
        List<String> grades;

        switch (category.toLowerCase()) {
        case "primary":
        case "R - 7":
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

        System.out.println("Category: " + category);
        System.out.println("Grades being searched: " + grades);

        return fileRepository.findBySubjectAndGradeNames(subjectName, grades);
    }

    public List<FileEntity> getFilesByGrade(String category) {
        List<String> grades;

        switch (category.toLowerCase()) {
        case "primary":
        case "R - 7":
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

}