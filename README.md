# 🏠 Nivas360 – Full Stack Real Estate Platform

Nivas360 is a **full-stack real estate web application** built using the **MERN stack (MongoDB, Express, React, Node.js)**.
It allows users to explore properties, owners to list and manage properties, and provides modern real estate features like property search, wishlist, chat system, and property management.

---

## 🌐 Live Demo

Frontend   : https://nivas360-frontend.vercel.app
Admin      : https://nivas360-admin.vercel.app
Backend API: https://nivas360-backend.vercel.app

---

## ✨ Key Features

### 👤 User Features

* User authentication using JWT
* Browse properties for **Sale and Rent**
* Filter properties by **city and location**
* View property details with images
* Add properties to **Wishlist**
* Contact property owners through **chat**
* View profile and manage saved properties

---

### 🏠 Owner Features

* Request permission to become a property owner
* Add new properties with multiple images
* Edit existing properties
* Remove listed properties
* Manage property availability
* Upload property images stored on **Cloudinary**
* Manage property details like:

  * BHK
  * Price
  * Location
  * Parking
  * Availability

---

### 💬 Chat System

* Real-time chat between users and property owners
* Socket.io based messaging system
* Stores conversation history
* Allows easy communication for property inquiries

---

### ⭐ Property Management

* Upload up to **6 images per property**
* Property types supported:

  * Flat
  * Villa
  * Individual House
  * Plot
* Parking options:

  * Car
  * Bike
* Availability options:

  * Immediately
  * After specific months

---

## 🧱 Tech Stack

### Frontend

* React.js
* React Router DOM
* Context API
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB & Mongoose
* JWT Authentication
* Multer (multipart form handling)
* Cloudinary (image storage)
* Socket.io (real-time chat)

---

## 🧠 Architecture Highlights

* JWT-based authentication middleware
* Role-based access control (User / Owner / Admin)
* Secure REST API routes
* Cloudinary image storage
* Property CRUD operations
* Chat messaging using Socket.io
* Clean separation of:

  * Controllers
  * Routes
  * Models
  * Middleware
  * Config files

---

## 📁 Project Structure

nivas360/
├── backend/
│   ├── config/
│   │   ├── connectDB.js
│   │   └── cloudinary.js
│   │
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── chatController.js
│   │   ├── ownerController.js
│   │   ├── propertyController.js
│   │   ├── userController.js
│   │   └── wishlistController.js
│   │
│   ├── middleware/
│   │   ├── adminAuth.js
│   │   ├── ownerAuth.js
│   │   ├── userAuth.js
│   │   └── multer.js
│   │
│   ├── models/
│   │   ├── chatModel.js
│   │   ├── messageModel.js
│   │   ├── ownerRequestModel.js
│   │   ├── propertyModel.js
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── ownerRoutes.js
│   │   ├── propertyRoutes.js
|   |   ├── chatRoutes.js
│   │   ├── userRoutes.js
│   │   └── wishlistRoutes.js
│   │
|   ├── uploads/
|   ├── .env
|   ├── utility/
|   |    ├── sendEmail.js
│   └── server.js
    └── socket.js


│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.jsx
|   |   │   ├── HaveProperty.jsx
|   |   │   ├── Hero.jsx
|   |   │   ├── HouseForSale.jsx
│   |   │   ├── LocationSelector.jsx
|   |   │   ├── Navbar.jsx
|   |   │   ├── OtpInput.jsx
|   │   │   ├── OtpInput.css
|   │   │   ├── PlotsForSale.jsx
|   │   │   ├── PropertyList.jsx
|   │   │   ├── PropertyStyle.jsx
│   │   │   └── RentalHouses.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── House.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── OwnerRequestForm.jsx
│   │   │   ├── PropertyDetails.jsx
│   │   │   ├── WhyNivas.jsx
│   │   │   ├── Plots.jsx
│   │   │   ├── Rent.jsx
│   │   │   ├── PropertyDetails.jsx
│   │   │   ├── Wishlist.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── context/
│   │   │   └── DataContext.jsx
│   │   ├── owner/
│   │   │    ├── pages/
│   │   │    │   ├── AddProperty.jsx
│   │   │    │   ├── EditProperty.jsx
│   │   │    │   ├── ListProperties.jsx
│   │   │    │   └── OwnerChat.jsx
│   │   │    │   
│   │   │    ├── components/
│   │   │    │   ├── OwnerNavbar.jsx
│   │   │    │   └── Sidebar.jsx
│   │   │    │  
│   │   │    ├── Layout/
│   │   │    │   └── OwnerLayout.jsx
│   │   │    │ 
│   │   │    └── OwnerRoute.jsx
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   └── main.jsx
│
└── README.md

---

## ⚙️ Environment Variables

Create a `.env` file inside the **backend** folder and add the following:

PORT=PORT_NUMBER
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

---

## ▶️ Running the Project Locally

### Backend

cd backend
npm install
npm run server

---

### Frontend

cd frontend
npm install
npm run dev

---

## 🔐 Authentication & Authorization

* JWT tokens are used for authentication
* Middleware attaches the authenticated user ID to requests
* Owner routes are protected using `ownerAuth`
* Admin routes are protected using `adminAuth`
* Property operations are allowed only for verified owners

---

## 📌 Key Learning Outcomes

* Building a **full MERN stack application**
* Designing **secure REST APIs**
* Implementing **JWT authentication**
* Handling **multipart form data with Multer**
* Uploading images to **Cloudinary**
* Creating **real-time chat with Socket.io**
* Implementing **property CRUD operations**
* Managing **state using React Context API**

---

## 🚀 Future Enhancements

* Property booking system
* Advanced property filters
* Map integration with Google Maps
* Email notifications
* Property recommendations using AI
* Mobile responsive improvements

---

## ⚠️ Disclaimer

All property images used in this project are sourced from publicly available real estate listings and are used strictly for **educational and demonstration purposes only**.

This project is **non-commercial** and does not claim ownership of any third-party images.