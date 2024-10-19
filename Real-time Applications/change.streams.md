# **Using Change Streams**

Change Streams allow applications to listen for real-time changes in MongoDB collections. This feature provides a powerful way to react to database changes, enabling applications to build responsive and dynamic functionalities.

## **1. What are Change Streams?**

- **Real-time Notifications**: Change Streams provide a stream of changes that occur in the database, allowing applications to react to events as they happen.
- **Event Types**: Change Streams can capture various types of operations, including inserts, updates, deletes, and renames.

## **2. Benefits of Change Streams**

- **Real-Time Data Processing**: Enable applications to respond instantly to data changes without the need for polling the database.
- **Reduced Latency**: Immediate notification of changes allows for faster updates in applications.
- **Decoupling**: Change Streams facilitate a decoupled architecture, where different components can listen for changes independently.

## **3. Prerequisites for Using Change Streams**

- **MongoDB Version**: Change Streams are available starting from MongoDB 3.6.
- **Replica Set or Sharded Cluster**: Change Streams require either a replica set or a sharded cluster to function. They do not work with standalone MongoDB instances.

## **4. Using Change Streams**

### **4.1 Basic Usage**

To use Change Streams, follow these steps:

1. **Connect to the MongoDB Database**: Establish a connection to your MongoDB instance.
2. **Access the Collection**: Get a reference to the collection you want to monitor.
3. **Create a Change Stream**: Use the `watch()` method on the collection to create a Change Stream.
4. **Process Change Events**: Define a callback function to handle incoming change events.

### **4.2 Example of Using Change Streams in Node.js**

Here’s an example of how to set up and use Change Streams with the Node.js MongoDB driver:

#### **Step-by-Step Example**:

```javascript
const { MongoClient } = require('mongodb');

async function run() {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    
    const db = client.db('myDatabase');
    const collection = db.collection('myCollection');

    // Create a change stream on the collection
    const changeStream = collection.watch();

    // Process change events
    changeStream.on('change', (change) => {
        console.log('Change detected:', change);

        switch (change.operationType) {
            case 'insert':
                console.log('New document inserted:', change.fullDocument);
                break;
            case 'update':
                console.log('Document updated:', change.documentKey);
                break;
            case 'delete':
                console.log('Document deleted:', change.documentKey);
                break;
            // Add cases for other operation types if needed
            default:
                console.log('Other operation:', change.operationType);
        }
    });

    // Example insert operation to trigger change stream
    await collection.insertOne({ name: 'Alice', age: 25 });

    // Close the client after some time (for demonstration purposes)
    setTimeout(() => {
        changeStream.close(); // Close the change stream
        client.close(); // Close the MongoDB connection
    }, 10000); // Adjust the duration as needed
}

run().catch(console.error);
```

### **4.3 Understanding Change Document Structure**

When a change occurs, the change document received in the `change` event has the following key fields:

- **operationType**: The type of operation that triggered the change (e.g., `insert`, `update`, `delete`).
- **fullDocument**: The document affected by the change (available for `insert` and `update` operations).
- **documentKey**: The key of the document that was changed, usually containing the `_id` field.
- **ns**: The namespace indicating the database and collection where the change occurred.

#### **Example of a Change Document**:

```json
{
    "operationType": "insert",
    "fullDocument": {
        "_id": ObjectId("60e6e4f7c90f2f1281e0c8a5"),
        "name": "Alice",
        "age": 25
    },
    "documentKey": {
        "_id": ObjectId("60e6e4f7c90f2f1281e0c8a5")
    },
    "ns": {
        "db": "myDatabase",
        "coll": "myCollection"
    }
}
```

## **5. Change Stream Options**

When creating a Change Stream, you can specify options to customize its behavior:

- **Full Document**: Specify whether to return the full document with update events using the `fullDocument` option.
  - `fullDocument: 'updateLookup'` includes the full document after the update.

#### **Example with Options**:

```javascript
const changeStream = collection.watch([{ $match: { operationType: 'insert' } }], { fullDocument: 'updateLookup' });
```

## **6. Handling Errors**

It's essential to handle potential errors when using Change Streams. Implement error handling for connection issues or when the stream is closed.

### **Example of Error Handling**:

```javascript
changeStream.on('error', (error) => {
    console.error('Error in change stream:', error);
});
```

## **7. Conclusion**

Change Streams provide a robust mechanism for applications to respond to real-time data changes in MongoDB collections. By setting up a Change Stream, developers can build responsive applications that react immediately to changes, enhancing user experience and system performance. Whether used for notifications, real-time analytics, or synchronizing data across systems, Change Streams are a powerful feature of MongoDB.

--- 

These notes cover the essential aspects of using Change Streams in MongoDB, including their purpose, usage, and practical examples.
