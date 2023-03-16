import express from 'express'

export namespace MenuItem {
    export interface IItem {
        name : string ,
        imageUrl : string ,
        description : string , 
        price : number , 
        category : string ,
        ingredients : string[]
    }
    
    export interface IQuery {
        category? : String ;
        searchTerms? : String ;
        page? : number ;
        maxPrice? : number; 
    }
    
    export interface IRequest extends express.Request {
        body : IItem
    }

}