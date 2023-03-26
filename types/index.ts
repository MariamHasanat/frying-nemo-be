import express from 'express';
import Request from 'express';

export namespace MenuItem {

    export interface IItem {
        id:string;
        name: string;
        imageUrl: string;
        description: string;
        price: number;
        category: string;
        ingredients: string[];

    }
    export interface IItemQuery {
        category?: string;
        searchTerms?: string;
        page?: number;
        maxPrice?: number;


    }
    export interface ItemRequest extends express.Request<{ id: string }, {}, MenuItem.IItem, IItemQuery> { }
   
}
export namespace UsersInfo {
    export interface IUser {
        id: number;
        email: string;
        password: string;
        role: string[];
        fullName: string;
        imageUrl: string;
        authToken: string;

    }
    export interface UserRequest extends express.Request<{},{},{},{}> {
        body: IUser
    }
}



