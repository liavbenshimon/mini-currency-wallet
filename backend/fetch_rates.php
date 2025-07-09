<?php
// backend/fetch_rates.php
require_once __DIR__ . '/db.php';
$config = require __DIR__ . '/config.php';

$currencies = [
    'USD' => 'RER_USD_ILS',
    'EUR' => 'RER_EUR_ILS',
    'GBP' => 'RER_GBP_ILS',
];

$start = $_GET['start'] ?? '2023-01-01';
$end = $_GET['end'] ?? '2024-01-01';

$results = [];
foreach ($currencies as $code => $series) {
    $url = $config['boi_api']['base_url'] . "$series?startperiod=$start&endperiod=$end";
    $response = file_get_contents($url);
    if ($response === false) continue;
    $data = json_decode($response, true);
    // Parse SDMX-JSON (Bank of Israel returns SDMX-JSON)
    $parsed = json_decode($response, true);
    if (!$parsed) continue;
    // Find rates in the structure (simplified, real parsing may need more work)
    $seriesData = $parsed['data']['dataSets'][0]['series'] ?? [];
    $dates = $parsed['data']['structure']['dimensions']['observation'][0]['values'] ?? [];
    foreach ($seriesData as $seriesKey => $seriesVal) {
        foreach ($seriesVal['observations'] as $dateIdx => $obs) {
            $date = $dates[$dateIdx]['id'] ?? null;
            $rate = $obs[0] ?? null;
            if ($date && $rate) {
                // Store in DB
                $stmt = $pdo->prepare("REPLACE INTO exchange_rates (currency, rate, date) VALUES (?, ?, ?)");
                $stmt->execute([$code, $rate, $date]);
                $results[] = [
                    'currency' => $code,
                    'date' => $date,
                    'rate' => $rate
                ];
            }
        }
    }
}
echo json_encode($results);
