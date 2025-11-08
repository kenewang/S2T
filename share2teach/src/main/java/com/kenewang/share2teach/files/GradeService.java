package com.kenewang.share2teach.files;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GradeService {
    private final GradeRepository gradeRepository;

    public GradeService(GradeRepository gradeRepository) {
        this.gradeRepository = gradeRepository;
    }

    public List<GradeEntity> getAllGrades() {
        return gradeRepository.findAllOrderByGradeName();
    }

}
