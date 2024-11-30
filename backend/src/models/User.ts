import mongoose, { Schema } from 'mongoose';
import { User } from '../types';

const userSchema: Schema<User> = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    socials: { type: [String], default: [] },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    password: { type: String, required: true },
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
