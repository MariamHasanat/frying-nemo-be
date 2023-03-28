import express from "express";

export namespace MenuItem {
  export interface IItem {
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    category: string;
    ingredients: string[];
    addedBy: string;
  }
  export interface IItemQuery {
    categories?: string;
    searchTerms?: string;
    page?: number;
    maxPrice?: number;
  }
  //with generic types
  export interface IItemRequest
    extends express.Request<
      { id: string },
      {},
      MenuItem.IItem,
      MenuItem.IItemQuery
    > {}

  //without generic types
  /*
   export interface IItemRequest extends express.Request {
     body: IItem;
   }
  */
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

  export interface IUserRequest extends express.Request<{},{},UserNS.IUser> {}
}
