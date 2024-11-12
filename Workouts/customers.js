db.customers.insertMany([
  {
    customerId: 1,
    name: "Alice",
    age: 30,
    address: { street: "123 Main St", city: "New York", zip: "10001" },
    joined: new Date("2022-01-01"),
    interests: ["reading", "hiking", "technology"],
    purchases: [
      { productId: "P001", quantity: 1, price: 1200 },
      { productId: "P002", quantity: 2, price: 15 },
    ],
  },
  {
    customerId: 2,
    name: "Bob",
    age: 40,
    address: { street: "456 Maple Ave", city: "Chicago", zip: "60601" },
    joined: new Date("2022-02-15"),
    interests: ["cooking", "traveling"],
    purchases: [
      { productId: "P003", quantity: 1, price: 300 },
      { productId: "P004", quantity: 5, price: 10 },
    ],
  },
  {
    customerId: 3,
    name: "Charlie",
    age: 25,
    address: { street: "789 Elm St", city: "San Francisco", zip: "94102" },
    joined: new Date("2022-03-22"),
    interests: ["photography", "fitness"],
    purchases: [
      { productId: "P005", quantity: 2, price: 150 },
      { productId: "P006", quantity: 1, price: 400 },
    ],
  },
  {
    customerId: 4,
    name: "Diana",
    age: 29,
    address: { street: "987 Oak St", city: "Boston", zip: "02108" },
    joined: new Date("2023-01-18"),
    interests: ["music", "art", "gaming"],
    purchases: [
      { productId: "P007", quantity: 3, price: 20 },
      { productId: "P008", quantity: 1, price: 600 },
    ],
  },
]);
