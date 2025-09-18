package com.kenewang.share2teach.files;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SubjectRepository extends JpaRepository<SubjectEntity, Long>{
     @Query("SELECT s.subjectName FROM SubjectEntity s")
    List<String> findAllSubjectNames();
    
} 