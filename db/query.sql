SELECT id, text, calories, ca, chocdf, chole, fat, fe, fibtg, k, na, procnt, sugar, active FROM ingredients
    WHERE recipe_id=4;

SELECT 
    ROUND(SUM(calories)) AS total_calories,
    ROUND(SUM(ca)) AS total_calcium,
    ROUND(SUM(chocdf)) AS total_carbs,
    ROUND(SUM(chole)) AS total_cholesterol,
    ROUND(SUM(fat)) AS total_fat,
    ROUND(SUM(fe)) AS total_iron,
    ROUND(SUM(fibtg)) AS total_fiber,
    ROUND(SUM(k)) AS total_potassium,
    ROUND(SUM(na)) AS total_sodium,
    ROUND(SUM(procnt)) AS total_protein,
    ROUND(SUM(sugar)) AS total_sugar
FROM ingredients
WHERE recipe_id=4 AND active=1;

UPDATE recipes, (
    SELECT 
        SUM(calories) AS total_calories,
        SUM(ca) AS total_calcium,
        SUM(chocdf) AS total_carbs,
        SUM(chole) AS total_cholesterol,
        SUM(fat) AS total_fat,
        SUM(fe) AS total_iron,
        SUM(fibtg) AS total_fiber,
        SUM(k) AS total_potassium,
        SUM(na) AS total_sodium,
        SUM(procnt) AS total_protein,
        SUM(sugar) AS total_sugar
    FROM ingredients
    WHERE recipe_id=4 AND active=1
) AS src
SET 
    calories = src.total_calories,
    ca = src.total_calcium,
    chocdf = src.total_carbs,
    chole = src.total_cholesterol,
    fat = src.total_fat,
    fe = src.total_iron,
    fibtg = src.total_fiber,
    k = src.total_potassium,
    na = src.total_sodium,
    procnt = src.total_protein,
    sugar = src.total_sugar;
    

SELECT 
    ROUND(SUM(calories)) AS total_calories,
    ROUND(SUM(ca)) AS total_calcium,
    ROUND(SUM(chocdf)) AS total_carbs,
    ROUND(SUM(chole)) AS total_cholesterol,
    ROUND(SUM(fat)) AS total_fat,
    ROUND(SUM(fe)) AS total_iron,
    ROUND(SUM(fibtg)) AS total_fiber,
    ROUND(SUM(k)) AS total_potassium,
    ROUND(SUM(na)) AS total_sodium,
    ROUND(SUM(procnt)) AS total_protein,
    ROUND(SUM(sugar)) AS total_sugar
FROM recipes
WHERE id=4;

SELECT COUNT(active) FROM ingredients 
WHERE recipe_id=4 AND active=1;

-- Calories: 675.00643958333390000000
-- Calcium: 54.93151193766527000000
-- Carbs: 39.51153622916676000000
-- Cholesterol: 111.36000000000000000000
-- Fat: 37.18164341666667400000
-- Iron: 2.24849225528875200000
-- Fiber: 1.91634916666673580000
-- Potassium: 544.43316509034510000000
-- Sodium: 1971.28856357500560000000
-- Protein: 43.30479418750005000000
-- Sugar: 1.47518706250002140000