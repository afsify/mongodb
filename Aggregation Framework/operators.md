# **Operators Used in Aggregation in MongoDB**

Aggregation in MongoDB is a powerful feature that allows for the processing of data to return computed results. It is particularly useful for transforming and combining data from multiple documents. This section covers various operators used in MongoDB's aggregation framework.

---

## **1. Overview of Aggregation Framework**

The aggregation framework provides a way to perform operations on data, such as filtering, transforming, and grouping, to produce a desired output. The pipeline approach allows for chaining multiple operations, making it highly versatile.

### **Aggregation Pipeline Stages**:
- **$match**: Filters documents based on specified criteria.
- **$group**: Groups documents by a specified key and performs aggregation operations on the grouped data.
- **$sort**: Sorts documents in the specified order.
- **$project**: Reshapes documents by including, excluding, or adding new fields.

---

## **2. Common Aggregation Operators**

### **a. $match**

- **Description**: Filters documents to pass only those that match the specified condition(s) to the next stage.
- **Example**:
  ```javascript
  db.collection.aggregate([
      { $match: { status: "active" } }
  ])
  ```

### **b. $group**

- **Description**: Groups documents by a specified identifier and can perform various accumulation operations.
- **Operators**:
  - **$sum**: Adds values together.
  - **$avg**: Calculates the average of values.
  - **$min**: Finds the minimum value.
  - **$max**: Finds the maximum value.
  - **$push**: Creates an array of values.
  - **$addToSet**: Creates an array of unique values.

#### **Example**:
```javascript
db.collection.aggregate([
    { $group: { 
        _id: "$category", 
        totalSales: { $sum: "$amount" }, 
        averageSales: { $avg: "$amount" }
    }}
])
```

### **c. $sort**

- **Description**: Sorts documents in ascending or descending order based on specified field(s).
- **Example**:
```javascript
db.collection.aggregate([
    { $sort: { totalSales: -1 } } // Sort by totalSales in descending order
])
```

### **d. $project**

- **Description**: Reshapes documents by including, excluding, or modifying fields.
- **Example**:
```javascript
db.collection.aggregate([
    { $project: { 
        item: 1, 
        totalAmount: { $multiply: ["$quantity", "$price"] } 
    }}
])
```

### **e. $limit**

- **Description**: Limits the number of documents passed to the next stage.
- **Example**:
```javascript
db.collection.aggregate([
    { $limit: 5 } // Returns only the first 5 documents
])
```

### **f. $skip**

- **Description**: Skips over a specified number of documents and passes the remaining documents to the next stage.
- **Example**:
```javascript
db.collection.aggregate([
    { $skip: 10 } // Skips the first 10 documents
])
```

---

## **3. Array Operators**

### **a. $unwind**

- **Description**: Deconstructs an array field from the input documents to output a document for each element of the array.
- **Example**:
```javascript
db.collection.aggregate([
    { $unwind: "$items" }
])
```

### **b. $addFields**

- **Description**: Adds new fields to documents, similar to `$project`, but retains the existing fields.
- **Example**:
```javascript
db.collection.aggregate([
    { $addFields: { total: { $add: ["$quantity", "$price"] } } }
])
```

### **c. $filter**

- **Description**: Filters the contents of an array and returns an array with only the elements that match a specified condition.
- **Example**:
```javascript
db.collection.aggregate([
    { $project: { 
        filteredItems: { 
            $filter: { 
                input: "$items", 
                as: "item", 
                cond: { $gt: ["$$item.price", 100] } 
            } 
        }
    }}
])
```

---

## **4. Date Operators**

### **a. $currentDate**

- **Description**: Sets the value of a field to the current date.
- **Example**:
```javascript
db.collection.aggregate([
    { $addFields: { createdAt: { $currentDate: { $type: "date" } } } }
])
```

### **b. $dateToString**

- **Description**: Converts a date object to a string based on a specified format.
- **Example**:
```javascript
db.collection.aggregate([
    { $project: { 
        dateString: { $dateToString: { format: "%Y-%m-%d", date: "$dateField" } } 
    }}
])
```

---

## **5. Conditional Operators**

### **a. $cond**

- **Description**: Evaluates a condition and returns one of two values based on whether the condition is true or false.
- **Example**:
```javascript
db.collection.aggregate([
    { $project: { 
        status: { 
            $cond: { 
                if: { $gt: ["$amount", 100] }, 
                then: "High", 
                else: "Low" 
            } 
        }
    }}
])
```

### **b. $switch**

- **Description**: Evaluates a series of conditions and returns a value that corresponds to the first true condition.
- **Example**:
```javascript
db.collection.aggregate([
    { $project: { 
        category: { 
            $switch: { 
                branches: [
                    { case: { $lt: ["$amount", 50] }, then: "Low" },
                    { case: { $lt: ["$amount", 100] }, then: "Medium" }
                ],
                default: "High"
            } 
        }
    }}
])
```

---

## **6. Conclusion**

Understanding and effectively utilizing aggregation operators is essential for manipulating and analyzing data in MongoDB. By leveraging the capabilities of the aggregation framework, you can perform complex data transformations and aggregations to derive meaningful insights from your datasets. 

### **Key Points**:
- Use **$match** to filter documents.
- Utilize **$group** for aggregation and summarization.
- Employ **$project** to reshape documents.
- Implement array operators like **$unwind** and **$filter** for array manipulation.
- Apply date and conditional operators for advanced queries. 

With practice, you can harness the full potential of MongoDB's aggregation framework to enhance your data processing workflows.
