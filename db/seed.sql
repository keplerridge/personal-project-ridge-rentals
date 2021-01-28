CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE rental_equipment(
    equipment_id SERIAL PRIMARY KEY,
    equipment_picture TEXT,
    equipment_description TEXT
);

CREATE TABLE rental_history(
    id SERIAL PRIMARY KEY,
    renter_id INT REFERENCES users(user_id),
    equipment_id INT REFERENCES rental_equipment(equipment_id),
    rental_date DATE DEFAULT current_date
);