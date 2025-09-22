package com.kenewang.share2teach.files;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "file", schema = "public")

public class FileEntity {

    @Id
    @Column(name = "file_id") // primary key (must include it)
    private Long id;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "storage_path")
    private String storage_path;

    @Column(name = "rating")
    private String file_rating;

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getFileLinks() { return storage_path; }
    public void setFileLinks(String storage_path) { this.storage_path = storage_path; }

    public String getFileRatings() {return file_rating;}
    public void setFileRatings(String file_rating) {this.file_rating = file_rating;}
}
