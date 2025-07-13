# Mini Currency Wallet

A modern, multi-currency wallet web application with real-time exchange rates, transaction management, and a beautiful UI. This guide will help you run the project locally using Docker, even if you have no prior experience with Docker or web development.

---

## Prerequisites

- **Docker** and **Docker Compose** installed on your machine ([Download Docker Desktop](https://www.docker.com/products/docker-desktop/))
- (Optional) A web browser (Chrome, Firefox, Edge, etc.)

---

## 1. Clone the Project

Open a terminal and run:

```sh
git clone <repository-url>
cd Mini-Currency-Wallet
```

Replace `<repository-url>` with the actual URL of this repository.

---

## 2. Environment Variables (.env)

Before running the project, make sure you have a `.env` file in the project root with the following content (edit values as needed):

```env
# Database configuration
MYSQL_DATABASE=currency_wallet
MYSQL_USER=user
MYSQL_PASSWORD=password
MYSQL_ROOT_PASSWORD=rootpassword
```

> **Note:** These values must match the database settings in `docker-compose.yml` and `backend/config.php`.

---

## 3. Start All Services with Docker Compose

Run:

```sh
docker compose up -d --build
```

This will build and start all required services:

- **Frontend** (React/Next.js)
- **Backend** (PHP)
- **Database** (MySQL)
- **phpMyAdmin** (for database management)
- **nginx** (reverse proxy)

> **Note:** The first run may take a few minutes as Docker downloads and builds images.

---

## 4. Database Migrations (Automatic)

- The backend includes an automatic migration script (`backend/migrate.php`).
- Every time you start the project with Docker Compose, the migration script will run before any seed data is inserted.
- This ensures your database schema is always up-to-date with the latest structure.
- **You do not need to manually create or update tables.**
- If you want to add new tables or columns, simply update `migrate.php` with the relevant SQL.

---

## 5. Access the Application

- **Main App:** [http://localhost](http://localhost)
- **Database Admin (phpMyAdmin):** [http://localhost:8080](http://localhost:8080)
  - Username: `user`
  - Password: `password`

---

## 6. (Optional) Add Demo Exchange Rate Data

If the exchange rates graph is empty, you can add demo data for testing:

1. Go to [phpMyAdmin](http://localhost:8080)
2. Select the `currency_wallet` database and the `exchange_rates` table
3. Click the **SQL** tab and paste the following:

```sql
INSERT INTO exchange_rates (currency, rate, date) VALUES
('USD', 3.75, '2025-07-13'),
('USD', 3.74, '2025-07-12'),
('USD', 3.76, '2025-07-11'),
('USD', 3.755, '2025-07-10'),
('USD', 3.77, '2025-07-09'),
('USD', 3.76, '2025-07-08'),
('USD', 3.75, '2025-07-07'),
('USD', 3.74, '2025-07-06'),
('USD', 3.73, '2025-07-05'),
('USD', 3.72, '2025-07-04'),
('EUR', 4.05, '2025-07-13'),
('EUR', 4.06, '2025-07-12'),
('EUR', 4.07, '2025-07-11');
```

4. Click **Go** to execute
5. Refresh the app at [http://localhost](http://localhost) and check the "Exchange Rates" tab

---

## 7. Useful Docker Commands

- **Stop all services:**
  ```sh
  docker compose down
  ```
- **View logs for a service (e.g., backend):**
  ```sh
  docker compose logs backend
  ```
- **Rebuild after code changes:**
  ```sh
  docker compose up -d --build
  ```

---

## 8. Troubleshooting

- **App not loading?**
  - Make sure Docker Desktop is running
  - Make sure you are visiting [http://localhost](http://localhost) (not :3000 or :3001)
- **phpMyAdmin login fails?**
  - Use username `user` and password `password`
- **Exchange rates graph is empty?**
  - Add demo data as shown above
- **Port already in use?**
  - Stop other apps using the same port, or change the port mapping in `docker-compose.yml`
- **Still stuck?**
  - Check logs with `docker compose logs <service>`
  - Restart Docker Desktop

---

## 9. Project Structure (Overview)

- `app/` – Frontend (React/Next.js)
- `backend/` – Backend (PHP API scripts)
- `backend/migrate.php` – Database migration script (runs automatically)
- `backend/fetch_rates.php` – Script to fetch real exchange rates from Bank of Israel
- `backend/get_rates.php` – API endpoint for frontend to get rates
- `backend/save_transaction.php` – API endpoint to save transactions
- `backend/get_transactions.php` – API endpoint to get all transactions
- `docker-compose.yml` – Docker multi-service configuration
- `nginx.conf` – nginx reverse proxy configuration

---

## 10. No Need for Manual Node.js or PHP Setup!

All dependencies and services run inside Docker containers. You do **not** need to install Node.js, PHP, or MySQL on your machine.

---

## 11. Need Help?

If you run into issues, check the troubleshooting section above or contact the project maintainer.
