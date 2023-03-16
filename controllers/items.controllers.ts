import Item from "../models/item.moudel";
import { IIQuery } from "../types/index";

const getItems = async (params: IIQuery) => {

    const items = await Item.find();  //select all from table
    return items;
}


const createItems = (data: any) => {

    return
}

export default {
    getItems,
    createItems
}