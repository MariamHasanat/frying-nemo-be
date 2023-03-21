import express from 'express'


export namespace MenuItem {// متل خزانة اواعي فيو اكتر من رف للترتيب اي نايبسبايس بقدر احطو جوا او غيرو
    export interface Item {
        name: string,
        imageUrl: string,
        description: string,
        price: number,
        category: string[],
        ingredient: string[]
    }
    export interface ItemQuery {
        categories?: string;
        searchTerms?: string;
        page?: number,
        maxPrice?: number

    }
    //with geniric type 
    export interface IItemRequest extends express.Request<{},{},MenuItem.Item,ItemQuery>{}


     //without geniric type
    // export interface IItemRequest extends express.Request {//بياخد الوراثة  ناعت الreq  وبعدل وبضيف على الاب وبورثو 
    //     body: Item
    // }
}

export namespace User {
  export interface IUser {
    email: string;
    password: string;
    role: string;
    fullName: string;
    imageUrl: string;
    authToken: string;
  }
}

  //for geniric type for js 
   interface IObj<T>{
   vlaue :T ,
   history:T[]
   }
 const x :  IObj<number>={
    vlaue :10,
    history:[13,20,30]
    }
   //i can send any tyoe i need 

