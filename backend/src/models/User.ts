import mongoose, { HydratedDocument, Model, Schema, } from 'mongoose';
import { Role, SafeUser } from 'src/types';

export interface UserDb {
    email: string;
    name: string;
    phone: string;
    socials: string[];
    role: Role;                // 'user' | 'admin'
    password: string;

    refreshTokenHash?: string;
    refreshTokenExp?: Date;
    resetTokenHash?: string;
    resetTokenExp?: Date;

    createdAt?: Date;          // добавит timestamps
    updatedAt?: Date;
}

const userSchema: Schema<UserDb> = new mongoose.Schema<UserDb>(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        socials: { type: [String], default: [] },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        password: { type: String, required: true },

        refreshTokenHash: String,
        refreshTokenExp: Date,
        resetTokenHash: String,
        resetTokenExp: Date,
    },
    { timestamps: true }
);

userSchema.set('toJSON', {
    transform(_doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.password;
        delete ret.refreshTokenHash;
        delete ret.resetTokenHash;
        delete ret.__v;
        return ret;
    },
});

userSchema.set('toObject', {
    transform(_doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.password;
        delete ret.refreshTokenHash;
        delete ret.resetTokenHash;
        delete ret.__v;
        return ret;
    },
});

export type UserDoc = HydratedDocument<UserDb>;
export type UserModelT = Model<UserDb>;

/** 4) Инициализация модели без инференса (тип указан явно) */
export const UserModel: UserModelT =
    (mongoose.models.User as UserModelT) ||
    mongoose.model<UserDb>('User', userSchema);

export const toSafeUser = (doc: UserDoc): SafeUser => ({
    id: doc._id.toString(),
    email: doc.email,
    name: doc.name,
    phone: doc.phone,
    socials: doc.socials ?? [],
    role: doc.role as Role,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
});

export default UserModel;
