package com.othex.connectorarchive.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "T_CUSTOMER_PART_NUMBER")
public class CustomerPartNumber {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "customer")
	private String customerName;

	@Column(name = "part_number")
	private String customerPartNumber;

	@Column(name = "description")
	private String description;

	@JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "m_connector_id")
	private Connector connector;
}