<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once __DIR__ . '/db.php';

try {
    $stmt = $pdo->query('SELECT id, type, amount, currency, description, date FROM transactions ORDER BY date DESC');
    $transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($transactions);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch transactions: ' . $e->getMessage()]);
} 