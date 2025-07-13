<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/db.php';

$url = 'https://boi.org.il/PublicApi/GetExchangeRates';
$response = file_get_contents($url);
if ($response === false) {
    echo json_encode(['error' => 'Failed to fetch rates']);
    exit;
}

$data = json_decode($response, true);
if (!isset($data['exchangeRates'])) {
    echo json_encode(['error' => 'Invalid data from BOI']);
    exit;
}

$results = [];
foreach ($data['exchangeRates'] as $rate) {
    $currency = $rate['key'];
    $value = $rate['currentExchangeRate'];
    $date = substr($rate['lastUpdate'], 0, 10); // YYYY-MM-DD
    // שמור למסד הנתונים
    $stmt = $pdo->prepare("REPLACE INTO exchange_rates (currency, rate, date) VALUES (?, ?, ?)");
    $stmt->execute([$currency, $value, $date]);
    $results[] = [
        'currency' => $currency,
        'date' => $date,
        'rate' => $value
    ];
}

echo json_encode($results);