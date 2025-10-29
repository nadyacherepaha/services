import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { env } from './env';
import authRoutes from './routes/auth.routes';

const app = express();
const PORT = env.PORT || 5000;
const APP_URL = env.APP_URL || `http://localhost:${env.FRONTEND_PORT}`;

app.use(express.json());
app.use(cookieParser());
app.use(cors(({ origin: APP_URL, credentials: true, })));

// MongoDB Connection
mongoose.connect(env.MONGO_URI || '')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
