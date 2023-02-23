package com.othex.connectorarchive.controller;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@RestController
@RequestMapping("/api/uploadFile")
public class FileUploadController {

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {

        // Get the filename of the uploaded file
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Create a path for storing the file
            Path path = Paths.get("images/");
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }

            // Save the file to the path
            InputStream inputStream = file.getInputStream();
            Files.copy(inputStream, path.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

            return ResponseEntity.ok().body("File uploaded successfully!");
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading file: " + ex.getMessage());
        }
    }

}
