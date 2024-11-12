### 1. **Setup and Create a Database**

#### Connect to MongoDB
1. Open your terminal or MongoDB shell and connect to MongoDB:
   ```shell
   mongo
   ```

#### Create a Database
2. Use the `use` command to create a new database:
   ```javascript
   use myPracticeDB
   ```

> This command creates `myPracticeDB` if it doesn’t already exist and switches to it.

---

### 2. **Create Collections and Insert Documents**

#### Basic Syntax to Create Collections
In MongoDB, collections are automatically created when you insert the first document. Here’s how to create collections manually and insert multiple documents.

##### Example: Creating `customers` and `orders` Collections
```javascript
db.createCollection("customers")
db.createCollection("orders")
```

#### Inserting Multiple Documents
Use `insertMany()` to add multiple documents to each collection.

##### Insert Documents in `customers`
```javascript
db.customers.insertMany([
    { customerId: 1, name: "Alice", age: 30, address: "123 Main St", joined: new Date("2022-01-01") },
    { customerId: 2, name: "Bob", age: 40, address: "456 Maple Ave", joined: new Date("2022-02-15") },
    { customerId: 3, name: "Charlie", age: 25, address: "789 Elm St", joined: new Date("2022-03-22") }
])
```

##### Insert Documents in `orders`
```javascript
db.orders.insertMany([
    { orderId: 101, customerId: 1, product: "Laptop", price: 1200, date: new Date("2023-01-12") },
    { orderId: 102, customerId: 1, product: "Smartphone", price: 800, date: new Date("2023-03-07") },
    { orderId: 103, customerId: 2, product: "Tablet", price: 300, date: new Date("2023-02-22") },
    { orderId: 104, customerId: 3, product: "Monitor", price: 150, date: new Date("2023-04-18") }
])
```

---

### 3. **Practice MongoDB Queries**

Now that you have documents in your collections, let’s run a variety of queries:

#### Basic Find Queries
1. Retrieve all customers:
   ```javascript
   db.customers.find()
   ```

2. Find a specific customer by `customerId`:
   ```javascript
   db.customers.find({ customerId: 2 })
   ```

3. Retrieve orders by `customerId`:
   ```javascript
   db.orders.find({ customerId: 1 })
   ```

#### Advanced Queries
4. Find customers who joined after a certain date:
   ```javascript
   db.customers.find({ joined: { $gt: new Date("2022-02-01") } })
   ```

5. Find orders with price greater than $500:
   ```javascript
   db.orders.find({ price: { $gt: 500 } })
   ```

#### Update Operations
6. Update a customer’s address:
   ```javascript
   db.customers.updateOne(
       { customerId: 3 },
       { $set: { address: "789 New Elm St" } }
   )
   ```

7. Increment age for all customers:
   ```javascript
   db.customers.updateMany(
       {},
       { $inc: { age: 1 } }
   )
   ```

---

### 4. **Aggregation Framework**

MongoDB Aggregation Framework allows complex data processing pipelines.

#### Example Aggregations

1. **Group by `customerId` and calculate total spending**:
   ```javascript
   db.orders.aggregate([
       { $group: { _id: "$customerId", totalSpent: { $sum: "$price" } } }
   ])
   ```

2. **Lookup (Join)**: Combine `customers` with `orders` using `$lookup`:
   ```javascript
   db.customers.aggregate([
       {
           $lookup: {
               from: "orders",
               localField: "customerId",
               foreignField: "customerId",
               as: "orderDetails"
           }
       }
   ])
   ```

3. **Calculate average price of orders**:
   ```javascript
   db.orders.aggregate([
       { $group: { _id: null, avgPrice: { $avg: "$price" } } }
   ])
   ```

4. **Pipeline with Match and Sort**: Find orders over $500, sort by price descending:
   ```javascript
   db.orders.aggregate([
       { $match: { price: { $gt: 500 } } },
       { $sort: { price: -1 } }
   ])
   ```

---

### 5. **Indexing for Performance**

1. Create an index on `customerId` in `orders` for faster queries:
   ```javascript
   db.orders.createIndex({ customerId: 1 })
   ```

2. Check indexes on `orders` collection:
   ```javascript
   db.orders.getIndexes()
   ```

---

### 6. **Additional MongoDB Operations**

#### Delete Operations
1. Delete a specific document in `customers`:
   ```javascript
   db.customers.deleteOne({ customerId: 3 })
   ```

