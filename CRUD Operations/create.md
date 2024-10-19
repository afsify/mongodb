# **Create Operations in MongoDB**

Create operations in MongoDB involve inserting new documents into a collection. MongoDB provides various methods to insert single or multiple documents efficiently. Understanding these operations is fundamental for managing and populating your database.

## **1. Inserting Documents**

Inserting documents is the primary way to add data to a MongoDB collection. MongoDB offers several methods to insert single or multiple documents, each suited for different use cases.

### **a. `insertOne()` Method**

The `insertOne()` method is used to insert a single document into a collection. It ensures that only one document is added and returns information about the operation.

#### **Syntax:**
```javascript
db.collection.insertOne(document, options)
```

- **`document`**: The JSON-like document to insert.
- **`options`** (optional): Additional options for the insertion, such as write concern.

#### **Example:**

```javascript
// Insert a single user document into the 'users' collection
db.users.insertOne({
  name: "Alice Johnson",
  email: "alice.johnson@example.com",
  age: 28,
  address: {
    street: "456 Elm St",
    city: "Othertown",
    zip: "67890"
  },
  hobbies: ["reading", "hiking", "coding"]
});
```

#### **Result:**
The `insertOne()` method returns an acknowledgment of the insertion, including the unique `_id` generated for the new document.

```json
{
  "acknowledged" : true,
  "insertedId" : ObjectId("64f1a9c3e3b1a5f1b8e4d123")
}
```

### **b. `insertMany()` Method**

The `insertMany()` method allows you to insert multiple documents into a collection in a single operation. This method is more efficient than inserting documents one by one, especially when dealing with large datasets.

#### **Syntax:**
```javascript
db.collection.insertMany(documents, options)
```

- **`documents`**: An array of JSON-like documents to insert.
- **`options`** (optional): Additional options, such as ordered insertion and write concern.

#### **Example:**

```javascript
// Insert multiple product documents into the 'products' collection
db.products.insertMany([
  {
    name: "Laptop",
    brand: "BrandA",
    price: 1200,
    specifications: {
      processor: "Intel i7",
      ram: "16GB",
      storage: "512GB SSD"
    },
    categories: ["electronics", "computers"]
  },
  {
    name: "Smartphone",
    brand: "BrandB",
    price: 800,
    specifications: {
      processor: "Snapdragon 888",
      ram: "8GB",
      storage: "256GB"
    },
    categories: ["electronics", "mobile"]
  },
  {
    name: "Headphones",
    brand: "BrandC",
    price: 150,
    specifications: {
      type: "Over-Ear",
      connectivity: "Bluetooth",
      noiseCancellation: true
    },
    categories: ["electronics", "audio"]
  }
]);
```

#### **Result:**
The `insertMany()` method returns an acknowledgment that includes the number of documents inserted and their respective `_id` values.

```json
{
  "acknowledged" : true,
  "insertedIds" : [
    ObjectId("64f1a9c3e3b1a5f1b8e4d124"),
    ObjectId("64f1a9c3e3b1a5f1b8e4d125"),
    ObjectId("64f1a9c3e3b1a5f1b8e4d126")
  ]
}
```

### **c. `insert()` Method (Deprecated)**

**Note:** The `insert()` method is deprecated in newer versions of MongoDB in favor of `insertOne()` and `insertMany()`. It is recommended to use the newer methods for clarity and better control over insert operations.

#### **Deprecated Syntax:**
```javascript
db.collection.insert(document, options)
```

#### **Recommendation:**
Use `insertOne()` for single document inserts and `insertMany()` for multiple document inserts.

### **d. Insert Options**

Both `insertOne()` and `insertMany()` methods accept an optional `options` parameter that allows you to customize the behavior of the insert operation.

#### **Common Options:**

- **`ordered`** (Boolean):
  - **`true`**: Insert documents in the order they appear in the array. If an error occurs, subsequent inserts are not attempted.
  - **`false`**: Attempt to insert all documents, even if some inserts fail.
  
- **`writeConcern`** (Document):
  - Specifies the level of acknowledgment requested from MongoDB for write operations. For example, `{ w: 1 }` ensures that the write operation has been written to the standalone mongod or the primary in a replica set.

#### **Example with Options:**

```javascript
// Insert multiple documents with unordered insertion and custom write concern
db.orders.insertMany([
  { orderId: 101, item: "Laptop", quantity: 1 },
  { orderId: 102, item: "Smartphone", quantity: 2 },
  { orderId: 103, item: "Tablet", quantity: 1 }
], { ordered: false, writeConcern: { w: "majority" } });
```

