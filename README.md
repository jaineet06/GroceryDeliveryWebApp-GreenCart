# 🌿 GreenCart - Grocery Delivery App

GreenCart is a seamless and user-friendly grocery delivery app built with the MERN stack. Designed to cater to the needs of modern grocery shoppers, it allows users to browse, filter, and purchase groceries online with ease, while offering a robust admin panel to manage products and orders.

---

## 🚀 [Live Demo](https://greencart-wheat.vercel.app/) 

## 🚀 Features

- **Product Search & Filters**  
  Users can search for products and filter by categories like **Fruits**, **Vegetables**, **Instant**, and more.

- **Cart Functionality**  
  Add items to the shopping cart, adjust quantities, and easily proceed to checkout.

- **User Profiles & Order History**  
  Users can create accounts, manage their profiles, and view their order history for a personalized experience.

- **Admin Panel**  
  Admins can manage products, view and update orders, and track user activities through a dedicated panel.

---

## 🛠️ Tech Stack

**Frontend:**  
- React.js  
- Tailwind CSS  
- Axios  
- React Router

**Backend:**  
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT (JSON Web Tokens)  
- Stripe (for payment gateway)

**Authentication & Security:**  
- bcryptjs (password hashing)  
- JWT (Token-based Authentication)  
- HTTP-only cookies (for session management)

---

## 📸 Screenshots

### 🏠 Home Page
![Home Page](./screenshots/landing.png)

### 📦 Product Page
![Product Page](./screenshots/products.png)

### 🛒 Product card
![Checkout Page](./screenshots/products_card.png)

### 🛒 Cart Page
![Checkout Page](./screenshots/cart.png)

### 🛒 My oders Page
![Checkout Page](./screenshots/orders.png)

### 🛒 Stripe payment
![Checkout Page](./screenshots/stripe.png)

### 🔐 Admin Panel - Dashboard
![Admin Panel](./screenshots/add.png)


---
## Installation

Follow the steps below to set up the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/jaineet06/GroceryDeliveryWebApp-GreenCart.git
cd User_Auth
```
### 2. Install server dependencies
```bash
cd server
npm install
```
### 3. Install client dependencies
```bash
cd ../client
npm install
```
### 4.  Create environment files
#### server/.env
```bash
MONGODB_URI=mongodb+srv://your_username:your_password@grocerystore.oqerkur.mongodb.net
# ➤ Replace with your MongoDB connection string

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
# ➤ Replace with your Cloudinary credentials for image upload and storage

STRIPE_PUBLISH_KEY=your_stripe_publish_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
# ➤ Replace with your Stripe keys for handling payments

JWT_SECRET_KEY=your_jwt_secret_key
# ➤ Replace with a securely generated secret key for JWT authentication

```
#### client/.env
```bash
VITE_API_URL=http://localhost:4000
````

### 6.  Run the application
####  Start the frontend
```bash
cd client
npm run dev
```

####  Start the backend
```bash
cd server
npm run server
```

## 🙌 Credits
Built with ❤️ by Jaineet Shah

📧 jaineetshah06@gmail.com

🔗  [Jaineet Shah](https://www.linkedin.com/in/jaineet-shah-5894a731b)