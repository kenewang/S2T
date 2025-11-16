package com.kenewang.share2teach.files;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModerationHistoryRepository extends JpaRepository<ModerationHistory, Long> {
}
