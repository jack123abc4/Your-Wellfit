DROP DATABASE IF EXISTS wellfit_db;
CREATE DATABASE wellfit_db;

USE wellfit_db;

CREATE TABLE recipes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    calories INT NOT NULL
);


CREATE TABLE current_results (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    calories INT NOT NULL
);

CREATE TABLE workouts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE exercises (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    description TEXT NOT NULL,
    workout_id INT,


    FOREIGN KEY(workout_id)
    REFERENCES workouts(id)
    ON DELETE SET NULL

);

CREATE TABLE equipment (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    workout_id INT,

    FOREIGN KEY(workout_id)
    REFERENCES workouts(id)
    ON DELETE SET NULL
);

CREATE TABLE body_parts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    workout_id INT,

    FOREIGN KEY(workout_id)
    REFERENCES workouts(id)
    ON DELETE SET NULL
);
    

