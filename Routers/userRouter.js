import express, { request } from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js'

const userRouter = express.Router();

userRouter.post('/register', expressAsyncHandler (async(req, res) => {
    console.log(req.body);
    const user = new User ();

    user.name = req.body.name
    user.email = req.body.email
    user.password = bcrypt.hashSync(req.body.password, 8)
    user.dob = req.body.dob
    user.gender = req.body.gender
    user.batch = req.body.batch


    const createdUser = await user.save();
    res.send({
        name: createdUser.name,
        email: createdUser.email,
        dob: createdUser.dob,
        gender: createdUser.gender,
        batch: createdUser.batch,

    });

}));


export default userRouter;