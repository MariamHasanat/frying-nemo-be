import { Item } from "../models/index";

const getItems = async () => {
    const items = await Item.find();
    return items;
}

export default {
    getItems
}