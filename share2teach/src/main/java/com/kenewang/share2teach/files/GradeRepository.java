package com.kenewang.share2teach.files;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface GradeRepository extends JpaRepository<GradeEntity, Long> {

    @Query("SELECT g FROM GradeEntity g ORDER BY g.gradeName DESC")
    List<GradeEntity> findAllOrderByGradeName();
}
