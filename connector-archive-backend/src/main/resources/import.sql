-- USERS
INSERT INTO t_users VALUES (1, 'said', 'said', 'said', 'said');
INSERT INTO t_users VALUES (2, 'otman', 'otman', 'otman', 'otman');

-- PROPERTY DROP DOWNS
INSERT INTO t_pdp VALUES (1, 'val1', 'type2');

-- CONNECTORS
INSERT INTO t_connectors VALUES (1, 'partNumber1', 'supplier1', 'color', 'imageURL', 'thumbnailString64', 'cavitiesNumber1', 'descripto', '2022-12-01', '2022-12-11');
INSERT INTO `t_connectors`(`connector_id`, `con_part_number`, `con_supplier`, `con_color`, `con_image`, `con_thumbnail`, `con_cavities_number`, `con_description`, `con_creation_date`, `con_update_date`) VALUES (2,'CE103R44', 'TE Connectivity', 'Red', 'imageURL', 'thumbnailString64', '12345', 'descripton', '2022-12-01', '2022-12-11');

-- DETECTIONS
INSERT INTO t_detections VALUES (1, 'name1', 'red', 'description bla', 1);

-- DOCUMENTS
INSERT INTO t_documents VALUES (1, 'filePath001', 1);

-- PROJECTS
INSERT INTO t_projects VALUES (1, 'kufferath', '793EHHB2', 'description' , 1);