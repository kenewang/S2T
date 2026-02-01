package com.kenewang.share2teach.files;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class FAQController {

    private final FAQService faqService;

    public FAQController(FAQService faqService) {
        this.faqService = faqService;
    }

    @GetMapping("/faqs/ids")
    public List<Long> getFAQIds() {
        return faqService.getFirst20FAQIds();
    }

    @GetMapping("/faqs/questions")
    public List<String> getFAQQuestions() {
        return faqService.getFirst20FAQQuestions();
    }

    @GetMapping("/faqs/answers")
    public List<String> getFAQAnswers() {
        return faqService.getFirst20FAQAnswers();
    }
}
