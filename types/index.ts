import express from 'express'

export interface IItem {
    name: string,
    imageUrl: string,
    description: string,
    price: number,
    category: string[],
    ingredients: string[]
}
export interface ItemQuery {
    category?: string;
    searchTerms?: string;
    page?: number,
    maxPrice?: number

}

export interface IItemRequest extends express.Request {//بياخد الوراثة  ناعت الreq  وبعدل وبضيف على الاب وبورثو 
    body: IItem
}