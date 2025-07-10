"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Wallet, TrendingUp, History, Plus, ArrowUpDown } from "lucide-react";

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface Balance {
  currency: string;
  amount: number;
  symbol: string;
}

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "transfer";
  currency: string;
  amount: number;
  description: string;
  date: string;
  symbol: string;
}

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  date: string;
}

const currencies: Currency[] = [
  { code: "USD", name: "דולר אמריקאי", symbol: "$" },
  { code: "EUR", name: "יורו", symbol: "€" },
  { code: "GBP", name: "פאונד בריטי", symbol: "£" },
  { code: "ILS", name: "שקל ישראלי", symbol: "₪" },
];

const mockExchangeRates: ExchangeRate[] = [
  { from: "USD", to: "ILS", rate: 3.75, date: "2024-01-15" },
  { from: "EUR", to: "ILS", rate: 4.1, date: "2024-01-15" },
  { from: "GBP", to: "ILS", rate: 4.75, date: "2024-01-15" },
  { from: "ILS", to: "USD", rate: 0.267, date: "2024-01-15" },
  { from: "ILS", to: "EUR", rate: 0.244, date: "2024-01-15" },
  { from: "ILS", to: "GBP", rate: 0.211, date: "2024-01-15" },
];

export default function MiniCurrencyWallet() {
  const [historicalRates, setHistoricalRates] = useState<
    { date: string; rate: number }[]
  >([]);

  // Fetch historical rates for the last 10 days and auto-refresh every 60 seconds
  useEffect(() => {
    const fetchRates = async () => {
      // Calculate last 10 days
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 9);
      const format = (d: Date) => d.toISOString().slice(0, 10);
      const url = `/backend/get_rates.php?currency=USD&start=${format(
        start
      )}&end=${format(end)}`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        // data: [{currency, rate, date}...]
        setHistoricalRates(
          Array.isArray(data)
            ? data.map((item) => ({ date: item.date, rate: Number(item.rate) }))
            : []
        );
      } catch (err) {
        setHistoricalRates([]);
      }
    };
    fetchRates();
    const interval = setInterval(fetchRates, 60000); // 60 seconds
    return () => clearInterval(interval);
  }, []);

  const [balances, setBalances] = useState<Balance[]>([
    { currency: "USD", amount: 1000, symbol: "$" },
    { currency: "EUR", amount: 500, symbol: "€" },
    { currency: "ILS", amount: 2000, symbol: "₪" },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "deposit",
      currency: "USD",
      amount: 1000,
      description: "הפקדה ראשונית",
      date: "2024-01-15T10:00:00Z",
      symbol: "$",
    },
    {
      id: "2",
      type: "deposit",
      currency: "EUR",
      amount: 500,
      description: "הפקדת יורו",
      date: "2024-01-14T15:30:00Z",
      symbol: "€",
    },
  ]);

  const [displayCurrency, setDisplayCurrency] = useState("ILS");
  const [depositAmount, setDepositAmount] = useState("");
  const [depositCurrency, setDepositCurrency] = useState("USD");
  const [depositDescription, setDepositDescription] = useState("");

  const getExchangeRate = (from: string, to: string): number => {
    if (from === to) return 1;
    const rate = mockExchangeRates.find((r) => r.from === from && r.to === to);
    return rate?.rate || 1;
  };

  const convertAmount = (amount: number, from: string, to: string): number => {
    const rate = getExchangeRate(from, to);
    return amount * rate;
  };

  const getTotalBalance = (): number => {
    return balances.reduce((total: number, balance: Balance) => {
      return (
        total + convertAmount(balance.amount, balance.currency, displayCurrency)
      );
    }, 0);
  };

  const getCurrencySymbol = (currencyCode: string): string => {
    return currencies.find((c) => c.code === currencyCode)?.symbol || "";
  };

  const handleDeposit = () => {
    if (!depositAmount || Number.parseFloat(depositAmount) <= 0) return;

    const amount = Number.parseFloat(depositAmount);
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: "deposit",
      currency: depositCurrency,
      amount,
      description: depositDescription || "הפקדה",
      date: new Date().toISOString(),
      symbol: getCurrencySymbol(depositCurrency),
    };

    setTransactions((prev) => [newTransaction, ...prev]);

    setBalances((prev: Balance[]) => {
      const existingBalance = prev.find(
        (b: Balance) => b.currency === depositCurrency
      );
      if (existingBalance) {
        return prev.map((b: Balance) =>
          b.currency === depositCurrency
            ? { ...b, amount: b.amount + amount }
            : b
        );
      } else {
        return [
          ...prev,
          {
            currency: depositCurrency,
            amount,
            symbol: getCurrencySymbol(depositCurrency),
          },
        ];
      }
    });

    setDepositAmount("");
    setDepositDescription("");
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("he-IL", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTransactionTypeText = (type: string): string => {
    switch (type) {
      case "deposit":
        return "הפקדה";
      case "withdrawal":
        return "משיכה";
      case "transfer":
        return "העברה";
      default:
        return type;
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Wallet className="h-8 w-8 text-blue-600" />
            ארנק מטבעות מיני
          </h1>
          <p className="text-gray-600">נהל את הכספים שלך במטבעות שונים</p>
        </div>

        {/* Display Currency Selector */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="display-currency">מטבע תצוגה:</Label>
              <Select
                value={displayCurrency}
                onValueChange={setDisplayCurrency}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.name} ({currency.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Total Balance */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold">יתרה כוללת</h2>
              <p className="text-4xl font-bold">
                {getTotalBalance().toLocaleString("he-IL", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                {getCurrencySymbol(displayCurrency)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="balances" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="balances">יתרות</TabsTrigger>
            <TabsTrigger value="deposit">הפקדה</TabsTrigger>
            <TabsTrigger value="history">היסטוריה</TabsTrigger>
            <TabsTrigger value="rates">שערי חליפין</TabsTrigger>
          </TabsList>

          {/* Balances Tab */}
          <TabsContent value="balances" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {balances.map((balance) => (
                <Card key={balance.currency}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>
                        {
                          currencies.find((c) => c.code === balance.currency)
                            ?.name
                        }
                      </span>
                      <Badge variant="secondary">{balance.currency}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold">
                        {balance.amount.toLocaleString("he-IL", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        {balance.symbol}
                      </p>
                      <p className="text-sm text-gray-600">
                        ≈{" "}
                        {convertAmount(
                          balance.amount,
                          balance.currency,
                          displayCurrency
                        ).toLocaleString("he-IL", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        {getCurrencySymbol(displayCurrency)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Deposit Tab */}
          <TabsContent value="deposit">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  הפקדת כסף
                </CardTitle>
                <CardDescription>הפקד כסף במטבע הרצוי</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deposit-currency">מטבע</Label>
                    <Select
                      value={depositCurrency}
                      onValueChange={setDepositCurrency}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.name} ({currency.symbol})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deposit-amount">סכום</Label>
                    <Input
                      id="deposit-amount"
                      type="number"
                      placeholder="0.00"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deposit-description">תיאור (אופציונלי)</Label>
                  <Input
                    id="deposit-description"
                    placeholder="תיאור ההפקדה"
                    value={depositDescription}
                    onChange={(e) => setDepositDescription(e.target.value)}
                  />
                </div>
                <Button onClick={handleDeposit} className="w-full" size="lg">
                  <Plus className="h-4 w-4 ml-2" />
                  הפקד כסף
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  היסטוריית עסקאות
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                      אין עסקאות עדיין
                    </p>
                  ) : (
                    transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              transaction.type === "deposit"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {transaction.type === "deposit" ? (
                              <Plus className="h-4 w-4" />
                            ) : (
                              <ArrowUpDown className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {getTransactionTypeText(transaction.type)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {transaction.description}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(transaction.date)}
                            </p>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-lg">
                            {transaction.amount.toLocaleString("he-IL", {
                              minimumFractionDigits: 2,
                            })}{" "}
                            {transaction.symbol}
                          </p>
                          <p className="text-sm text-gray-600">
                            {transaction.currency}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exchange Rates Tab */}
          <TabsContent value="rates" className="space-y-6">
            {/* Current Rates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  שערי חליפין נוכחיים
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockExchangeRates
                    .filter((rate) => rate.to === "ILS")
                    .map((rate) => (
                      <div
                        key={`${rate.from}-${rate.to}`}
                        className="p-4 border rounded-lg"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{rate.from}/ILS</span>
                          <span className="text-lg font-bold">
                            {rate.rate.toFixed(4)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          1 {rate.from} = {rate.rate.toFixed(4)} ₪
                        </p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Historical Chart */}
            <Card>
              <CardHeader>
                <CardTitle>גרף היסטורי - USD/ILS</CardTitle>
                <CardDescription>
                  שער החליפין של הדולר מול השקל ב-10 הימים האחרונים
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalRates}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={["dataMin - 0.02", "dataMax + 0.02"]} />
                      <Tooltip
                        labelFormatter={(value) => `תאריך: ${value}`}
                        formatter={(value: any) => [
                          `${value?.toFixed(4) ?? "-"} ₪`,
                          "שער",
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
