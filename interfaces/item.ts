import express from "express";

export interface IItem {
    name : string ;
    price : number;
    description : string ;
    category : string ;
    ingredients : string[];
    imageUrl : string;

}

export interface IItemRequest extends express.Request {
    body : IItem 
}