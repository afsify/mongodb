# **Installation and Setup of MongoDB**

## **1. System Requirements**

Before installing MongoDB, ensure that your system meets the following minimum requirements:

### **Operating Systems Supported**:
- **Windows**: 64-bit Windows 7 or later.
- **macOS**: macOS 10.14 or later.
- **Linux**: Ubuntu, Debian, CentOS, RHEL, Fedora, SUSE (64-bit systems only).

### **Hardware Requirements**:
- **RAM**: Minimum of 2 GB; recommended 4 GB or more for production systems.
- **Disk Space**: MongoDB requires sufficient disk space for data storage. The size will vary depending on your application. For development, at least 5 GB is recommended.
- **CPU**: Multi-core processor recommended for production deployments.

### **Additional Requirements**:
- **C++11 Compiler**: For building MongoDB from source (optional).
- **SSL/TLS**: Supported for secure communication.
  
---

## **2. Installation on Different Platforms**

### **a. Installation on Windows**

**Steps**:
1. **Download MongoDB**: Visit the [MongoDB Download Center](https://www.mongodb.com/try/download/community) and select the latest version for Windows.
2. **Install MongoDB**:
   - Run the downloaded `.msi` installer.
   - Follow the prompts to select the installation path and complete the installation.
   - Choose to install **MongoDB as a Windows Service** (optional).
3. **Set Up the Data Directory**:
   - By default, MongoDB stores data in the `C:\data\db` directory. If this folder doesn’t exist, create it manually.
4. **Start MongoDB**:
   - Open Command Prompt and run the following to start MongoDB:
     ```bash
     mongod
     ```
   - Optionally, you can configure MongoDB to run as a Windows service automatically on startup.
5. **MongoDB Shell**:
   - Use the `mongo` command to start the MongoDB shell from another terminal window.

### **b. Installation on macOS**

**Steps**:
1. **Install via Homebrew**:
   - Open Terminal and run the following commands to install MongoDB:
     ```bash
     brew tap mongodb/brew
     brew install mongodb-community
     ```
2. **Create Data Directory**:
   - MongoDB uses `/data/db` as its default data directory. To create it, run:
     ```bash
     sudo mkdir -p /data/db
     sudo chown -R `id -un` /data/db
     ```
3. **Start MongoDB**:
   - Run the following command to start MongoDB:
     ```bash
     brew services start mongodb/brew/mongodb-community
     ```
4. **Access MongoDB Shell**:
   - Open another terminal window and type `mongo` to access the MongoDB shell.

### **c. Installation on Linux (Ubuntu)**

**Steps**:
1. **Import MongoDB Public GPG Key**:
   - Add MongoDB’s GPG key using the following:
     ```bash
     curl -fsSL https://www.mongodb.org/static/pgp/server-5.0.asc | sudo tee /usr/share/keyrings/mongodb-server.asc
     ```
2. **Add the MongoDB Repository**:
   - Run the following command to add the MongoDB repo:
     ```bash
     echo "deb [signed-by=/usr/share/keyrings/mongodb-server.asc] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
     ```
3. **Install MongoDB**:
   - Update the local package database and install MongoDB:
     ```bash
     sudo apt update
     sudo apt install -y mongodb-org
     ```
4. **Start MongoDB**:
   - Start MongoDB using the following command:
     ```bash
     sudo systemctl start mongod
     ```
   - Enable MongoDB to start automatically on boot:
     ```bash
     sudo systemctl enable mongod
     ```
5. **Access MongoDB Shell**:
   - Run `mongo` to access the shell and interact with MongoDB.

---

## **3. Using MongoDB Atlas (Cloud-Based Setup)**

MongoDB Atlas is a fully managed cloud database service. Follow these steps to set up a MongoDB Atlas cluster:

**Steps**:
1. **Create an Atlas Account**:
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for an account.
2. **Create a Cluster**:
   - After signing in, click on "Build a Cluster".
   - Select your cloud provider (AWS, GCP, Azure) and region.
   - Choose a free tier or configure a paid cluster for production use.
3. **Set Up Security**:
   - Add an IP address or allow access from anywhere (0.0.0.0/0).
   - Create a database user and set a password for accessing the cluster.
4. **Connect to Your Cluster**:
   - Choose the "Connect" button and follow the prompts to connect using:
     - MongoDB Compass (GUI tool)
     - Mongo Shell
     - Your application using a MongoDB driver.
5. **Start Using MongoDB Atlas**:
   - After connecting, you can begin working with the database as if it were running locally.

---

## **4. Configuration Options**

MongoDB offers several configuration options that allow you to tailor your deployment to your specific needs. The primary configuration file is usually located at `/etc/mongod.conf` (Linux) or `%ProgramFiles%\MongoDB\Server\5.0\bin\mongod.cfg` (Windows).

Key configuration settings include:

- **Storage Options**:
  - You can specify the storage engine (e.g., WiredTiger) and configure storage paths.
  - Example:
    ```yaml
    storage:
      dbPath: /var/lib/mongo
      journal:
        enabled: true
    ```
  
- **Network Settings**:
  - Configure MongoDB to listen on specific IP addresses and ports.
  - Example:
    ```yaml
    net:
      port: 27017
      bindIp: 127.0.0.1
    ```
  
- **Replication Settings**:
  - Enable replication and configure replica sets.
  - Example:
    ```yaml
    replication:
      replSetName: "rs0"
    ```

- **Sharding**:
  - Enable sharding for horizontally scaling MongoDB.
  - Example:
    ```yaml
    sharding:
      clusterRole: shardsvr
    ```

- **Authentication**:
  - Enable or disable authentication and set up role-based access control.
  - Example:
    ```yaml
    security:
      authorization: enabled
    ```

To apply changes, restart MongoDB with the updated configuration file.

---

## **5. Running MongoDB as a Service**

Running MongoDB as a service ensures that it starts automatically when your system boots up and runs in the background without user interaction.

### **Windows**:
1. **Install as a Service**:
   - During installation, check the box to install MongoDB as a Windows service.
   - You can configure the service from the Windows Services app (`services.msc`).
2. **Manually Install as a Service**:
   - Open Command Prompt as an administrator and run the following:
     ```bash
     "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --config "C:\Program Files\MongoDB\Server\5.0\bin\mongod.cfg" --install
     ```

### **Linux (systemd)**:
1. **Create a systemd Service File**:
   - Create a file `/etc/systemd/system/mongod.service` with the following content:
     ```ini
     [Unit]
     Description=MongoDB Database Server
     After=network.target

     [Service]
     User=mongodb
     ExecStart=/usr/bin/mongod --config /etc/mongod.conf
     ExecReload=/bin/kill -HUP $MAINPID
     KillMode=process
     Restart=on-failure

     [Install]
     WantedBy=multi-user.target
     ```
2. **Enable and Start the Service**:
   - Enable MongoDB to start at boot:
     ```bash
     sudo systemctl enable mongod
     ```
   - Start the service:
     ```bash
     sudo systemctl start mongod
     ```

---

These notes provide an overview of MongoDB installation and setup across various platforms, cloud-based deployment with Atlas, and configuring MongoDB to run as a service.
