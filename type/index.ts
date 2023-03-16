import express from "express"

export interface Item{
    name: string,
    imageUrl: string,
    description: string ,
    price: number,
    category: string,
    ingredients: string[],
}
export interface IItemQuery {
category?: string;
searchItem?: string;
page?: number;
maxPrice?:number
}

export interface ItemRequest extends express.Request{
    body: Item
}


