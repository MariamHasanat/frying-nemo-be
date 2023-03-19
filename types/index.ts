import express from 'express'

export namespace MenuItem {
    export interface IItem {
        name: string,
        imageUrl: string,
        description: string,
        price: number,
        category: string,
        ingredients: string[]
    }

    export interface IQuery {
        category?: string;
        searchTerms?: string;
        page?: number;
        maxPrice?: number;
    }

    // export interface IRequest extends express.Request {
    //     body : IItem
    // }

    // to set the type of request body to (IItem) , and the request query string to (IQuery) 
    export interface IRequest extends express.Request<{}, {}, IItem, IQuery , {}> { }

}