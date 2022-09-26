DROP DATABASE IF EXISTS wellfit_db;
CREATE DATABASE wellfit_db;

USE wellfit_db;

CREATE TABLE current_results (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    calories INT NOT NULL
) 
    

