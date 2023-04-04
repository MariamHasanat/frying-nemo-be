import express from "express";

export namespace MenuItem{
  export interface IItem {
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  category: string;
  ingredients: string[];
  addedBy?:any
 };


export interface IItemQuery {
  categories?: string;
  maxPrice?: number,
  searchTerms?: string,
  page?: number
}
export interface IItemRequest extends express.Request<{id:string},{},MenuItem.IItem,IItemQuery,{}> {}
}
export namespace UserNS {
  export interface IUser {
    email: string;
    password: string;
    role: string;
    fullName: string;
    imageUrl: string;
    authToken: string;
  }
  export interface IUserRequest extends express.Request<{},{},UserNS.IUser,{}> {}
  export interface LoginRequest extends express.Request<{}, {}, {
    email: string,
    password: string
  }, {}> { }

}