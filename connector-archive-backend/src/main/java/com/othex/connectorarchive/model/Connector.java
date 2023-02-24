package com.othex.connectorarchive.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "T_CONNECTORS")
public class Connector {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "connector_id")
	private long id;

	@Column(name = "con_part_number")
	private String partNumber;
	
	@Column(name = "con_supplier")
	private String supplier;
	
	@Column(name = "con_color")
	private String color;
	
	@Column(name = "con_image")
	private String image;
		
	@Lob
	@Column(name = "con_thumbnail")
	private byte[] thumbnail;
	
	@Column(name = "con_cavities_number")
	private String cavitiesNumber;
	
	@Column(name = "con_description")
	private String description;
	
	@Column(name = "con_creation_date")
	private String creationDate;
	
	@Column(name = "con_update_date")
	private String updateDate;

	@OneToMany(mappedBy="connector", fetch = FetchType.EAGER)
	private List<Detection> detections;
	
	@OneToMany(mappedBy="connector", fetch = FetchType.EAGER)
	private List<Document> documents;

	@OneToMany(mappedBy="connector", fetch = FetchType.EAGER)
	private List<Project> projects;
}