2. Delete all orders older than a certain date:
   ```javascript
   db.orders.deleteMany({ date: { $lt: new Date("2023-01-01") } })
   ```

#### Bulk Write Operations
Use `bulkWrite()` for bulk operations.

```javascript
db.orders.bulkWrite([
    { insertOne: { document: { orderId: 105, customerId: 1, product: "Keyboard", price: 50, date: new Date("2023-05-12") } } },
    { updateOne: { filter: { orderId: 101 }, update: { $set: { price: 1150 } } } },
    { deleteOne: { filter: { orderId: 104 } } }
])
```

---

### 7. **Practice More with Aggregations**

1. **Top N Customers by Total Spending**:
   ```javascript
   db.orders.aggregate([
       { $group: { _id: "$customerId", totalSpent: { $sum: "$price" } } },
       { $sort: { totalSpent: -1 } },
       { $limit: 3 }
   ])
   ```

2. **Add Fields**: Add a discount field to each order:
   ```javascript
   db.orders.aggregate([
       { $addFields: { discount: { $cond: { if: { $gte: ["$price", 500] }, then: 0.1, else: 0 } } } }
   ])
   ```

---

### 8. **Clean Up (Optional)**

To remove all documents or collections when you're done practicing:
1. Delete all documents in `orders`:
   ```javascript
   db.orders.deleteMany({})
   ```

2. Drop the entire `customers` collection:
   ```javascript
   db.customers.drop()
   ```

3. Drop the database if you no longer need it:
   ```javascript
   db.dropDatabase()
   ```
Here’s a more extensive list of MongoDB commands, covering a wide range of CRUD operations, queries, aggregations, indexing, and more advanced practices to help you get hands-on experience with MongoDB.

---

### 1. **Basic Commands**

#### Switch to or Create a Database
```javascript
use myPracticeDB
```

#### Show All Databases
```javascript
show dbs
```

#### Show Collections in the Database
```javascript
show collections
```

---

### 2. **Insert Operations**

#### Insert Single Document
```javascript
db.customers.insertOne({ customerId: 1, name: "Alice", age: 30, address: "123 Main St", joined: new Date("2022-01-01") })
```

#### Insert Multiple Documents
```javascript
db.customers.insertMany([
    { customerId: 2, name: "Bob", age: 25, address: "456 Maple Ave", joined: new Date("2022-02-15") },
    { customerId: 3, name: "Charlie", age: 35, address: "789 Elm St", joined: new Date("2022-03-10") },
    { customerId: 4, name: "David", age: 29, address: "101 Pine St", joined: new Date("2022-04-12") }
])
```

---

### 3. **Find Operations (Queries)**

#### Find All Documents in a Collection
```javascript
db.customers.find()
```

#### Find Document with Specific Field Value
```javascript
db.customers.find({ name: "Alice" })
```

#### Find Documents with Age Greater Than 30
```javascript
db.customers.find({ age: { $gt: 30 } })
```

#### Find Documents with Age Between 25 and 35
```javascript
db.customers.find({ age: { $gte: 25, $lte: 35 } })
```

#### Find Documents with Logical OR Condition
```javascript
db.customers.find({ $or: [{ age: { $lt: 30 } }, { address: "101 Pine St" }] })
```

#### Project Specific Fields (Display Only `name` and `age`)
```javascript
db.customers.find({}, { name: 1, age: 1 })
```

#### Sort Documents by Age (Ascending)
```javascript
db.customers.find().sort({ age: 1 })
```

#### Limit Number of Results to 2
```javascript
db.customers.find().limit(2)
```

---

### 4. **Update Operations**

#### Update a Single Document
```javascript
db.customers.updateOne({ name: "Alice" }, { $set: { age: 31 } })
```

#### Update Multiple Documents (Increase Age by 1 for All)
```javascript
db.customers.updateMany({}, { $inc: { age: 1 } })
```

#### Upsert Operation (Update if Exists, Insert if Not)
```javascript
db.customers.updateOne(
    { name: "Eve" },
    { $set: { age: 28, address: "123 Oak St", joined: new Date() } },
    { upsert: true }
)
```

---

### 5. **Delete Operations**

#### Delete a Single Document
```javascript
db.customers.deleteOne({ name: "Charlie" })
```

#### Delete Multiple Documents with Age Greater Than 30
```javascript
db.customers.deleteMany({ age: { $gt: 30 } })
```

#### Drop an Entire Collection
```javascript
db.customers.drop()
```

