package com.kenewang.share2teach.files;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KeywordRepository extends JpaRepository<KeywordEntity, Long> {

    Optional<KeywordEntity> findByKeywordName(String keywordName);
}
