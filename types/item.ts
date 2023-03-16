import express from "express";

export interface IItem {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    category: string;
    ingredients: String[];
}

export interface IItemRequest extends express.Request {
    body: IItem;
}
