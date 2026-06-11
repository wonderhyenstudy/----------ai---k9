use("aggDB");
db.sales.insertMany([
  {
    product: "Laptop",
    region: "Asia",
    amount: 1200,
    date: ISODate("2024-02-01"),
  },
  {
    product: "Laptop",
    region: "Europe",
    amount: 1500,
    date: ISODate("2024-02-02"),
  },
  {
    product: "Laptop",
    region: "Asia",
    amount: 800,
    date: ISODate("2024-02-03"),
  },
  {
    product: "Phone",
    region: "Asia",
    amount: 600,
    date: ISODate("2024-02-01"),
  },
  {
    product: "Tablet",
    region: "Asia",
    amount: 900,
    date: ISODate("2024-02-03"),
  },
  {
    product: "Tablet",
    region: "Europe",
    amount: 1100,
    date: ISODate("2024-02-04"),
  },
]);
