<?php
// הגדרות להצגת שגיאות - רק בסביבת פיתוח!
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/db.php';

$data = json_decode(file_get_contents('php://input'), true);

$type = $data['type'] ?? null; // deposit/withdrawal/transfer
$amount = $data['amount'] ?? null;
$currency = $data['currency'] ?? null;
$description = $data['description'] ?? '';

if (!$type || !$amount || !$currency) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

try {
    $stmt = $pdo->prepare('INSERT INTO transactions (type, amount, currency, description, date) VALUES (?, ?, ?, ?, NOW())');
    $stmt->execute([$type, $amount, $currency, $description]);
    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save transaction: ' . $e->getMessage()]);
}