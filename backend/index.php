<?php
// backend/index.php
header('Content-Type: application/json');
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if ($path === '/fetch_rates') {
    require __DIR__ . '/fetch_rates.php';
} elseif ($path === '/get_rates') {
    require __DIR__ . '/get_rates.php';
} else {
    echo json_encode(['error' => 'Invalid endpoint']);
}
