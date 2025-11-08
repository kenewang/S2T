package com.kenewang.share2teach.files;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepository;

    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public List<String> getAllSubjectNames() {
        return subjectRepository.findAllSubjectNames();
    }

    List<SubjectEntity> getAllSubjects() {
        return subjectRepository.findAllOrderBySubjectName();
    }
}