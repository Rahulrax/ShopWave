import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';

dotenv.config();

connectDB();
const app = express();


app.use(express.json());
app.use(morgan('dev'));

// routers

app.use("/api/v1/auth", authRoutes);


app.get('/', (req, res) => {
            res.send("<h1> This is a ecommerce webiste with name ShopWave </h1>")
            })


        const PORT =process.env.PORT||8080;


        app.listen(PORT, () => {
            console.log(`Server is running at PORT ${PORT}`.bgCyan.white);
        });
        