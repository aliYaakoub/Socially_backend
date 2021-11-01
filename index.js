import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';
import adminRouter from './routes/adminPosts.js';
dotenv.config();
const app = express();
app.use(cors());

// database connection
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('connected to MongoDB'));

app.use(express.json());

// first page
app.get('/',(req, res) => {res.send('home page');})

// routers
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/adminPost', adminRouter);


app.listen('5000', () => console.log(`app live on http://localhost:5000`));