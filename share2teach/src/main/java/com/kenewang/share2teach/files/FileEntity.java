package com.kenewang.share2teach.files;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;

@Entity
@Table(name = "file", schema = "public")
public class FileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")

    private Long id;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "storage_path")
    private String storagePath;

    @Column(name = "rating")
    private Double fileRating;

    @ManyToOne
    @JoinColumn(name = "subject", referencedColumnName = "subject_id")
    private SubjectEntity subject;

    @ManyToOne
    @JoinColumn(name = "grade", referencedColumnName = "grade_id")
    private GradeEntity grade;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "file_keyword", schema = "public", joinColumns = @JoinColumn(name = "file_id"), inverseJoinColumns = @JoinColumn(name = "keyword_id"))

    private List<KeywordEntity> keywords = new ArrayList<>();

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getStoragePath() {
        return storagePath;
    }

    public void setStoragePath(String storagePath) {
        this.storagePath = storagePath;
    }

    public Double getFileRating() {
        return fileRating;
    }

    public void setFileRating(Double fileRating) {
        this.fileRating = fileRating;
    }

    public SubjectEntity getSubject() {
        return subject;
    }

    public void setSubject(SubjectEntity subject) {
        this.subject = subject;
    }

    public GradeEntity getGrade() {
        return grade;
    }

    public void setGrade(GradeEntity grade) {
        this.grade = grade;
    }

    public List<KeywordEntity> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<KeywordEntity> keywords) {
        this.keywords = keywords;
    }
}
