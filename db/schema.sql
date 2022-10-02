DROP DATABASE IF EXISTS wellfit_db;
CREATE DATABASE wellfit_db;

USE wellfit_db;


CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password TEXT NOT NULL
);



CREATE TABLE recipes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    calories DECIMAL(30,20) NOT NULL,
    ca DECIMAL(30,20) NOT NULL,
    chocdf DECIMAL(30,20) NOT NULL,
    chole DECIMAL(30,20) NOT NULL,
    fat DECIMAL(30,20) NOT NULL,
    fe DECIMAL(30,20) NOT NULL,
    fibtg DECIMAL(30,20) NULL,
    k DECIMAL(30,20) NOT NULL,
    na DECIMAL(30,20) NOT NULL,
    procnt DECIMAL(30,20) NOT NULL,
    sugar DECIMAL(30,20) NOT NULL,
    yield INT NOT NULL,
    
    image_id INT,

    user_id INT,

    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE SET NULL
);
-- var nutrientsToInclude = ["CA", "CHOCDF", "CHOLE", "FAT", "FE", "FIBTG", "K", "NA", "PROCNT", "SUGAR"];

CREATE TABLE current_recipes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,

    FOREIGN KEY(recipe_id)
    REFERENCES recipes(id)
    ON DELETE SET NULL

);

CREATE TABLE images (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image_link TEXT,

    recipe_id INT,
    ingredient_id INT,

    FOREIGN KEY(recipe_id)
    REFERENCES recipes(id)
    ON DELETE SET NULL

    -- FOREIGN KEY(ingredient_id)
    -- REFERENCES ingredients(id)
    -- ON DELETE SET NULL
);

CREATE TABLE ingredients (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    food VARCHAR(100),
    food_category VARCHAR(100),
    food_id VARCHAR(100),
    image TEXT,
    measure VARCHAR(30),
    quantity DECIMAL(30,20),
    text TEXT,
    weight DECIMAL(30,20),
    calories DECIMAL(30,20) NOT NULL,
    ca DECIMAL(30,20) NOT NULL,
    chocdf DECIMAL(30,20) NOT NULL,
    chole DECIMAL(30,20) NOT NULL,
    fat DECIMAL(30,20) NOT NULL,
    fe DECIMAL(30,20) NOT NULL,
    fibtg DECIMAL(30,20) NULL,
    k DECIMAL(30,20) NOT NULL,
    na DECIMAL(30,20) NOT NULL,
    procnt DECIMAL(30,20) NOT NULL,
    sugar DECIMAL(30,20) NOT NULL,
    active BOOLEAN,
    original BOOLEAN,
    recipe_id INT,
    

    FOREIGN KEY(recipe_id)
    REFERENCES recipes(id)
    ON DELETE SET NULL
);

CREATE TABLE workouts ( 
    id INT NOT NULL AUTO_INCREMENT, 
    exercise VARCHAR(45) NOT NULL, 
    sets INT NOT NULL, 
    reps INT NOT NULL, 
    weight INT NOT NULL, 
    comments TEXT, 
    status VARCHAR(10), 
    PRIMARY KEY (`id`),

    user_id INT,

    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE SET NULL
); 
    

SELECT * FROM ingredients
    WHERE id=1;