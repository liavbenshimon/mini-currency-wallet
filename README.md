# ארנק מיני למטבעות

אפליקציה פיננסית מיני לניהול מטבעות עם תמיכה בעברית, אינטגרציה עם שערי חליפין של בנק ישראל, ממשק מודרני, והרצה קלה עם Docker.

### תכונות עיקריות

- תמיכה בריבוי מטבעות (דולר, יורו, פאונד, שקל)
- שערי חליפין בזמן אמת (API של בנק ישראל)
- ניהול עסקאות: הפקדות, משיכות, היסטוריה
- המרת מטבעות וגרפים היסטוריים
- ממשק בעברית (RTL)

---

## התקנה והרצה

### דרישות מוקדמות

- Docker ו-Docker Compose
- Node.js 18+ (לפיתוח מקומי)

### קובץ .env

יש להעתיק את הדוגמה הבאה לקובץ `.env` בשורש הפרויקט (ולהתאים ערכים לפי הצורך):

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

### הרצה עם Docker

```bash
git clone <repository-url>
cd Mini-Currency-Wallet
# ודא שקובץ .env נמצא בשורש
docker-compose up --build
```

- הממשק: http://localhost:3001
- ה-API (PHP): http://localhost:8000

### עצירת הפרויקט

```bash
docker-compose down
```

### פיתוח מקומי (ללא Docker)

```bash
npm install
npm run dev
```

---

## מבנה הפרויקט

```
Mini-Currency-Wallet/
├── app/                  # קבצי Next.js (פרונטאנד)
├── backend/              # קוד PHP (בקאנד)
├── components/           # רכיבי UI
├── docker-compose.yml    # הגדרות Docker
├── Dockerfile            # בניית Next.js
├── nginx.conf            # הגדרות Nginx
├── .env                  # משתני סביבה (לא נכנס ל-git)
└── README.md             # תיעוד
```

---

## הגדרות וסביבה

- כל משתני הסביבה מוגדרים ב-.env (ראה למעלה)
- Docker Compose טוען משתנים אוטומטית
- Next.js טוען משתנים אוטומטית (לשרת)
- PHP: יש לעדכן ידנית את backend/config.php אם רוצים סנכרון מלא עם .env

---

## בקאנד PHP

- נמצא בתיקיית `backend/`
- מספק API ל:
  - /fetch_rates: עדכון שערים מה-API של בנק ישראל
  - /get_rates: שליפת שערים מה-DB
- משתמש ב-MySQL (הגדרות ב-.env וב-config.php)
- קבצים עיקריים: `fetch_rates.php`, `get_rates.php`, `db.php`, `config.php`

---

## פרונטאנד Next.js

- נמצא בתיקיית `app/` ו-`components/`
- רספונסיבי, RTL, תומך בעברית
- משתמש ב-API של הבקאנד לקבלת שערים ופעולות
- פקודות עיקריות: `npm run dev`, `npm run build`, `npm start`

---

## שימוש

- **הפקדת כסף:** עבור לטאב "הפקדה", בחר מטבע, הזן סכום ולחץ "הפקד כסף"
- **צפייה ביתרות:** בטאב "יתרות"
- **שערי חליפין:** בטאב "שערי חליפין" (כולל גרף היסטורי)
- **היסטוריית עסקאות:** בטאב "היסטוריה"

---

## כלים וטכנולוגיות

- **Frontend:** Next.js, React, TailwindCSS
- **Backend:** PHP 8, MySQL 8
- **DevOps:** Docker, Docker Compose, Nginx
- **AI Tools:**
  - ChatGPT (OpenAI) – עיבוד, מענה, תיעוד
  - Cursor AI – עוזר קוד, ניהול משימות, אוטומציה

---

## פתרון בעיות

- בדוק לוגים: `docker-compose logs`
- ודא שפורטים 3001 ו-8000 פנויים
- לבעיות DB: ודא שהפרטים ב-.env תואמים ל-docker-compose.yml ול-backend/config.php
- בעיות הרשאות (בלינוקס):

```bash
sudo chown -R $USER:$USER .
chmod -R 755 .
```
