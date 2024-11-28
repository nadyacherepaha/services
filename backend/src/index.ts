import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(({ origin: 'http://localhost:5173' })));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || '')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.get('/', (req: Request, res: Response) => {
    res.send({ data: 'API is running...' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
