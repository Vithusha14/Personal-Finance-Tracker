import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import 'dotenv/config';
import cookieParser from "cookie-parser";


import userRouter from "./routes/userRoute.js";
import swaggerDocs from "./config/swagger.js";
import budgetRouter from "./routes/budgetRoute.js";

import notificationRouter from "./routes/notificationRoute.js";
import goalRouter from "./routes/goalRoute.js";
import recurringRouter from "./routes/recurringRoute.js";
import transactionRouter from "./routes/transactionRoute.js";
import dashboardRouter from "./routes/dashboardRoute.js";





const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(cookieParser());

// Swagger Documentation
swaggerDocs(app);

//middleware
app.use(cors())
app.use(express.json())

app.use(cors({credentials: true })); //acees alow - cookies
app.use('/api/auth',userRouter)
app.use('/api/admin',userRouter)
app.use('/api/budget',budgetRouter)

app.use('/api/notifications', notificationRouter);
app.use('/api/goal', goalRouter);
app.use("/api/recurring", recurringRouter);
app.use('/api/transaction', transactionRouter);
app.use("/dashboard", dashboardRouter);  


//routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//start server
app.listen(port, () => {
    console.log(`Server is running on${port}`)                                                                                                                                                                                                        
})

//main function
//nodemen is used for automatic save 
//first run
//http://localhost:4000/
// http://localhost:4000/api/budget

