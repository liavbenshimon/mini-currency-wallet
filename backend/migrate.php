<?php
require_once __DIR__ . '/db.php';

$queries = [
    // Ensure 'exchange_rates' table exists
    "CREATE TABLE IF NOT EXISTS exchange_rates (
        id INT AUTO_INCREMENT PRIMARY KEY,
        currency VARCHAR(3) NOT NULL,
        rate DECIMAL(15,6) NOT NULL,
        date DATE NOT NULL,
        UNIQUE KEY unique_rate (currency, date)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    // Ensure 'transactions' table exists
    "CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(20) NOT NULL,
        amount DECIMAL(15,2) NOT NULL,
        currency VARCHAR(3) NOT NULL,
        description VARCHAR(255),
        date DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
    // Add more ALTER TABLE or CREATE TABLE statements as needed
];

foreach ($queries as $sql) {
    try {
        $pdo->exec($sql);
    } catch (PDOException $e) {
        echo "Migration error: " . $e->getMessage() . PHP_EOL;
        exit(1);
    }
}
echo "Migrations completed successfully." . PHP_EOL; 