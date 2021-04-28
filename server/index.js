require('dotenv').config();
const express = require('express');
const mongoose =require('mongoose');

const authRouter = require('./routes/auth');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mkuro.mongodb.net/mern-learnit?retryWrites=true&w=majority`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        console.log('MongoDB connected'); // log ra xem đã kết nối
    } catch (error) {
        console.log(err.message);
        process.exit(1)
    }
}

connectDB();//gọi hàm

const app = express();

app.use('/api/auth', authRouter);


const PORT = 5000;

app.listen(PORT, () => console.log(`Server sterted on port ${PORT}`));