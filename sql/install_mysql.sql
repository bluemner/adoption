-- ======================================================
-- Description : Creates tables in database specified
--
--
-- ======================================================
CREATE TABLE Node
(
	node_id INT NOT NULL AUTO_INCREMENT,
	node_title VARCHAR(50) CHARSET utf8,
	node_updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (node_id)
);

CREATE TABLE Node_Element
(
	node_element_id INT NOT NULL AUTO_INCREMENT,
	node_id INT NOT NULL,
	node_element_name VARCHAR(50) CHARSET utf8,
	node_element_value DOUBLE PRECISION,
	node_element_updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,	
	PRIMARY KEY (node_element_id),
	FOREIGN KEY (node_id) REFERENCES Node(node_id)
);