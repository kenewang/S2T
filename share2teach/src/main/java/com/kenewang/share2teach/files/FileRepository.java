package com.kenewang.share2teach.files;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface FileRepository extends JpaRepository<FileEntity, Long> {

    // custom queries

    @Query(value = "SELECT file_id FROM file WHERE status = 'approved' LIMIT 20", nativeQuery = true)
    List<Long> findFirst20FileIds();

    @Query(value = "SELECT file_name FROM file WHERE status = 'approved' LIMIT 20", nativeQuery = true)
    List<String> findFirst20FileNames();

    @Query(value = "SELECT storage_path FROM file WHERE status = 'approved' LIMIT 20", nativeQuery = true)
    List<String> findFirst20FileLinks();

    @Query(value = "SELECT rating FROM file WHERE status = 'approved' LIMIT 20", nativeQuery = true)
    List<Double> findFirst20FileRatings();

    @Query("SELECT f FROM FileEntity f WHERE f.status = 'pending'")
    List<FileEntity> findPendingDocuments();

    @Query("""
            SELECT f.id
            FROM FileEntity f
            WHERE LOWER(f.subject.subjectName) = LOWER(:subjectName)
              AND f.status = 'approved'
            """)
    List<Long> findFileIdsBySubject(@Param("subjectName") String subjectName, Pageable pageable);

    @Query("""
            SELECT f.fileName FROM FileEntity f WHERE LOWER(f.subject.subjectName) = LOWER(:subjectName) AND
            f.status = 'approved'
            """)
    List<String> findFileNamesBySubject(@Param("subjectName") String subjectName, Pageable pageable);

    @Query("""
            SELECT f.storagePath FROM FileEntity f WHERE LOWER(f.subject.subjectName) = LOWER(:subjectName)
            AND f.status = 'approved'
            """)
    List<String> findFileLinksBySubject(@Param("subjectName") String subjectName, Pageable pageable);

    @Query("""
            SELECT f.fileRating FROM FileEntity f WHERE LOWER(f.subject.subjectName) = LOWER(:subjectName)
            AND f.status = 'approved'
            """)
    List<Double> findFileRatingsBySubject(@Param("subjectName") String subjectName, Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE FileEntity f SET f.fileRating = :averageRating WHERE f.id = :fileId")
    void updateAverageRating(@Param("fileId") Long fileId, @Param("averageRating") Double averageRating);

    // Search by file name, case-insensitive
    List<FileEntity> findByFileNameContainingIgnoreCase(String query);

    // Make query case-insensitive because Even if values match, Hibernate
    // comparison is case-sensitive by default.
    @Query("""
            SELECT f FROM FileEntity f
            WHERE LOWER(f.subject.subjectName) = LOWER(:subjectName)
              AND LOWER(f.grade.gradeName) IN :grades AND LOWER(f.status) = 'approved'
            """)
    List<FileEntity> findBySubjectAndGradeNames(@Param("subjectName") String subjectName,
            @Param("grades") List<String> grades);

    // Make query case-insensitive because Even if values match, Hibernate
    // comparison is case-sensitive by default.
    @Query("SELECT f FROM FileEntity f JOIN f.grade g WHERE LOWER(g.gradeName) IN :grades")
    List<FileEntity> findByGradeNames(@Param("grades") List<String> grades);

    @Query("SELECT f.storagePath FROM FileEntity f WHERE f.id = :fileId")
    String findStoragePathByFileId(@Param("fileId") Long fileId);

}
