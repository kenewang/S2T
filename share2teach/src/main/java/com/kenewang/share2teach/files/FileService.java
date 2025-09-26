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

    public List<String> getFirst20FileNames() {
        return fileRepository.findFirst20FileNames();
    }

    public List<String> getFirst20FileLinks() {
        return fileRepository.findFirst20FileLinks();
    }

    public List<String> getFirst20FileRatings() {
        return fileRepository.findFirst20FileRatings();
    }

    public List<String> getFileNamesBySubject(String subject) {
        Pageable limit = PageRequest.of(0, 20);
        return fileRepository.findFileNamesBySubject(subject, limit);
    }

    public List<String> getFileLinksBySubject(String subject) {
        Pageable limit = PageRequest.of(0, 20);
        return fileRepository.findFileLinksBySubject(subject, limit);
    }

    public List<String> getFileRatingsBySubject(String subject) {
        Pageable limit = PageRequest.of(0, 20);
        return fileRepository.findFileRatingsBySubject(subject, limit);
    }
}