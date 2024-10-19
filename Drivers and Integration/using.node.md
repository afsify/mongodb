# **Using MongoDB with Node.js, Python, Java, etc.**

MongoDB can be seamlessly integrated with various programming languages, allowing developers to interact with databases effectively. This document provides an overview of using MongoDB with Node.js, Python, and Java.

---

## **1. Using MongoDB with Node.js**

### **1.1. Installation**
- Use the MongoDB Node.js driver.
- Install via npm:
  ```bash
  npm install mongodb
  ```

### **1.2. Connecting to MongoDB**
```javascript
const { MongoClient } = require('mongodb');

const uri = 'mongodb://username:password@localhost:27017';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    // Perform operations
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
```

### **1.3. Basic CRUD Operations**

#### **Create**
```javascript
const db = client.db('myDatabase');
const collection = db.collection('myCollection');

const newDocument = { name: 'Alice', age: 25 };
const result = await collection.insertOne(newDocument);
console.log(`Inserted document with id: ${result.insertedId}`);
```

#### **Read**
```javascript
const document = await collection.findOne({ name: 'Alice' });
console.log(document);
```

#### **Update**
```javascript
const updateResult = await collection.updateOne(
  { name: 'Alice' },
  { $set: { age: 26 } }
);
console.log(`Updated ${updateResult.modifiedCount} document(s)`);
```

#### **Delete**
```javascript
const deleteResult = await collection.deleteOne({ name: 'Alice' });
console.log(`Deleted ${deleteResult.deletedCount} document(s)`);
```

---

## **2. Using MongoDB with Python**

### **2.1. Installation**
- Use the PyMongo library.
- Install via pip:
  ```bash
  pip install pymongo
  ```

### **2.2. Connecting to MongoDB**
```python
from pymongo import MongoClient

client = MongoClient('mongodb://username:password@localhost:27017')
db = client['myDatabase']
print('Connected to MongoDB')
```

### **2.3. Basic CRUD Operations**

#### **Create**
```python
collection = db['myCollection']
new_document = {'name': 'Alice', 'age': 25}
result = collection.insert_one(new_document)
print(f'Inserted document with id: {result.inserted_id}')
```

#### **Read**
```python
document = collection.find_one({'name': 'Alice'})
print(document)
```

#### **Update**
```python
update_result = collection.update_one(
    {'name': 'Alice'},
    {'$set': {'age': 26}}
)
print(f'Updated {update_result.modified_count} document(s)')
```

#### **Delete**
```python
delete_result = collection.delete_one({'name': 'Alice'})
print(f'Deleted {delete_result.deleted_count} document(s)')
```

---

## **3. Using MongoDB with Java**

### **3.1. Installation**
- Use the MongoDB Java driver.
- Add the dependency in your `pom.xml` (for Maven projects):
```xml
<dependency>
    <groupId>org.mongodb</groupId>
    <artifactId>mongodb-driver-sync</artifactId>
    <version>4.8.0</version>
</dependency>
```

### **3.2. Connecting to MongoDB**
```java
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;

public class MongoDBExample {
    public static void main(String[] args) {
        MongoClient mongoClient = MongoClients.create("mongodb://username:password@localhost:27017");
        MongoDatabase database = mongoClient.getDatabase("myDatabase");
        System.out.println("Connected to MongoDB");
    }
}
```

### **3.3. Basic CRUD Operations**

#### **Create**
```java
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import org.bson.Document;

MongoCollection<Document> collection = database.getCollection("myCollection");
Document newDocument = new Document("name", "Alice").append("age", 25);
collection.insertOne(newDocument);
System.out.println("Inserted document with id: " + newDocument.getObjectId("_id"));
```

#### **Read**
```java
Document document = collection.find(Filters.eq("name", "Alice")).first();
System.out.println(document.toJson());
```

#### **Update**
```java
collection.updateOne(Filters.eq("name", "Alice"), new Document("$set", new Document("age", 26)));
System.out.println("Updated document");
```

#### **Delete**
```java
collection.deleteOne(Filters.eq("name", "Alice"));
System.out.println("Deleted document");
```

---

## **4. Conclusion**

Integrating MongoDB with Node.js, Python, and Java is straightforward using the respective drivers. Each language has its own syntax and methods for connecting to the database and performing CRUD operations. By following the examples provided, you can start working with MongoDB in your preferred programming language efficiently.

--- 

These notes provide a concise yet thorough overview of using MongoDB with popular programming languages, helping you get started with database operations.
