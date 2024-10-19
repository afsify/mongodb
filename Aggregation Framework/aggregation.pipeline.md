# **Aggregation Pipeline in MongoDB**

The **aggregation pipeline** is a powerful framework for data aggregation in MongoDB. It allows users to process data records and return computed results. The pipeline consists of multiple stages, each performing a specific operation on the data.

---

## **1. Overview of Aggregation Pipeline**

- **Definition**: The aggregation pipeline is a sequence of stages that processes documents in a collection and transforms them into aggregated results.
- **Use Cases**: Common use cases include filtering data, grouping records, calculating sums or averages, transforming data formats, and more.
- **Method**: The pipeline operates on documents as they pass through a series of stages, each performing an operation on the documents.

### **Basic Syntax**:
```javascript
db.collection.aggregate([
  { $stage1: { ... } },
  { $stage2: { ... } },
  ...
]);
```

---

## **2. Stages of the Aggregation Pipeline**

### **2.1. Match Stage**
- **Purpose**: Filters the documents to pass only those that match the specified condition(s) to the next stage.
- **Syntax**:
  ```javascript
  { $match: { field: value } }
  ```
- **Example**:
  ```javascript
  db.orders.aggregate([
    { $match: { status: "completed" } }
  ]);
  ```
- **Use Case**: Use the `$match` stage to filter documents based on criteria before performing further operations.

---

### **2.2. Group Stage**
- **Purpose**: Groups documents by a specified identifier and allows the application of aggregation functions (like sum, average, etc.) to the grouped data.
- **Syntax**:
  ```javascript
  { $group: { _id: "$field", aggregateField: { $sum: "$anotherField" } } }
  ```
- **Example**:
  ```javascript
  db.orders.aggregate([
    { $group: { _id: "$customerId", totalAmount: { $sum: "$amount" } } }
  ]);
  ```
- **Use Case**: Use the `$group` stage to summarize data, such as calculating total sales per customer.

---

### **2.3. Project Stage**
- **Purpose**: Reshapes each document in the stream, allowing you to specify which fields to include or exclude, and create computed fields.
- **Syntax**:
  ```javascript
  { $project: { field1: 1, field2: 0, newField: { $multiply: ["$fieldA", "$fieldB"] } } }
  ```
- **Example**:
  ```javascript
  db.orders.aggregate([
    { $project: { customerId: 1, total: { $multiply: ["$quantity", "$price"] } } }
  ]);
  ```
- **Use Case**: Use the `$project` stage to modify the output documents, retaining only necessary fields and calculating new fields.

---

### **2.4. Sort Stage**
- **Purpose**: Sorts the documents in the stream based on specified field(s).
- **Syntax**:
  ```javascript
  { $sort: { field: 1 } } // 1 for ascending, -1 for descending
  ```
- **Example**:
  ```javascript
  db.orders.aggregate([
    { $sort: { total: -1 } } // Sort by total amount in descending order
  ]);
  ```
- **Use Case**: Use the `$sort` stage to arrange documents in a desired order, such as sorting sales data by amount.

---

### **2.5. Limit Stage**
- **Purpose**: Restricts the number of documents passed to the next stage to the specified number.
- **Syntax**:
  ```javascript
  { $limit: <number> }
  ```
- **Example**:
  ```javascript
  db.orders.aggregate([
    { $limit: 5 } // Limit to the first 5 documents
  ]);
  ```
- **Use Case**: Use the `$limit` stage to control the size of the output, such as displaying the top N results.

---

### **2.6. Skip Stage**
- **Purpose**: Skips over a specified number of documents and passes the remaining documents to the next stage.
- **Syntax**:
  ```javascript
  { $skip: <number> }
  ```
- **Example**:
  ```javascript
  db.orders.aggregate([
    { $skip: 10 } // Skip the first 10 documents
  ]);
  ```
- **Use Case**: Use the `$skip` stage for pagination, allowing you to skip documents already displayed.

---

### **2.7. Unwind Stage**
- **Purpose**: Deconstructs an array field from the input documents to output a document for each element of the array.
- **Syntax**:
  ```javascript
  { $unwind: "$arrayField" }
  ```
- **Example**:
  ```javascript
  db.orders.aggregate([
    { $unwind: "$items" } // Unwind the items array to separate documents
  ]);
  ```
- **Use Case**: Use the `$unwind` stage to normalize data structures, turning each element in an array into its own document.

---

## **3. Example Aggregation Pipeline**

Here’s a complete example that combines several stages:
```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customerId", totalAmount: { $sum: "$amount" } } },
  { $sort: { totalAmount: -1 } },
  { $limit: 10 }
]);
```
**Explanation**: 
- This pipeline matches completed orders, groups them by customer ID to calculate total amounts, sorts the results in descending order, and limits the output to the top 10 customers.

---

## **Conclusion**

The aggregation pipeline in MongoDB is a versatile tool for transforming and processing data. Understanding the various stages—Match, Group, Project, Sort, Limit, Skip, and Unwind—enables developers to create powerful data processing workflows that can derive meaningful insights from their data. 
