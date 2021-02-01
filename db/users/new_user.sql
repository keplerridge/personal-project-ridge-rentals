INSERT INTO users(
    email,
    password,
    admin
) VALUES (
    $1,
    $2,
    FALSE
)
RETURNING user_id, email, admin;