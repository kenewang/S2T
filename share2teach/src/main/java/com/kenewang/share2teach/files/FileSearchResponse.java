package com.kenewang.share2teach.files;

public class FileSearchResponse {
    private Long id;
    private String fileName;
    private String filePath;
    private Double fileRating;
    private String gradeName;

    public FileSearchResponse(Long id, String fileName, String filePath, Double fileRating, String gradeName) {
        this.id = id;
        this.fileName = fileName;
        this.filePath = filePath;
        this.fileRating = fileRating;
        this.gradeName = gradeName;
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

    public String getGradeName() {
        return gradeName;
    }

}
