<?php
// backend/init_db.php
require_once __DIR__ . '/db.php';

$sql = "CREATE TABLE IF NOT EXISTS exchange_rates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    currency VARCHAR(3) NOT NULL,
    rate DECIMAL(15,6) NOT NULL,
    date DATE NOT NULL,
    UNIQUE KEY unique_rate (currency, date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

try {
    $pdo->exec($sql);
    echo "Table created or already exists.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$sql2 = "CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(20) NOT NULL, -- deposit/withdrawal/transfer
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

try {
    $pdo->exec($sql2);
    echo " Transactions table created or already exists.";
} catch (PDOException $e) {
    echo " Error: " . $e->getMessage();
}
