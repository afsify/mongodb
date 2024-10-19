# **Using Validation Expressions in MongoDB**

Validation expressions in MongoDB allow you to enforce rules on documents during insert and update operations. This ensures data integrity and adherence to a defined schema, making it easier to maintain consistent data within your collections.

---

## **1. Introduction to Validation Expressions**

Validation expressions are part of MongoDB’s schema validation feature that checks documents against specified rules when they are created or modified. They are defined within a collection's validation rules using the `$jsonSchema` keyword or through the `validator` option.

### **Key Benefits of Using Validation Expressions:**
- **Data Integrity**: Ensures that only valid documents are stored in your collections.
- **Consistency**: Helps maintain a uniform structure across documents, simplifying data management and querying.
- **Error Prevention**: Catches issues at the time of insertion or update, preventing problematic data from being stored.

---

## **2. Setting Up Validation Expressions**

### **a. Defining Validation Rules**
To define validation rules for a collection, you can use the `db.createCollection()` method or the `collMod` command.

#### **Example: Creating a Collection with Validation Rules**

```javascript
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "email", "age"],
      properties: {
        username: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+\..+$",
          description: "must be a valid email format"
        },
        age: {
          bsonType: "int",
          minimum: 0,
          maximum: 120,
          description: "must be an integer in [0, 120]"
        }
      }
    }
  }
});
```

### **b. Modifying Existing Validation Rules**
You can modify the validation rules of an existing collection using the `collMod` command.

#### **Example: Updating Validation Rules**

```javascript
db.runCommand({
  collMod: "users",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "email", "age"],
      properties: {
        username: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+\..+$",
          description: "must be a valid email format"
        },
        age: {
          bsonType: "int",
          minimum: 0,
          maximum: 120,
          description: "must be an integer in [0, 120]"
        },
        createdAt: {
          bsonType: "date",
          description: "must be a date and is required"
        }
      }
    }
  }
});
```

---

## **3. Understanding BSON Types**

In validation expressions, you can specify BSON types to enforce data types. The commonly used BSON types include:

- **`string`**: Represents a string value.
- **`int`**: Represents a 32-bit integer.
- **`long`**: Represents a 64-bit integer.
- **`double`**: Represents a double-precision floating-point value.
- **`bool`**: Represents a Boolean value.
- **`array`**: Represents an array of values.
- **`object`**: Represents an embedded document.

### **Example of BSON Types**

```javascript
{
  bsonType: "object",
  properties: {
    name: { bsonType: "string" },
    age: { bsonType: "int" },
    active: { bsonType: "bool" },
    tags: { bsonType: "array" }
  }
}
```

---

## **4. Using Operators in Validation Expressions**

You can use various operators in your validation expressions to create more complex validation logic. Some common operators include:

- **`$and`**: Specifies that all conditions must be true.
- **`$or`**: Specifies that at least one condition must be true.
- **`$not`**: Inverts the result of a condition.
- **`$jsonSchema`**: Allows you to specify a JSON schema for validation.

### **Example of Using Operators**

```javascript
{
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        age: {
          bsonType: "int",
          minimum: 18,
          maximum: 65,
          description: "must be an integer in [18, 65]"
        },
        status: {
          bsonType: "string",
          enum: ["active", "inactive"],
          description: "must be either 'active' or 'inactive'"
        },
        password: {
          bsonType: "string",
          minLength: 8,
          description: "must be a string with at least 8 characters"
        }
      }
    }
  }
}
```

---

## **5. Validating Data on Insert and Update**

MongoDB automatically applies the validation rules during insert and update operations. If a document fails validation, an error is returned, and the operation is rejected.

### **Example of Document Insertion with Validation**

```javascript
db.users.insert({
  username: "john_doe",
  email: "john@example.com",
  age: 25
});
```

If the document does not meet the validation criteria (e.g., if `age` is less than 0), MongoDB will return an error.

---

## **6. Handling Validation Errors**

When a validation error occurs, MongoDB provides details about the error. You can handle these errors in your application to inform users about the issues.

### **Example of Error Handling in Node.js**

```javascript
db.users.insert({
  username: "john_doe",
  email: "invalid_email_format",
  age: -5
}, (error, result) => {
  if (error) {
    console.error("Validation Error:", error.message);
  } else {
    console.log("Document inserted:", result);
  }
});
```

---

## **7. Summary**

Validation expressions in MongoDB are powerful tools for enforcing data integrity and consistency within your collections. By defining clear validation rules using BSON types and operators, you can ensure that your application works with clean, reliable data.

### **Key Points:**
- Use `$jsonSchema` to define validation rules for collections.
- Enforce data types and constraints using BSON types and operators.
- Automatically validate documents during insert and update operations.
- Handle validation errors gracefully to improve user experience.

By utilizing validation expressions effectively, you can maintain the quality of your data in MongoDB and prevent issues that could arise from incorrect or inconsistent data entries.
