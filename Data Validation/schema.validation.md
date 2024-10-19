# **Schema Validation in MongoDB**

Schema validation in MongoDB allows developers to enforce rules on the documents stored within a collection. This ensures that data adheres to a specified format and maintains data integrity.

---

## **1. Overview**

### **1.1. Definition**
- **Schema Validation**: A mechanism in MongoDB that allows developers to define rules or constraints on the structure and content of documents in a collection.
- **Purpose**: Ensures that the data inserted or updated in a collection meets certain criteria, thus improving data quality and consistency.

### **1.2. Importance**
- **Data Integrity**: Prevents invalid or malformed data from being stored.
- **Consistency**: Ensures that all documents in a collection conform to the same structure.
- **Error Reduction**: Minimizes runtime errors by catching validation issues during data insertion or updates.

---

## **2. Types of Schema Validation**

### **2.1. JSON Schema**
- MongoDB uses JSON Schema to define the validation rules. JSON Schema is a powerful standard for specifying the structure and validation of JSON documents.
- Supports various validation keywords, including `type`, `properties`, `required`, `pattern`, etc.

### **2.2. Validation Levels**
- **Strict**: Validation is enforced, and documents that do not meet the criteria are rejected.
- **Moderate**: Existing documents are not validated, but new or updated documents must adhere to the defined schema.

### **2.3. Validation Action**
- **Error**: Rejects documents that do not pass validation.
- **Warn**: Logs a warning for invalid documents but allows them to be inserted or updated.

---

## **3. Implementing Schema Validation**

### **3.1. Creating a Collection with Validation**
To create a collection with validation rules, you can specify the rules using the `validator` option when creating a collection.

#### **Example**
```javascript
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+\\..+$",
          description: "must be a valid email address and is required"
        },
        age: {
          bsonType: "int",
          minimum: 0,
          maximum: 120,
          description: "must be an integer in [0, 120] and is not required"
        }
      }
    }
  }
});
```

### **3.2. Modifying Validation Rules**
You can modify the existing validation rules of a collection using the `collMod` command.

#### **Example**
```javascript
db.runCommand({
  collMod: "users",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "age"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+\\..+$",
          description: "must be a valid email address and is required"
        },
        age: {
          bsonType: "int",
          minimum: 0,
          maximum: 120,
          description: "must be an integer in [0, 120] and is required"
        }
      }
    }
  }
});
```

### **3.3. Inserting and Validating Documents**
When inserting documents into a collection with schema validation, MongoDB checks the documents against the defined rules.

#### **Example**
```javascript
// Valid document
db.users.insertOne({
  name: "John Doe",
  email: "john.doe@example.com",
  age: 30
});

// Invalid document (missing required field 'email')
db.users.insertOne({
  name: "Jane Doe",
  age: 25
}); // This will throw a validation error
```

---

## **4. Key Validation Keywords**

### **4.1. bsonType**
Specifies the expected BSON type of a field (e.g., `string`, `int`, `double`, `array`, `object`).

### **4.2. required**
An array of fields that must be present in the document.

### **4.3. properties**
Defines the schema for specific fields, including type, format, and constraints.

### **4.4. pattern**
A regular expression that a string field must match.

### **4.5. minimum/maximum**
Sets minimum and maximum values for numeric fields.

### **4.6. enum**
Restricts a field to a specific set of values.

---

## **5. Example Schema Validation**

### **Example Schema**
```javascript
{
  bsonType: "object",
  required: ["username", "password", "email"],
  properties: {
    username: {
      bsonType: "string",
      minLength: 3,
      maxLength: 20,
      description: "must be a string and between 3 to 20 characters"
    },
    password: {
      bsonType: "string",
      minLength: 6,
      description: "must be a string and at least 6 characters long"
    },
    email: {
      bsonType: "string",
      pattern: "^.+@.+\\..+$",
      description: "must be a valid email format"
    },
    createdAt: {
      bsonType: "date",
      description: "must be a date and is required"
    }
  }
}
```

### **Example Document**
```javascript
{
  username: "user123",
  password: "securepassword",
  email: "user@example.com",
  createdAt: new Date()
}
```

---

## **6. Error Handling in Validation**

When a document fails validation, MongoDB will throw a `WriteError` indicating the reason for the failure. You can catch these errors and handle them accordingly in your application logic.

### **Example**
```javascript
try {
  db.users.insertOne({
    username: "ab", // Invalid: too short
    password: "123456",
    email: "invalid-email",
    createdAt: new Date()
  });
} catch (e) {
  print("Error inserting document: " + e);
}
```

---

## **7. Summary of Key Points**

- **Schema Validation**: Ensures data integrity and consistency in MongoDB collections.
- **JSON Schema**: Utilizes JSON Schema for defining validation rules.
- **Types**: Supports strict and moderate validation levels.
- **Keywords**: Includes `bsonType`, `required`, `properties`, and others for defining rules.
- **Error Handling**: Allows developers to catch and handle validation errors effectively.

---

Schema validation is a powerful feature in MongoDB that helps maintain data quality and integrity, making it essential for applications that require reliable and structured data storage.
