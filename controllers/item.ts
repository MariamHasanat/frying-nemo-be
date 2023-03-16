import Item from "../models/item";
import { IItem } from "../types/item";

const getItems = async () => {
    const result: IItem[] = await Item.find();
    return result;
}

export default {
    getItems
}