---

### 6. **Aggregation Framework**

#### Simple Grouping by Age
```javascript
db.customers.aggregate([
    { $group: { _id: "$age", count: { $sum: 1 } } }
])
```

#### Calculate Total Spend by Each Customer (Using `orders` Collection)
```javascript
db.orders.aggregate([
    { $group: { _id: "$customerId", totalSpent: { $sum: "$price" } } }
])
```

#### Find Average Age of Customers
```javascript
db.customers.aggregate([
    { $group: { _id: null, averageAge: { $avg: "$age" } } }
])
```

#### Use `$lookup` to Join `customers` and `orders`
```javascript
db.customers.aggregate([
    {
        $lookup: {
            from: "orders",
            localField: "customerId",
            foreignField: "customerId",
            as: "orders"
        }
    }
])
```

#### Pipeline with `$match` and `$sort`
```javascript
db.orders.aggregate([
    { $match: { price: { $gte: 500 } } },
    { $sort: { price: -1 } }
])
```

#### Bucket Customers into Age Ranges
```javascript
db.customers.aggregate([
    {
        $bucket: {
            groupBy: "$age",
            boundaries: [20, 30, 40, 50],
            default: "Other",
            output: { count: { $sum: 1 } }
        }
    }
])
```

---

### 7. **Indexing for Optimization**

#### Create an Index on `customerId`
```javascript
db.customers.createIndex({ customerId: 1 })
```

#### Create a Compound Index on `age` and `address`
```javascript
db.customers.createIndex({ age: 1, address: 1 })
```

#### View All Indexes on a Collection
```javascript
db.customers.getIndexes()
```

---

### 8. **Bulk Write Operations**

Use `bulkWrite` to perform multiple write operations.

```javascript
db.customers.bulkWrite([
    { insertOne: { document: { customerId: 5, name: "Emma", age: 22, address: "234 Walnut St" } } },
    { updateOne: { filter: { name: "Bob" }, update: { $set: { age: 45 } } } },
    { deleteOne: { filter: { name: "David" } } }
])
```

---

### 9. **Text Search**

#### Create a Text Index on `name` and `address`
```javascript
db.customers.createIndex({ name: "text", address: "text" })
```

#### Search for a Text Match
```javascript
db.customers.find({ $text: { $search: "Alice" } })
```

---

### 10. **Advanced Aggregation: Unwind and Project**

#### Unwind Array Field (e.g., Orders Containing Multiple Products)
```javascript
db.orders.aggregate([
    { $unwind: "$products" },
    { $project: { productName: "$products.name", price: "$products.price" } }
])
```

#### Add Fields with Conditional Logic
```javascript
db.customers.aggregate([
    {
        $addFields: {
            membershipStatus: {
                $cond: { if: { $gte: ["$age", 30] }, then: "VIP", else: "Regular" }
            }
        }
    }
])
```

#### Use `$facet` to Get Multiple Aggregations in a Single Query
```javascript
db.customers.aggregate([
    {
        $facet: {
            ageStats: [
                { $group: { _id: null, averageAge: { $avg: "$age" } } }
            ],
            addressCount: [
                { $group: { _id: "$address", count: { $sum: 1 } } }
            ]
        }
    }
])
```

---

### 11. **Working with Dates**

#### Find Documents Added in the Last 30 Days
```javascript
db.customers.find({
    joined: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) }
})
```

#### Group by Month and Count Documents
```javascript
db.customers.aggregate([
    { $group: { _id: { month: { $month: "$joined" } }, count: { $sum: 1 } } }
])
```

---

### 12. **Map-Reduce**

#### Map-Reduce to Sum Prices in Orders Collection

```javascript
db.orders.mapReduce(
    function() { emit(this.customerId, this.price); },
    function(key, values) { return Array.sum(values); },
    { out: "total_spent_by_customers" }
)
```

---

### 13. **Transaction Example (For MongoDB with Replica Set)**

Transactions allow atomic operations across multiple documents.

```javascript
const session = db.getMongo().startSession()
session.startTransaction()
try {
    session.getDatabase("myPracticeDB").customers.insertOne({ customerId: 6, name: "Frank" }, { session })
    session.getDatabase("myPracticeDB").orders.insertOne({ orderId: 106, customerId: 6, product: "Headphones", price: 150 }, { session })
    session.commitTransaction()
} catch (error) {
    session.abortTransaction()
} finally {
    session.endSession()
}
```
