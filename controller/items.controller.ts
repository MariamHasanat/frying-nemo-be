import Item from "../models/item.models.js"
import { IItemQuery } from "../Type/index.js";

const getItems = async (params?: IItemQuery) => {
    const items = await Item.find();
    return items;
}

export default {getItems}