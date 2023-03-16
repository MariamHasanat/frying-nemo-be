import express from "express";

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
  maxPrice?: number,
  searchTerms?: string,
  page?: number
}

export interface IItemRequest extends express.Request {
  body: IItem
}