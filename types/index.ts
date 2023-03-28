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

    export interface Request extends express.Request<{ id: string }, {}, Item, {}> { }
}

export namespace IUser {
    export interface User {
        _id?: String,
        email: String,
        password: String,
        role: String,
        fullName: Number,
        imageURL: String,
    }


    export interface Request extends express.Request<{}, {}, User, {}> { }
}