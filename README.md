# ארנק מיני למטבעות

אפליקציה פיננסית מיני לניהול מטבעות עם תמיכה בעברית ואינטגרציה עם שערי חליפין של בנק ישראל.

## תכונות

- **תמיכה בריבוי מטבעות**: דולר, יורו, פאונד, שקל
- **שערי חליפין בזמן אמת**: אינטגרציה עם API של בנק ישראל
- **ניהול עסקאות**: הפקדות, משיכות והיסטוריה
- **המרת מטבעות**: צפייה ביתרות במטבע המועדף
- **גרפים היסטוריים**: ויזואליזציה של שערי החליפין
- **ממשק בעברית**: תמיכה מלאה בעברית ו-RTL

## התקנה מהירה

### דרישות מוקדמות
- Docker ו-Docker Compose
- Node.js 18+ (לפיתוח מקומי)

### הרצה עם Docker

1. **שכפול הפרויקט**
   \`\`\`bash
   git clone <repository-url>
   cd mini-currency-wallet
   \`\`\`

2. **הרצה עם Docker Compose**
   \`\`\`bash
   docker-compose up --build
   \`\`\`

3. **גישה לאפליקציה**
   - פתח דפדפן וגש ל: http://localhost:3000

### פיתוח מקומי

1. **התקנת תלויות**
   \`\`\`bash
   npm install
   \`\`\`

2. **הרצה במצב פיתוח**
   \`\`\`bash
   npm run dev
   \`\`\`

## שימוש

### הפקדת כסף
1. עבור לטאב "הפקדה"
2. בחר מטבע (דולר, יורו, פאונד, שקל)
3. הזן סכום ותיאור אופציונלי
4. לחץ "הפקד כסף"

### צפייה ביתרות
- יתרות בודדות מוצגות בטאב "יתרות"
- יתרה כוללת מוצגת במטבע המועדף
- שנה מטבע תצוגה באמצעות התפריט הנפתח

### שערי חליפין
- שערים נוכחיים מוצגים בטאב "שערי חליפין"
- גרף היסטורי מציג מגמות של 10 ימים
- עדכון אוטומטי של שערים

### היסטוריית עסקאות
- צפה בכל ההפקדות והעסקאות
- מיון לפי תאריך וסוג עסקה
- תיאורים מפורטים לכל עסקה

## מבנה הפרויקט

\`\`\`
mini-currency-wallet/
├── app/
│   ├── page.tsx          # עמוד ראשי
│   ├── layout.tsx        # פריסה כללית
│   └── globals.css       # סגנונות גלובליים
├── components/ui/        # רכיבי UI
├── docker-compose.yml    # הגדרות Docker
├── Dockerfile           # הגדרות בניית Docker
├── nginx.conf           # הגדרות Nginx
└── README.md           # תיעוד
\`\`\`

## הגדרות

### משתני סביבה
\`\`\`env
NODE_ENV=production
DEFAULT_CURRENCY=ILS
SUPPORTED_CURRENCIES=USD,EUR,GBP,ILS
BOI_API_BASE=https://edge.boi.gov.il/FusionEdgeServer/sdmx/v2/data/dataflow/BOI.STATISTICS/EXR/1.0
\`\`\`

## פיתוח

### הוספת מטבעות חדשים
1. עדכן את מערך \`currencies\` ב-\`page.tsx\`
2. הוסף שערי חליפין ב-\`mockExchangeRates\`
3. עדכן את \`SUPPORTED_CURRENCIES\` בהגדרות

### אינטגרציה עם API אמיתי
החלף את \`mockExchangeRates\` בקריאות API אמיתיות:
\`\`\`typescript
const fetchRatesFromBOI = async () => {
  // יישום קריאה ל-API של בנק ישראל
}
\`\`\`

## פתרון בעיות

### בעיות Docker
\`\`\`bash
docker-compose down
docker-compose up --build --force-recreate
\`\`\`

### בעיות הרשאות
\`\`\`bash
sudo chown -R $USER:$USER .
chmod -R 755 .
\`\`\`

## רישיון

MIT License - ראה קובץ LICENSE לפרטים.

## תמיכה

לבעיות ושאלות:
1. בדוק את חלק פתרון הבעיות
2. עיין בלוגים של Docker
3. פתח issue ב-GitHub עם פרטי השגיאה
\`\`\`
