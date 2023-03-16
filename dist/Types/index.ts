import express from 'express';
export interface IItem{
    id: number; 
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    category: string;
    ingredients: string[];
	
}
export interface IUser{
    id: number;
	email: string;
	password: string;
	role: string [];
	fullName: string;
	imageUrl: string;
	authToken: string;
	
}
export interface IItemQuery{
    category?: string;
    searchTerms?: string;
    page?: number;
    maxPrice?: number;

	
}


