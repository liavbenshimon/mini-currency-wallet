<?php
// backend/get_rates.php
require_once __DIR__ . '/db.php';

$currency = $_GET['currency'] ?? null;
$start = $_GET['start'] ?? '2023-01-01';
$end = $_GET['end'] ?? '2024-01-01';

if (!$currency) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing currency parameter']);
    exit;
}

$stmt = $pdo->prepare("SELECT currency, rate, date FROM exchange_rates WHERE currency = ? AND date BETWEEN ? AND ? ORDER BY date ASC");
$stmt->execute([$currency, $start, $end]);
$rates = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($rates);
