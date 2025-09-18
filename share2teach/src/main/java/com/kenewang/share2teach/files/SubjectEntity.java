package com.kenewang.share2teach.files;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "subject", schema = "public")

public class SubjectEntity{
    @Id
    @Column(name = "subject_id") // primary kPey (must include it)
    private Long id;

    @Column(name = "subject_name")
    private String subjectName;

    //getters and setters
    public Long getId(){return id;}
    public void setId(Long id){this.id = id;}

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }
}