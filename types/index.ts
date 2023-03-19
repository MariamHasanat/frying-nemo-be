import express from "express";

export namespace MenuItem{
    export interface IItem {
        name: string;
        imageURL: string;
        description: string;
        price: number;
        category: string;
        ingredients: string[]
    }
    
    export interface IItemQuery {
            category?: string,
            searchTerms?: string,
            page?:number,
            maxPrice?:number
    }

    export interface IItemRequest extends express.Request {
        body: IItem
    }

    // export type abc ...
    // export enum xyz ...
}  

export namespace User {
    export interface IUser {
        //
    }
}