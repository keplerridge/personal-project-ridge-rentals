INSERT INTO users(
    email,
    password,
    admin
) VALUES (
    $1,
    $2,
    $3
)
RETURNING user_id, email, admin;