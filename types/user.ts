import express from 'express';
export namespace User {
    export interface IUser {
        id: Number,
        email: String,
        password: String,
        role: String,
        fullName: String,
        imageUrl: String,
        authToken: String,
    }
    
    export interface UserRequest extends express.Request<{}, {}, IUser, {}> { }
}
