import express from 'express';
import mongoose from 'mongoose';

export namespace MenuItemsNS {

    export interface IItem {
        _id: mongoose.Types.ObjectId,
        name: string,
        image: string,
        description: string,
        price: Number,
        category: string,
        ingredients: string[];
        addedBy?: any;
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

export namespace UsersNS {
    export interface User {
        email: string;
        password: string;
        role: string;
        fullName: string;
        imageUrl: string;
        authToken: string;
        items: [mongoose.Schema.Types.ObjectId];
    }
    export interface IRequest extends express.Request<{}, {}, User> {

    }
}

export namespace LoginNS {
    export interface login {
        email: String;
        password: String;
    }
    export interface Request extends express.Request<{}, {}, login> {

    }
}