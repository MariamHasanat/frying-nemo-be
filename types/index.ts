import express from 'express';
import { ParsedQs } from 'qs'

export namespace IItem {
    export interface Item {
        _id?: String,
        name?: String,
        imageURL?: String,
        description?: String,
        price?: Number,
        category?: String,
        ingredients?: String[],
        addedBy?: String
    }

    export interface Query {
        category?: string,
        searchTerm?: string,
        page?: number,
        maxPrice?: number,
        ingredients?: string,
    }

    export interface Request extends express.Request {
        body: Item,
    }
}

export interface IUser {
    _id?: String,
    email: String,
    password: String,
    role: String,
    fullName: Number,
    imageUrl: String,
    authToken: String
}