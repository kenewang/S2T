package com.kenewang.share2teach.files;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class FileController {

    private final FileRepository repository;

    public FileController(FileRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/files/names")
    public List<String> getFileNames() {
        return repository.findAllFileNames();
    }

    @GetMapping("/files/links")
    public List<String> getFileLinks() {
        return repository.findFileLinks();
    }
}

