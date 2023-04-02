import express from 'express'
import mongoose from 'mongoose';

export namespace MenuItem {
    export interface IItem {
        name: string,
        imageUrl: string,
        description: string,
        price: number,
        category: string,
        ingredients: string[],
        addedBy?: string
    }

    export interface IQuery {
        categories?: string;
        searchTerms?: string;
        page?: number;
        maxPrice?: number;
    }

    // export interface IRequest extends express.Request {
    //     body : IItem
    // }

    // to set the type of request body to (IItem) , and the request query string to (IQuery) 
    export interface IRequest extends express.Request<{ id: string }, {}, IItem, IQuery, {}> { }

}
export namespace UserNS {
    export interface IUser {
        email: string,
        password: string,
        fullName: string,
        imageUrl: string,
        role: string,
        authToken: string,
        items: string[]
    }

    export interface IUserRequest extends express.Request<{}, {}, IUser, {}> { }
}