package com.kenewang.share2teach.files;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Long> {
    @Query("""
                SELECT r FROM ReportEntity r
                JOIN FETCH r.reporter u
                JOIN FETCH r.file f
                WHERE r.status = 'pending'
                ORDER BY r.created_at DESC
            """)
    List<ReportEntity> findAllPendingReports();
}
