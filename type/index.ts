

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
  export interface ItemRequest extends express.Request<{id: string}, {}, MenuItem.Item, ItemQuery>{}
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
//generic type in JS
interface IObj<T> {
  value: T;
  history: T[]

}

const marks: IObj<number> ={
  value:10,
  history: [10,20,30]
};

const names: IObj<string> ={
  value:"Ruba",
  history: ["a","b","c"]
};

const items: IObj<MenuItem.Item> ={
  value: {
    category: 'cat',
    description: 'desc',
    imageUrl: '',
    ingredients: [],
    name: 'name',
    price: 0
  },

  history: []

  }

