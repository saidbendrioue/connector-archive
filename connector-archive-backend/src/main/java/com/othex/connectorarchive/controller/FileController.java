package com.othex.connectorarchive.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.othex.connectorarchive.utils.FileUtils;

@CrossOrigin
@RestController
@RequestMapping("/api/files")
public class FileController {

    @PostMapping("/upload")
    public void createConnector(@RequestPart("path") String path,
            @RequestParam(required = true) List<MultipartFile> files)
            throws Exception {

        FileUtils.writeFilesToDirectory(path, files);
    }

    @GetMapping
    public ResponseEntity<byte[]> getFile(@RequestParam("path") String path) {
        var file = Paths.get(path);
        byte[] fileContents = null;
        try {
            fileContents = Files.readAllBytes(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDisposition(ContentDisposition.builder("attachment").filename(path).build());
        return new ResponseEntity<>(fileContents, headers, HttpStatus.OK);
    }
}
