# 🚀 Node.js Authentication & Role-Based Access Control (RBAC)

A complete backend boilerplate built with **Node.js**, **Express**, **MySQL**, and **Sequelize ORM**, featuring:

- 🔐 JWT Access & Refresh Token Authentication  
- 👥 Role-Based Access Control (RBAC)  
- 🔒 Password hashing using bcrypt  
- 📦 Clean modular folder architecture  
- ⚙️ Environment-based configuration  

## 📦 Tech Stack

| Technology | Usage |
|-----------|--------|
| **Express.js** | Web Framework |
| **MySQL** | Database |
| **Sequelize** | ORM |
| **bcryptjs** | Hashing passwords |
| **jsonwebtoken** | Authentication (JWT) |
| **dotenv** | Environment config |
| **cors** | API security |
| **nodemon** | Auto-reload during dev |

## 📂 Project Structure

```
nodejs-auth-role-management/
│── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   ├── middleware/
    ├── seed/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── app.js
│
│── .env
│── package.json
│── README.md
```

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/nodejs-auth-role-management.git
cd nodejs-auth-role-management
```

### 2️⃣ Install Project Dependencies

```
npm install bcryptjs@2.4.3 cors@2.8.5 dotenv@16.6.1 express@4.21.2 jsonwebtoken@9.0.2 mysql2@3.15.3 nodemon@3.1.11 sequelize@6.37.7
```

### 3️⃣ Create `.env` File

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=authdb
DB_DIALECT=mysql
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```

### 4️⃣ Create MySQL Database

```
CREATE DATABASE authdb;
```

### 5️⃣ Run the Server

#### Development Mode:
```
npm run dev
```

#### Production Mode:
```
npm start
```

## 🔐 API Endpoints

### Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/refresh` | Generate new access token |
| POST | `/api/auth/logout` | Logout |

### User Routes (Protected)

| Method | Endpoint | Allowed Roles |
|--------|----------|---------------|
| GET | `/api/users` | admin, manager |

## 🧪 Postman Collection

Import:
```
auth_rbac_postman_collection.json
```

## 🤝 Contributing

Pull requests welcome.

