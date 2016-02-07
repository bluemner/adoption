-- ======================================================
--
--
-- ======================================================
CREATE TABLE Node
(
	node_id INT IDENTITY(1,1) PRIMARY KEY,
	node_title VARCHAR(50) CHARSET utf8,
	node_updated_on TIMESTAMP NOT NULL 
);

CREATE TABLE Node_Element
(
	node_element_id INT IDENTITY(1,1) PRIMARY KEY,
	node_id INT FOREIGN KEY REFERENCES Node(node_id),
	node_element_name VARCHAR(50) CHARSET utf8,
	node_element_value DOUBLE PRECISION,
	node_element_updated_on TIMESTAMP NOT NULL	
);