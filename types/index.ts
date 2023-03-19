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
        category?: string;
        searchTerms?: string;
        page?: number,
        maxPrice?: number

    }

    export interface IItemRequest extends express.Request {//بياخد الوراثة  ناعت الreq  وبعدل وبضيف على الاب وبورثو 
        body: Item
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



