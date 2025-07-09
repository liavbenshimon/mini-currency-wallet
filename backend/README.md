<?php
// backend/README.md
# PHP Backend for Mini Currency Wallet

## Endpoints

- `/fetch_rates?start=YYYY-MM-DD&end=YYYY-MM-DD` — Fetches and stores historical rates from Bank of Israel for USD/EUR/GBP→ILS
- `/get_rates?currency=USD&start=YYYY-MM-DD&end=YYYY-MM-DD` — Gets stored rates from MySQL

## Setup

1. Run `docker-compose up --build` from the project root.
2. Initialize the database table:
   - `docker-compose exec backend php init_db.php`
3. Fetch rates:
   - `http://localhost:8000/fetch_rates?start=2023-01-01&end=2024-01-01`
4. Get rates:
   - `http://localhost:8000/get_rates?currency=USD&start=2023-01-01&end=2024-01-01`
