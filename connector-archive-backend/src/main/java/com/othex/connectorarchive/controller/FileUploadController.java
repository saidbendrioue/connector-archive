package com.othex.connectorarchive.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.othex.connectorarchive.model.Connector;
import com.othex.connectorarchive.utils.FileUtils;

@CrossOrigin
@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    @PostMapping("/upload")
    public void createConnector(@RequestPart("path") String path,
            @RequestParam(required = true) List<MultipartFile> files)
            throws Exception {

        FileUtils.writeFilesToDirectory(path, files);
    }

}