## **2. Bulk Inserts**

Bulk inserts refer to the process of inserting multiple documents into a collection in a single operation. This approach is more efficient than inserting documents one by one, as it reduces the number of round-trips between the application and the database server.

### **a. Benefits of Bulk Inserts**

- **Performance Improvement**: Reduces latency by minimizing the number of individual insert operations.
- **Atomicity**: When using ordered inserts, the operation stops at the first error, ensuring data consistency.
- **Resource Optimization**: Efficiently utilizes network and server resources by batching multiple inserts together.

### **b. Bulk Write Operations with `insertMany()`**

While `insertMany()` is primarily used for bulk inserts, MongoDB also provides the `bulkWrite()` method for more complex bulk operations, including inserts, updates, and deletes in a single batch.

#### **Syntax of `insertMany()`:**
```javascript
db.collection.insertMany(documents, options)
```

#### **Example:**

```javascript
// Bulk insert multiple customer documents into the 'customers' collection
db.customers.insertMany([
  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
    membership: "Gold",
    purchases: [
      { item: "Laptop", price: 1200 },
      { item: "Mouse", price: 25 }
    ]
  },
  {
    name: "Carol White",
    email: "carol.white@example.com",
    membership: "Silver",
    purchases: [
      { item: "Smartphone", price: 800 },
      { item: "Earbuds", price: 50 }
    ]
  },
  {
    name: "David Brown",
    email: "david.brown@example.com",
    membership: "Bronze",
    purchases: [
      { item: "Tablet", price: 300 },
      { item: "Keyboard", price: 45 }
    ]
  }
], { ordered: true });
```

#### **Result:**
All documents are inserted in the order they appear. If an error occurs (e.g., duplicate key), the operation stops, and subsequent inserts are not attempted.

### **c. Using `bulkWrite()` for Mixed Operations**

The `bulkWrite()` method allows you to perform a mix of insert, update, and delete operations in a single bulk operation. This is useful for complex data manipulation tasks.

#### **Syntax:**
```javascript
db.collection.bulkWrite(operations, options)
```

- **`operations`**: An array of write operations (e.g., `insertOne`, `updateOne`, `deleteOne`).
- **`options`** (optional): Additional options such as ordered/unordered execution.

#### **Example:**

```javascript
// Perform a bulk write with multiple insert, update, and delete operations
db.inventory.bulkWrite([
  {
    insertOne: {
      document: { item: "Notebook", qty: 50, price: 5 }
    }
  },
  {
    updateOne: {
      filter: { item: "Pencil" },
      update: { $set: { price: 1.5 } }
    }
  },
  {
    deleteOne: {
      filter: { item: "Eraser" }
    }
  }
], { ordered: true });
```

#### **Result:**
- **`insertOne`**: Inserts a new document for "Notebook".
- **`updateOne`**: Updates the price of "Pencil" to 1.5.
- **`deleteOne`**: Deletes the document where the item is "Eraser".

If any operation fails (e.g., duplicate key on insert), the remaining operations are not executed due to `ordered: true`.

### **d. Best Practices for Bulk Inserts**

1. **Batch Size**:
   - Avoid inserting extremely large batches in a single operation. It's recommended to limit batch sizes to a few thousand documents to prevent performance issues and ensure manageability.

2. **Error Handling**:
   - Use ordered bulk operations (`ordered: true`) when the sequence of operations is important and you want to stop on the first error.
   - Use unordered bulk operations (`ordered: false`) when you want to attempt all operations regardless of individual failures, which can improve performance.

3. **Indexing Considerations**:
   - Ensure that necessary indexes are in place before performing bulk inserts to maintain insert performance.
   - Be cautious when inserting into collections with unique indexes to avoid duplicate key errors.

4. **Use `bulkWrite()` for Mixed Operations**:
   - When needing to perform a combination of inserts, updates, and deletes, use `bulkWrite()` to execute them efficiently in a single batch.

5. **Monitoring and Logging**:
   - Monitor bulk insert operations for any failures or performance bottlenecks.
   - Log detailed information about failed operations for troubleshooting and data integrity purposes.

## **3. Examples and Use Cases**

### **a. Single Document Insert with `insertOne()`**

#### **Scenario:**
Adding a new user to the `users` collection.

