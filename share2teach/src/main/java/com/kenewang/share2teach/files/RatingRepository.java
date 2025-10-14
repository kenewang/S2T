package com.kenewang.share2teach.files;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RatingRepository extends JpaRepository<RatingEntity, Long> {

    Optional<RatingEntity> findByFileIdAndUserId(Long fileId, Long userId);

    Optional<RatingEntity> findByFileIdAndSessionId(Long fileId, String sessionId);

    @Query("SELECT AVG(r.rating) FROM RatingEntity r WHERE r.fileId = :fileId")
    Double findAverageRatingByFileId(@Param("fileId") Long fileId);
}
