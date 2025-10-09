package com.kenewang.share2teach.files;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface FileRepository extends JpaRepository<FileEntity, Long> {

    // custom queries
    @Query(value = "SELECT file_name FROM file LIMIT 10", nativeQuery = true)
    List<String> findFirst20FileNames();

    @Query(value = "SELECT storage_path FROM file LIMIT 10", nativeQuery = true)
    List<String> findFirst20FileLinks();

    @Query(value = "SELECT rating FROM file LIMIT 10", nativeQuery = true)
    List<String> findFirst20FileRatings();

    @Query("""
            SELECT f.fileName FROM FileEntity f WHERE LOWER(f.subject.subjectName) = LOWER(:subjectName) """)
    List<String> findFileNamesBySubject(@Param("subjectName") String subjectName, Pageable pageable);

    @Query("""
            SELECT f.storage_path FROM FileEntity f WHERE LOWER(f.subject.subjectName) = LOWER(:subjectName) """)
    List<String> findFileLinksBySubject(@Param("subjectName") String subjectName, Pageable pageable);

    @Query("""
            SELECT f.file_rating FROM FileEntity f WHERE LOWER(f.subject.subjectName) = LOWER(:subjectName) """)
    List<String> findFileRatingsBySubject(@Param("subjectName") String subjectName, Pageable pageable);

}
