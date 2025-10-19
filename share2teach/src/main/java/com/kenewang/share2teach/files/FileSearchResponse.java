package com.kenewang.share2teach.files;

public class FileSearchResponse {
    private Long id;
    private String fileName;
    private String filePath;
    private Double fileRating;

    public FileSearchResponse(Long id, String fileName, String filePath, Double fileRating) {
        this.id = id;
        this.fileName = fileName;
        this.filePath = filePath;
        this.fileRating = fileRating;
    }

    // Getters only (setters optional)
    public Long getId() {
        return id;
    }

    public String getFileName() {
        return fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public Double getFileRating() {
        return fileRating;
    }
}
