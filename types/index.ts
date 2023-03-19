import express from "express";

export namespace MenuItems {


  export interface Item {
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    category: string;
    ingredients: string[];
  }
  export interface IQuery {
    category?: string,
    searchTerms?: string,
    page?: number,
    maxPrice?: number

  }

  export interface ItemRequest extends express.Request {
    body: Item,

  }
}


