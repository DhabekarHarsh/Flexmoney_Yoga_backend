import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import userRouter from './Routers/userRouter.js';
import uploadRouter from './Routers/uploadRouter.js';


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());
app.get('/', (req, res) => {
    res.send('Server is ready');
});


mongoose.connect('mongodb+srv://Harsh:Harsh123@cluster0.5p71feo.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected....")
})

app.use('/api/users', userRouter);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) =>
        res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
    );
} else{
    app.get('/', (req, res) => {
        res.send('Server is ready');
    });
}

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serving at port ${port}`);
});