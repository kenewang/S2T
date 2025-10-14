package com.kenewang.share2teach.files;

import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class RatingService {

    private final RatingRepository ratingRepository;
    private final FileRepository fileRepository;

    public RatingService(RatingRepository ratingRepository, FileRepository fileRepository) {
        this.ratingRepository = ratingRepository;
        this.fileRepository = fileRepository;
    }

    public double rateFile(Long fileId, Double rating, Long userId, String sessionId) {
        if (fileId == null || rating <= 0) {
            throw new IllegalArgumentException("Please provide a file_id and rating");
        }

        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }

        // ✅ Check if the file exists
        if (!fileRepository.existsById(fileId)) {
            throw new IllegalArgumentException("File not found");
        }

        // ✅ Handle logged-in or anonymous user
        Optional<RatingEntity> existingRating;
        if (userId != null) {
            existingRating = ratingRepository.findByFileIdAndUserId(fileId, userId);
        } else {
            existingRating = ratingRepository.findByFileIdAndSessionId(fileId, sessionId);
        }

        RatingEntity ratingEntity;
        if (existingRating.isPresent()) {
            ratingEntity = existingRating.get();
            ratingEntity.setRating(rating);
        } else {
            ratingEntity = new RatingEntity();
            ratingEntity.setFileId(fileId);
            ratingEntity.setRating(rating);
            if (userId != null) {
                ratingEntity.setUserId(userId);
            } else {
                ratingEntity.setSessionId(sessionId);
            }
        }

        ratingRepository.save(ratingEntity);

        // Calculate and update average rating
        Double newAverage = ratingRepository.findAverageRatingByFileId(fileId);

        // Round to 2 decimal places
        if (newAverage != null) {
            newAverage = Math.round(newAverage * 100.0) / 100.0;
        }

        fileRepository.updateAverageRating(fileId, newAverage);

        return newAverage;

    }
}
