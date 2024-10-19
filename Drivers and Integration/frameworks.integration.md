# **Integrating MongoDB with Web Frameworks**

Integrating MongoDB with popular web frameworks like **Express.js** (Node.js), **Flask** (Python), and **Spring** (Java) enables developers to build robust web applications with efficient data management. Below are detailed notes on how to integrate MongoDB with each of these frameworks.

---

## **1. Integrating MongoDB with Express.js**

### **1.1. Setup**

1. **Install Required Packages:**
   To use MongoDB with Express, you need to install the `mongoose` package, which provides a straightforward way to model your data.

   ```bash
   npm install mongoose
   ```

2. **Connect to MongoDB:**

   ```javascript
   const mongoose = require('mongoose');

   mongoose.connect('mongodb://username:password@host:port/database', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   })
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));
   ```

### **1.2. Defining a Model**

Define a model that represents the structure of your data.

```javascript
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model('User', UserSchema);
```

### **1.3. CRUD Operations**

- **Create:**
  ```javascript
  const createUser = async (userData) => {
    const user = new User(userData);
    await user.save();
  };
  ```

- **Read:**
  ```javascript
  const getUsers = async () => {
    return await User.find();
  };
  ```

- **Update:**
  ```javascript
  const updateUser = async (userId, updateData) => {
    await User.findByIdAndUpdate(userId, updateData);
  };
  ```

- **Delete:**
  ```javascript
  const deleteUser = async (userId) => {
    await User.findByIdAndDelete(userId);
  };
  ```

### **1.4. Express Routes Example**

```javascript
const express = require('express');
const app = express();
app.use(express.json());

app.post('/users', async (req, res) => {
  await createUser(req.body);
  res.status(201).send('User created');
});

app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});
```

---

## **2. Integrating MongoDB with Flask**

### **2.1. Setup**

1. **Install Required Packages:**
   Use `Flask-PyMongo` to connect Flask with MongoDB.

   ```bash
   pip install Flask-PyMongo
   ```

2. **Connect to MongoDB:**

   ```python
   from flask import Flask
   from flask_pymongo import PyMongo

   app = Flask(__name__)
   app.config["MONGO_URI"] = "mongodb://username:password@host:port/database"
   mongo = PyMongo(app)
   ```

### **2.2. CRUD Operations**

- **Create:**
  ```python
  @app.route('/users', methods=['POST'])
  def add_user():
      user_data = request.json
      mongo.db.users.insert_one(user_data)
      return "User added", 201
  ```

- **Read:**
  ```python
  @app.route('/users', methods=['GET'])
  def get_users():
      users = list(mongo.db.users.find())
      return jsonify(users)
  ```

- **Update:**
  ```python
  @app.route('/users/<user_id>', methods=['PUT'])
  def update_user(user_id):
      mongo.db.users.update_one({'_id': ObjectId(user_id)}, {'$set': request.json})
      return "User updated", 200
  ```

- **Delete:**
  ```python
  @app.route('/users/<user_id>', methods=['DELETE'])
  def delete_user(user_id):
      mongo.db.users.delete_one({'_id': ObjectId(user_id)})
      return "User deleted", 200
  ```

---

## **3. Integrating MongoDB with Spring**

### **3.1. Setup**

1. **Add Dependencies:**
   Include the MongoDB starter in your `pom.xml` if using Maven:

   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-data-mongodb</artifactId>
   </dependency>
   ```

2. **Configuration:**
   Configure your MongoDB connection in `application.properties`.

   ```properties
   spring.data.mongodb.uri=mongodb://username:password@host:port/database
   ```

### **3.2. Defining a Model**

Create a model class that maps to your MongoDB collection.

```java
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private int age;

    // Getters and setters
}
```

### **3.3. Repository Interface**

Define a repository interface for CRUD operations.

```java
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    // Custom query methods can be added here
}
```

### **3.4. Service Layer**

Create a service layer to handle business logic.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User updateUser(String id, User user) {
        user.setId(id);
        return userRepository.save(user);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
```

### **3.5. Controller Layer**

Set up a controller to manage HTTP requests.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public User addUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getUsers();
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable String id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }
}
```

---

## **4. Summary of Integrating MongoDB with Web Frameworks**

Integrating MongoDB with web frameworks allows for efficient data handling in applications. 

- **Express.js**: Simple setup using Mongoose for modeling data and performing CRUD operations.
- **Flask**: Utilizes Flask-PyMongo for straightforward interaction with MongoDB, allowing easy routing and request handling.
- **Spring**: Uses Spring Data MongoDB for a more structured approach, leveraging repositories and services for data manipulation.

These integrations enable developers to build scalable and maintainable web applications effectively, leveraging the capabilities of MongoDB for data storage and retrieval.
