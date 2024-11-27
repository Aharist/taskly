import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../configs/db.js';

const collection = await db.collection('users');

export const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const query = {
            $or: [{ email }, { username }],
        };
        const existingUser = await collection.findOne(query);
        if (existingUser) {
            return next({
                status: 422,
                message: 'Email or username already registered.',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            username,
            email,
            password: hashedPassword,
            avatar: 'https://g.codewithnathan.com/default-user.png',
            createAt: new Date().toISOString(),
            updateAt: new Date().toISOString(),
        };
    } catch (error) {
        next({ status: 500, error });
    }
    const { insertedId } = await collection.insertOne(user);
    const token = jwt.sign({ id: insertedId }, process.env.AUTH_SECRET);
    user._id = insertedId;
    const { password: pass, updateAt, createAt, ...rest } = user;
    res
        .cookie('taskly_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
}
