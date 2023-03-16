import express from 'express';

export namespace MenuItems {

    export interface IItem {
        name: String,
        imageURL: String,
        description: String,
        price: Number,
        category: String,
        ingredients: [String];
    }

    export interface IQuery {
        category?: string[];
        maxPrice?: number;
        page?: number;
        searchTerms?: string;
    }

    export interface IRequest extends express.Request {
        body: IItem;
    }
}