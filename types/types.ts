import express from 'express';
export interface IItem {
    name: String,
    imageURL: String,
    description: String,
    price: Number,
    category: String,
    ingredients: [String];
}

export interface IItemRequest extends express.Request {
    body: IItem;
}