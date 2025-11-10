package com.kenewang.share2teach.files;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FAQRepository extends JpaRepository<FAQEntity, Long> {

    // custom queries

    @Query(value = "SELECT faq_id FROM faq LIMIT 20", nativeQuery = true)
    List<Long> findFirst20FAQIds();

    @Query(value = "SELECT question FROM faq LIMIT 20", nativeQuery = true)
    List<String> findFirst20FAQQuestions();

    @Query(value = "SELECT answer FROM faq LIMIT 20", nativeQuery = true)
    List<String> findFirst20FAQAnswers();

}
