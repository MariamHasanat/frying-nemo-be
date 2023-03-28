import express from 'express';
import mongoose from 'mongoose';

export namespace MenuItems {

    export interface IItem {
        _id: mongoose.Types.ObjectId,
        name: string,
        image: string,
        description: string,
        price: Number,
        category: string,
        ingredients: string[];
    }

    export interface IQuery {
        categories?: string;
        maxPrice?: number;
        page?: number;
        searchTerms?: string;
    }

    export interface IRequest extends express.Request<{}, {}, IItem, IQuery> {
        params: {
            id: string;
        };
    }
}

export namespace Users {
    export interface User {
        email: string;
        password: string;
        role: string;
        fullName: string;
        imageUrl: string;
        authToken: string;
    }
    export interface IRequest extends express.Request<{}, {}, User> {

    }
}