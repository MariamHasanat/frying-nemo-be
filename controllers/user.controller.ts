import User from '../models/user.model';
import { LoginNS, UsersNS } from '../types/item.type';
import mongoose from 'mongoose';
import { Status } from '../classes/status';

const createUser = async (req: UsersNS.IRequest) => {
    const user = req.body;
    const newUser = new User({
        ...user
    });
    return newUser.save()
        .then(value => {
            return new Status(201, 'OK, the user is added successfully', value);
        })
        .catch((error: mongoose.Error) => {
            console.error(error.message);
            return new Status(500, 'Failed, Internal server error');
        });
};

const getUsers = async () => {
    return User.find()
        .then(value => {
            return new Status(200, 'OK, the users are returned', { total: value.length, users: value });
        })
        .catch((error: mongoose.Error) => {
            console.error(error.message);
            return new Status(500, 'Failed, Internal server error');
        });
};

const login = async (req: LoginNS.Request) => {
    const email = req.body.email;
    const password = req.body.password;
    return User.findOne({
        email: email,
        password: password
    }).select(['email', 'fullName', 'role', 'imageUrl'])
        .then(value => {
            if (value)
                return new Status(200, 'OK', value);
            else
                return new Status(400, 'Failed, Email or password in correct');
        })
        .catch((error: mongoose.Error) => {
            console.error(error.message);
            return new Status(500, 'Failed, Internal server error');
        });

};

export default {
    createUser,
    getUsers,
    login,
};