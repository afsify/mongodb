# **Authorization and User Roles in MongoDB**

MongoDB implements a robust authorization system that allows you to control access to databases and collections. By defining user roles and permissions, you can ensure that users have appropriate access levels to your data.

---

## **1. Overview of Authorization**

Authorization in MongoDB refers to the process of determining whether a user has the right to perform a specific operation on a resource (e.g., a database, collection, or document). It involves:
- **User Authentication**: Verifying the identity of a user.
- **Role-Based Access Control (RBAC)**: Granting permissions based on user roles.

### **1.1. Authentication vs. Authorization**
- **Authentication**: The process of verifying a user's identity (e.g., username and password).
- **Authorization**: The process of determining what actions an authenticated user can perform.

---

## **2. User Roles in MongoDB**

MongoDB uses roles to manage user permissions. A role defines a set of privileges that dictate what actions users can perform on databases and collections.

### **2.1. Built-in Roles**
MongoDB comes with several built-in roles that provide common sets of permissions:

- **read**: Allows users to read data from a database.
- **readWrite**: Allows users to read and write data to a database.
- **dbAdmin**: Provides administrative access to a database (e.g., create indexes, view stats).
- **userAdmin**: Allows users to create and modify roles and users.
- **clusterAdmin**: Provides administrative access to the entire MongoDB cluster.
- **readAnyDatabase**: Allows users to read from all databases.
- **readWriteAnyDatabase**: Allows users to read and write to all databases.

### **2.2. Custom Roles**
You can create custom roles to meet specific requirements. A custom role can be defined with specific privileges tailored to your application's needs.

#### **Example of Creating a Custom Role:**
```javascript
use admin
db.createRole({
  role: "customRole",
  privileges: [
    { resource: { db: "myDatabase", collection: "myCollection" }, actions: ["find", "insert", "update"] }
  ],
  roles: []
});
```
This custom role allows users to find, insert, and update documents in `myDatabase.myCollection`.

---

## **3. Granting Roles to Users**

Once roles are defined, you can grant them to users to control their access to resources.

### **3.1. Creating a User with a Role**
To create a user and assign them a role, use the following command:

```javascript
use myDatabase
db.createUser({
  user: "myUser",
  pwd: "password123",
  roles: [{ role: "readWrite", db: "myDatabase" }]
});
```
This command creates a user `myUser` with the `readWrite` role on `myDatabase`.

### **3.2. Adding Roles to an Existing User**
To add a new role to an existing user, use the `grantRolesToUser` command:

```javascript
use myDatabase
db.grantRolesToUser("myUser", [{ role: "dbAdmin", db: "myDatabase" }]);
```
This adds the `dbAdmin` role to `myUser`.

---

## **4. Viewing User Roles**

You can view the roles assigned to a user by using the `db.getUser` command:

```javascript
use myDatabase
db.getUser("myUser");
```

This command returns details about the user, including the roles assigned to them.

---

## **5. Revoking Roles from Users**

If you need to remove a role from a user, use the `revokeRolesFromUser` command:

```javascript
use myDatabase
db.revokeRolesFromUser("myUser", [{ role: "dbAdmin", db: "myDatabase" }]);
```

This command removes the `dbAdmin` role from `myUser`.

---

## **6. Security Best Practices**

- **Principle of Least Privilege**: Grant users the minimum level of access they need to perform their jobs.
- **Regularly Review User Roles**: Periodically audit user roles and permissions to ensure compliance with security policies.
- **Use Strong Passwords**: Ensure that user passwords are strong and follow security best practices.
- **Enable Authentication**: Always enable authentication in your MongoDB deployment to prevent unauthorized access.

---

## **7. Summary of Key Concepts**

- **Authorization**: Controls what authenticated users can do.
- **User Roles**: Define sets of permissions that dictate user access.
- **Built-in and Custom Roles**: Use predefined roles or create custom roles tailored to your needs.
- **Role Management**: Grant, revoke, and view user roles to manage access effectively.

---

By understanding authorization and user roles in MongoDB, you can implement secure access controls to protect your data while enabling users to perform their necessary tasks.
