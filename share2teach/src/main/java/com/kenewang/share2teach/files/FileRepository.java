package com.kenewang.share2teach.files;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface FileRepository extends JpaRepository<FileEntity, Long> {

    // Custom query: return only file_name values
    @Query("SELECT f.fileName FROM FileEntity f")
    List<String> findAllFileNames();

    // Custom query: return only file links values
    @Query("SELECT s.storage_path FROM FileEntity s")
    List<String> findFileLinks();
}
