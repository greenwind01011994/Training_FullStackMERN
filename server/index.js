const express = require('express');
const mongoose =require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://windwebdev:phong1994@cluster0.mkuro.mongodb.net/mern-learnit?retryWrites=true&w=majority`, {
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

app.get('/', (req, res) => res.send('HELLO WOLD'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server sterted on port ${PORT}`));