#### **Example:**
```javascript
db.users.insertOne({
  username: "jane_doe",
  email: "jane.doe@example.com",
  age: 32,
  interests: ["traveling", "photography", "cooking"]
});
```

### **b. Multiple Documents Insert with `insertMany()`**

#### **Scenario:**
Adding multiple products to the `products` collection in one operation.

#### **Example:**
```javascript
db.products.insertMany([
  { name: "Desk Lamp", price: 45, category: "furniture" },
  { name: "Office Chair", price: 150, category: "furniture" },
  { name: "Standing Desk", price: 350, category: "furniture" }
]);
```

### **c. Bulk Write with `bulkWrite()`**

#### **Scenario:**
Performing a mix of insert, update, and delete operations in the `inventory` collection.

#### **Example:**
```javascript
db.inventory.bulkWrite([
  {
    insertOne: {
      document: { item: "Monitor", qty: 30, price: 200 }
    }
  },
  {
    updateOne: {
      filter: { item: "Keyboard" },
      update: { $inc: { qty: 10 } }
    }
  },
  {
    deleteOne: {
      filter: { item: "Mouse" }
    }
  }
], { ordered: false });
```

### **d. Handling Duplicate Keys with Bulk Inserts**

#### **Scenario:**
Attempting to insert multiple documents where some may have duplicate `_id` values.

#### **Example:**
```javascript
db.users.insertMany([
  { _id: 1, name: "User One", email: "user.one@example.com" },
  { _id: 2, name: "User Two", email: "user.two@example.com" },
  { _id: 1, name: "User Three", email: "user.three@example.com" } // Duplicate _id
], { ordered: false })
.then(result => {
  printjson(result);
})
.catch(err => {
  printjson(err);
});
```

#### **Result:**
Even though one document has a duplicate `_id`, with `ordered: false`, MongoDB attempts to insert all documents. The result will indicate which inserts succeeded and which failed due to duplication.

```json
{
  "acknowledged" : true,
  "insertedIds" : [
    1,
    2
  ],
  "writeErrors" : [
    {
      "index" : 2,
      "code" : 11000,
      "errmsg" : "E11000 duplicate key error collection: test.users index: _id_ dup key: { _id: 1 }"
    }
  ]
}
```

## **4. Best Practices for Create Operations**

### **a. Schema Design Considerations**

- **Use Appropriate Data Models**: Choose between embedding and referencing based on your application's access patterns and data relationships.
- **Limit Document Size**: Keep documents well within MongoDB’s 16MB size limit to ensure optimal performance and manageability.

### **b. Validation and Data Integrity**

- **Schema Validation**: Use MongoDB’s schema validation features to enforce data integrity and ensure that only valid documents are inserted.
  
  ```javascript
  db.createCollection("users", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["username", "email"],
        properties: {
          username: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          email: {
            bsonType: "string",
            pattern: "^.+@.+\..+$",
            description: "must be a valid email address and is required"
          },
          age: {
            bsonType: "int",
            minimum: 0,
            description: "must be an integer greater than or equal to 0"
          }
        }
      }
    }
  });
  ```

### **c. Indexing for Performance**

- **Create Indexes on Frequently Queried Fields**: Indexes on fields used in query filters and sorts can significantly improve insert performance by reducing the need to scan the entire collection.

  ```javascript
  db.users.createIndex({ email: 1 }, { unique: true });
  ```

### **d. Handling Errors Gracefully**

- **Implement Error Handling**: Always handle potential errors during insert operations, such as duplicate keys or validation failures, to maintain application stability.

  ```javascript
  db.users.insertOne({ username: "jane_doe", email: "jane.doe@example.com" })
  .then(result => {
    console.log("Insert successful:", result.insertedId);
  })
  .catch(err => {
    console.error("Insert failed:", err);
  });
  ```

### **e. Bulk Insert Efficiency**

- **Optimize Batch Sizes**: Determine optimal batch sizes based on your application’s memory and performance characteristics to maximize insert efficiency without overloading the server.
- **Use Unordered Bulk Operations for Speed**: When the order of inserts is not important and you want maximum speed, use unordered bulk operations.

  ```javascript
  db.products.insertMany(documents, { ordered: false });
  ```

### **f. Security Considerations**

- **Validate User Inputs**: Always validate and sanitize data before inserting it into the database to prevent injection attacks and ensure data integrity.
- **Use Least Privilege**: Ensure that the database user performing insert operations has the minimal required permissions to enhance security.

