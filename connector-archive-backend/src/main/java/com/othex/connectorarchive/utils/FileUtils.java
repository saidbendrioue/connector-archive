package com.othex.connectorarchive.utils;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.imageio.ImageIO;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;

public class FileUtils {

	public static byte[] writeFileToDirectory(MultipartFile file) throws IOException {
		// Get the filename of the uploaded file
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		// Create a path for storing the file
		Path path = Paths.get("images/");
		if (!Files.exists(path)) {
			Files.createDirectories(path);
		}

		// Save the file to the path
		InputStream inputStream = file.getInputStream();
		Files.copy(inputStream, path.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

		BufferedImage asBufferedImage = Thumbnails.of(file.getInputStream()).size(100, 100).asBufferedImage();

		ByteArrayOutputStream bos = new ByteArrayOutputStream();

		ImageIO.write(asBufferedImage, "png", bos);
		return bos.toByteArray();
	}

}