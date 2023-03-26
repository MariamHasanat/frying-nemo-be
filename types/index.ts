import express from "express";

export namespace MenuItem{
  export interface IItem {
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  category: string;
  ingredients: string[];
 };


export interface IItemQuery {
  categories?: string;
  maxPrice?: number,
  searchTerms?: string,
  page?: number
}
export interface IItemRequest extends express.Request<{id:string},{},MenuItem.IItem,IItemQuery,{}> {}
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