## **5. Advanced Create Operations**

### **a. Upserts**

An **upsert** operation combines the functionality of insert and update. If a document matching the filter criteria exists, it is updated; otherwise, a new document is inserted.

#### **Syntax:**
```javascript
db.collection.updateOne(filter, update, { upsert: true })
```

#### **Example:**

```javascript
// Update the user's age if they exist, otherwise insert a new user
db.users.updateOne(
  { username: "john_doe" },
  { $set: { email: "john.doe@example.com", age: 30 } },
  { upsert: true }
);
```

### **b. Insert with Transactions**

In MongoDB versions 4.0 and above, you can use **transactions** to ensure that multiple insert operations are executed atomically.

#### **Example:**

```javascript
const session = client.startSession();

session.startTransaction();
try {
  db.collection1.insertOne({ name: "Document1" }, { session });
  db.collection2.insertOne({ name: "Document2" }, { session });
  
  session.commitTransaction();
} catch (error) {
  session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

### **c. Using Change Streams**

MongoDB’s **Change Streams** allow you to listen to changes in the database, including insert operations, in real-time.

#### **Example:**

```javascript
const changeStream = db.users.watch();

changeStream.on("change", (change) => {
  console.log("A new user was inserted:", change.fullDocument);
});
```

## **6. Common Use Cases for Create Operations**

### **a. User Registration**

When a new user registers on your platform, their information is inserted into the `users` collection.

```javascript
db.users.insertOne({
  username: "new_user",
  email: "new.user@example.com",
  passwordHash: "hashed_password",
  createdAt: new Date()
});
```

### **b. Product Catalog Management**

Adding new products to the `products` collection in an e-commerce application.

```javascript
db.products.insertMany([
  { name: "Wireless Mouse", price: 25, stock: 100, category: "electronics" },
  { name: "Mechanical Keyboard", price: 75, stock: 50, category: "electronics" }
]);
```

### **c. Logging and Monitoring**

Inserting log entries into a `logs` collection for monitoring application behavior.

```javascript
db.logs.insertOne({
  level: "error",
  message: "Failed to connect to database",
  timestamp: new Date(),
  metadata: { service: "auth-service", errorCode: 500 }
});
```

### **d. Order Processing**

Recording new orders in an `orders` collection when customers make purchases.

```javascript
db.orders.insertOne({
  orderId: 12345,
  userId: ObjectId("64f1a9c3e3b1a5f1b8e4d124"),
  items: [
    { productId: ObjectId("64f1a9c3e3b1a5f1b8e4d125"), quantity: 2 },
    { productId: ObjectId("64f1a9c3e3b1a5f1b8e4d126"), quantity: 1 }
  ],
  totalAmount: 250,
  status: "pending",
  createdAt: new Date()
});
```

## **7. Best Practices for Inserting Documents**

### **a. Consistent Data Structure**

- **Maintain Consistency**: While MongoDB allows for flexible schemas, maintaining a consistent data structure within a collection helps in querying and maintaining the database.
  
  ```javascript
  // Consistent user documents
  {
    "_id": ObjectId("..."),
    "username": "user1",
    "email": "user1@example.com",
    "profile": { "firstName": "User", "lastName": "One" }
  }
  ```

### **b. Use Appropriate Data Types**

- **Leverage BSON Types**: Use appropriate BSON data types (e.g., `Date`, `ObjectId`, `Int32`, `Double`) to ensure data accuracy and optimize storage.
  
  ```javascript
  db.events.insertOne({
    eventName: "UserSignup",
    eventDate: new Date(),
    userId: ObjectId("64f1a9c3e3b1a5f1b8e4d124"),
    metadata: { source: "website", referral: "google" }
  });
  ```

### **c. Avoid Duplicate Data**

- **Implement Unique Indexes**: Use unique indexes on fields that should not have duplicate values (e.g., `email`, `username`) to prevent duplicate entries.
  
  ```javascript
  db.users.createIndex({ email: 1 }, { unique: true });
  ```

### **d. Optimize for Write Performance**

- **Disable Unnecessary Indexes During Bulk Inserts**: Temporarily disable or drop non-essential indexes before performing large bulk inserts and recreate them afterward to speed up the operation.
  
  ```javascript
  // Drop an index
  db.users.dropIndex("email_1");
  
  // Perform bulk insert
  db.users.insertMany(largeDataset);
  
  // Recreate the index
  db.users.createIndex({ email: 1 }, { unique: true });
  ```

### **e. Use Transactions for Critical Inserts**

- **Ensure Atomicity**: For operations that require multiple inserts to be treated as a single atomic unit, use transactions to maintain data integrity.
  
  ```javascript
  const session = client.startSession();

  session.startTransaction();
  try {
    db.accounts.insertOne({ userId: 1, balance: 1000 }, { session });
    db.transactions.insertOne({ userId: 1, amount: -100, type: "withdrawal" }, { session });
    
    session.commitTransaction();
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
  ```

### **f. Validate Data Before Inserting**

- **Use Application-Level Validation**: Implement validation in your application code to ensure that only valid and clean data is inserted into MongoDB.
- **Leverage Schema Validation**: Use MongoDB’s built-in schema validation to enforce data rules at the database level.

  ```javascript
  db.createCollection("products", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "price", "category"],
        properties: {
          name: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          price: {
            bsonType: "double",
            minimum: 0,
            description: "must be a positive number and is required"
          },
          category: {
            bsonType: "string",
            description: "must be a string and is required"
          }
        }
      }
    }
  });
  ```

### **g. Monitor and Log Insert Operations**

- **Use Monitoring Tools**: Utilize MongoDB’s monitoring tools like MongoDB Atlas or Ops Manager to track insert performance and identify bottlenecks.
- **Implement Logging**: Log insert operations and any errors to aid in debugging and maintaining data integrity.

## **8. Troubleshooting Common Issues**

### **a. Duplicate Key Errors**

**Cause:** Attempting to insert a document with a duplicate value in a field that has a unique index.

#### **Solution:**
- **Ensure Unique Values**: Verify that the data being inserted does not contain duplicates in unique fields.
- **Handle Errors Gracefully**: Implement error handling in your application to manage duplicate key errors.

```javascript
db.users.insertOne({ _id: 1, email: "duplicate@example.com" })
.catch(err => {
  if (err.code === 11000) {
    console.error("Duplicate key error:", err.message);
  } else {
    console.error("Insert failed:", err);
  }
});
```

### **b. Document Size Limit Exceeded**

**Cause:** Inserting a document larger than MongoDB’s 16MB limit.

#### **Solution:**
- **Refactor Data Model**: Break down large documents into smaller, related documents using referencing.
- **Use GridFS**: For storing large binary files, use MongoDB’s GridFS which splits files into smaller chunks.

```javascript
// Example of using GridFS with the MongoDB Node.js driver
const GridFSBucket = require('mongodb').GridFSBucket;
const fs = require('fs');

