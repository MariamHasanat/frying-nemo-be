import express from "express";

export namespace MenuItem {
  export interface IItem {
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
  //with generic types
  export interface IItemRequest extends express.Request<{}, {},MenuItem.IItem, MenuItem.IItemQuery> {}

  //without generic types
  /*
   export interface IItemRequest extends express.Request {
     body: IItem;
   }
  */
}

export namespace User {
  export interface IUser {
    email: string;
    password: string;
    role: string;
    fullName: string;
    imageUrl: string;
    authToken: string;
  }
}
