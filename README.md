# Mini-Currency-Wallet

A financial mini-application for managing currencies with support for Hebrew, integration with Israeli bank exchange rates, a modern interface, and easy execution with Docker.

### Key Features

- Multi-currency support (Dollar, Yen, Pound, Shekel)
- Real-time exchange rates (API of Israeli Bank)
- Transaction management: deposits, withdrawals, history
- Currency conversion and historical graphs
- Hebrew interface (RTL)

---

## Deployment

The frontend of this project is deployed and available online at [https://v0-mini-currency-wallet.vercel.app/](https://v0-mini-currency-wallet.vercel.app/).

You can access and test the application directly through this link.

---

## Installation and Execution

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)

### .env file

You need to copy the following example to the `.env` file in the project root (and adjust values as needed):

```env
# Database configuration
MYSQL_DATABASE=currency_wallet
MYSQL_USER=user
MYSQL_PASSWORD=password
MYSQL_ROOT_PASSWORD=rootpassword

# App configuration
NODE_ENV=production
DEFAULT_CURRENCY=ILS
SUPPORTED_CURRENCIES=USD,EUR,GBP,ILS
BOI_API_BASE=https://edge.boi.gov.il/FusionEdgeServer/sdmx/v2/data/dataflow/BOI.STATISTICS/EXR/1.0/
```
