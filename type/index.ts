export interface Item{
    name: string,
    imageUrl: string,
    description: string ,
    price: number,
    category: string,
    ingredients: string,
}

export interface IItemRequest extends Express.Request{
    body: Item
}