const bucket = new GridFSBucket(db, { bucketName: 'files' });
fs.createReadStream('largefile.zip')
  .pipe(bucket.openUploadStream('largefile.zip'))
  .on('error', function(error) {
    console.error('Error uploading file:', error);
  })
  .on('finish', function() {
    console.log('File uploaded successfully');
  });
```

### **c. Performance Issues with Bulk Inserts**

**Cause:** Inserting very large batches can lead to memory exhaustion or slow performance.

#### **Solution:**
- **Batch Inserts**: Split large inserts into smaller batches (e.g., 1000 documents per batch).
- **Optimize Indexing**: Ensure that only necessary indexes are in place during bulk inserts.

```javascript
const batchSize = 1000;
for (let i = 0; i < largeDataset.length; i += batchSize) {
  const batch = largeDataset.slice(i, i + batchSize);
  db.collection.insertMany(batch)
  .then(result => {
    console.log(`Inserted batch ${i / batchSize + 1}`);
  })
  .catch(err => {
    console.error("Bulk insert error:", err);
  });
}
```

## **9. Summary of Create Operations**

- **`insertOne()`**: Inserts a single document into a collection. Ideal for individual insertions.
- **`insertMany()`**: Inserts multiple documents in a single operation. Enhances performance for bulk insertions.
- **`bulkWrite()`**: Performs a mix of insert, update, and delete operations in a single batch. Useful for complex data manipulation tasks.
- **Best Practices**:
  - Maintain consistent data structures.
  - Use appropriate data types and indexing.
  - Handle errors gracefully.
  - Optimize batch sizes for bulk operations.
  - Implement validation and security measures.

---

These notes provide a detailed understanding of Create Operations in MongoDB, including how to insert single and multiple documents, perform bulk inserts, handle common issues, and follow best practices for efficient and reliable data insertion. Mastery of these operations is essential for effectively managing and populating your MongoDB databases.
