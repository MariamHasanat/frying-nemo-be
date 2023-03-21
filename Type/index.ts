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

export interface ItemRequest extends express.Request<{}, {}, MenuItem.Item, ItemQuery>{
  body: Item
}}