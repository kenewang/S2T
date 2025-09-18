package com.kenewang.share2teach.files;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface FileRepository extends JpaRepository<FileEntity, Long> {

    // Custom query: return only a certain amount of file_names from the db
    @Query(value = "SELECT file_name FROM file LIMIT 4", nativeQuery = true)
    List<String> findFirst20FileNames();

    // Custom query: return only a certain amount of file_links from the db
   @Query(value = "SELECT storage_path FROM file LIMIT 4", nativeQuery = true)
    List<String> findFirst20FileLinks();

   
}
