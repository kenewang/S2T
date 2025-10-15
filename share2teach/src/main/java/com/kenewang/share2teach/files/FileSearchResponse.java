package com.kenewang.share2teach.files;

public class FileSearchResponse {
    private Long fileId;
    private String fileName;
    private String filePath;
    private Double fileRating;

    public FileSearchResponse(Long fileId, String fileName, String filePath, Double fileRating) {
        this.fileId = fileId;
        this.fileName = fileName;
        this.filePath = filePath;
        this.fileRating = fileRating;
    }

    // Getters only (setters optional)
    public Long getFileId() {
        return fileId;
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
