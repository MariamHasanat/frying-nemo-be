import express from "express";

export namespace MenuItem {
    export interface IItem {
        id: number;
        name: string;
        imageUrl: string;
        description: string;
        price: number;
        category: string[];
        ingredients: String[];
        addedBy: String;
    }

    export interface IItemRequest extends express.Request<{}, {}, IItem, IQuery> { }

    export interface IQuery {
        category: string,
        maxPrice: number,
        searchTerms: string,
        page: number,
    }
}