package com.kenewang.share2teach.files;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.Map;

import org.springframework.web.reactive.function.BodyInserters;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ModerationService {

    private final FileRepository fileRepository;
    private final ModerationHistoryRepository historyRepository;
    private final UserRepository userRepository; // <-- needed to fetch moderator

    public ModerationService(FileRepository fileRepository, ModerationHistoryRepository historyRepository,
            UserRepository userRepository) {
        this.fileRepository = fileRepository;
        this.historyRepository = historyRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void moderateDocument(Long fileId, Long moderatorId, String action, String comments) {

        if (!action.equals("approved") && !action.equals("rejected")) {
            throw new IllegalArgumentException("Invalid action");
        }

        // Fetch file
        FileEntity file = fileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("File not found"));

        // Fetch moderator
        UserEntity moderator = userRepository.findById(moderatorId)
                .orElseThrow(() -> new IllegalArgumentException("Moderator not found"));

        // Create history entry
        ModerationHistory history = new ModerationHistory();
        history.setFile(file);
        history.setModerator(moderator);
        history.setAction(action);
        history.setComments(comments);

        historyRepository.save(history);

        // Update file status
        file.setStatus(action);
        fileRepository.save(file);
    }
}
