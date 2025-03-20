const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes');
const brandRoutes = require('./routes/brandRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

dotenv.config(); // Load env variables
connectDB(); // Connect to DB

app.use(
	cors({
		origin: 'http://localhost:3000', // Allow frontend requests from this origin
		credentials: true,
	}),
);
app.use(express.json()); // Parses incoming JSON requests
app.use(cookieParser()); // Parse cookies from incoming requests

app.use("/auth", authRoutes); // Handles Auth Routes
app.use("/user", userRoutes);// Handles User Routes
app.use('/brand', brandRoutes);// Handles Brand Routes
app.use('/product', productRoutes);// Handles Product Routes


const PORT = process.env.PORT || 5000; // Check for PORT in .env, if not available set it to 5000
app.listen(PORT, () => {
    console.log(`Server Running on Port: ${PORT}`)
}); // Starts server on specified port