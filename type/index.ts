

import express from "express";

export namespace MenuItem {
  export interface Item {
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    category: string;
    ingredients: string[];
  }

  export interface ItemQuery {
    category?: string;
    searchTerms?: string;
    page?: number;
    maxPrice?: number;
  }
  export interface ItemRequest extends express.Request {
    body: Item
  }
}


export namespace User {
  export interface IUser {
    email: string;
    password: string;
    role: string;
    fullname: string;
    imageUrl: string;
    authToken: string;
  }
}


