export interface IItem{
    id: number; 
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    category: string;
    ingredients: string[];
	
}

export interface IItemRequest extends IItem{
    body:IItem
}