import express from "express";

export namespace IMenuItem 

{

    export interface IItem {
        name : string ;
        price : number;
        description : string ;
        category : string ;
        ingredients : string[];
        imageUrl : string;
    
    }

    
    export interface IItemQuery {
        categories?: string;
        searchTerms?: string;
        page?: number;
        maxPrice?: number;
      }

    export interface IItemRequest extends express.Request<{},{},IItem,IItemQuery,{}> {
     
    }
}