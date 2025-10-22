package com.kenewang.share2teach.files;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class FAQService {

    private final FAQRepository faqRepository;

    public FAQService(FAQRepository faqRepository) {
        this.faqRepository = faqRepository;
    }

    public List<Long> getFirst20FAQIds() {
        return faqRepository.findFirst20FAQIds();
    }

    public List<String> getFirst20FAQQuestions() {
        return faqRepository.findFirst20FAQQuestions();
    }

    public List<String> getFirst20FAQAnswers() {
        return faqRepository.findFirst20FAQAnswers();
    }

}
