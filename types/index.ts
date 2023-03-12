import express from "express";
export interface IItem {
    name: string;
    imageURL: string;
    description: string;
    price: number;
    category: string;
    ingredients: string[]
}

export interface IItemRequest extends express.Request {
    body: IItem
}