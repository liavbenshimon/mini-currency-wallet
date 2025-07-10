# Quick Start with Docker

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## Configuration

1. Copy the provided `.env` file to the project root and adjust values as needed (DB name, password, currencies, etc).

## Build & Run

```bash
git clone <repository-url>
cd Mini-Currency-Wallet
# Make sure .env is in the root directory
docker-compose up --build
```

- The frontend will be available at: http://localhost:3000
- The backend API (PHP) will be available at: http://localhost:8000

## Stopping the Project

```bash
docker-compose down
```

## Troubleshooting

- Check Docker logs for errors: `docker-compose logs`
- Ensure ports 3000 and 8000 are free.
- For DB issues, verify credentials in `.env` match those in `docker-compose.yml` and `backend/config.php`.
