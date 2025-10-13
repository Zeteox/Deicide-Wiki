# Deicide - Wiki

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)  
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org/)

---

## 📝 Description

**Deicide** is a Minecraft mod designed to bring a complete adventure experience to the game.  
This project serves as its companion **wiki**, where players can explore the lore, learn the purpose of various items or mechanics, and discover how to craft or use them.  
You can also react to posts created by others or write your own guides by logging in!

---

## 🌟 Features

- **📝 Account creation and login system**

---

## 🛠️ Tech Stack

- **Frontend**:
  - **HTML** – Page layout and structure
  - **Tailwind CSS** 🌬️ – Utility-first CSS framework for fast, responsive design
  - **JavaScript** – For client-side dynamic interactions

- **Backend**:
  - **Node.js** – JavaScript runtime environment
  - **Express.js** – Framework for managing routes and APIs
  - **Bcrypt** – Library for secure password hashing
  - **Pino** – Lightweight and fast logging library with easily parsable output

- **Development Tools**:
  - **Nodemon** – Automatically restarts the server during development
  - **Postman** – API testing tool
  - **Git** – Version control system

---

## ⚙️ Installation

To set up the project locally, follow these steps:

### **Prerequisites**

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or higher) 📦  
- [Git](https://git-scm.com/) 🔧

### **Project Setup**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Zeteox/Deicide-Wiki.git
   cd Deicide-Wiki
   ```

2. **Install dependencies:**

   ```bash
   npm install --force
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
      PORT=8080
   ```

4. **Start the Node.js server with nodemon:**

   ```bash
   npm start
   ```

---

## 🏗️ Project Structure

```
├── 📁 data/
│   └── 📄 accounts.json
├── 📁 public/
│   ├── 📁 assets/
│   │   └── 🖼️ deicide.png
│   ├── 📁 js/
│   │   └── 📄 utils.js
│   └── 📁 templates/
│       ├── 🌐 index.html
│       ├── 🌐 result.html
│       └── 🌐 sign.html
├── 📁 src/
│   ├── 📁 handlers/
│   │   ├── 📄 indexHandler.js
│   │   ├── 📄 resultsHandler.js
│   │   └── 📄 signHandlers.js
│   ├── 📁 services/
│   │   └── 📄 validationService.js
│   └── 📁 utils/
│       ├── 📄 dataUtils.js
│       ├── 📄 logger.js
│       ├── 📄 unitTests.js
│       └── 📄 utils.js
├── 🚫 .gitignore
├── 📜 LICENSE
├── 📖 README.md
├── 📄 package-lock.json
├── 📄 package.json
└── 📄 server.js
```

---

## 🎮 Usage

Once the project is running, open `http://localhost:8080`in your browser to access the Deicide Wiki.

- **Login** : Use your credentials to sign in or register for a new account.

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for more details.

---

## 📬 Contact

For any questions or issues, feel free to reach out:

### Loïc DELPRAT
- **Email** : [loic.delprat@ynov.com](mailto:loic.delprat@ynov.com)
- **LinkedIn** : [Loïc DELPRAT](https://linkedin.com/in/loïc-delprat)
- **GitHub** : [Zeteox](https://github.com/Zeteox)

### Ylan DESSENE
- **Email** : [ylan.dessenne@ynov.com](mailto:ylan.dessenne@ynov.com)
- **LinkedIn** : [ylan DESSENNE](https://linkedin.com/in/dessenne-ylan)
- **GitHub** : [Torolgo](https://github.com/Torolgo)

---