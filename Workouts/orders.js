db.orders.insertMany([
  {
    orderId: 101,
    customerId: 1,
    items: [
      { product: "Laptop", price: 1200, quantity: 1 },
      { product: "Mouse", price: 20, quantity: 2 },
    ],
    totalAmount: 1240,
    orderDate: new Date("2023-06-12"),
    shippingAddress: { street: "123 Main St", city: "New York", zip: "10001" },
    status: "Shipped",
    tracking: { carrier: "UPS", trackingNumber: "1Z999AA10123456784" },
  },
  {
    orderId: 102,
    customerId: 2,
    items: [
      { product: "Smartphone", price: 800, quantity: 1 },
      { product: "Phone Case", price: 25, quantity: 1 },
      { product: "Screen Protector", price: 15, quantity: 2 },
    ],
    totalAmount: 855,
    orderDate: new Date("2023-07-22"),
    shippingAddress: { street: "456 Maple Ave", city: "Chicago", zip: "60601" },
    status: "Delivered",
    tracking: { carrier: "FedEx", trackingNumber: "123456789012" },
  },
  {
    orderId: 103,
    customerId: 3,
    items: [
      { product: "Tablet", price: 300, quantity: 1 },
      { product: "Stylus", price: 50, quantity: 1 },
    ],
    totalAmount: 350,
    orderDate: new Date("2023-08-05"),
    shippingAddress: {
      street: "789 Elm St",
      city: "San Francisco",
      zip: "94102",
    },
    status: "Processing",
    tracking: { carrier: "DHL", trackingNumber: "JD123456789012" },
  },
  {
    orderId: 104,
    customerId: 4,
    items: [
      { product: "Monitor", price: 150, quantity: 1 },
      { product: "HDMI Cable", price: 15, quantity: 1 },
      { product: "Desk Mount", price: 60, quantity: 1 },
    ],
    totalAmount: 225,
    orderDate: new Date("2023-09-10"),
    shippingAddress: { street: "987 Oak St", city: "Boston", zip: "02108" },
    status: "Shipped",
    tracking: { carrier: "USPS", trackingNumber: "9400100000000000000000" },
  },
]);
