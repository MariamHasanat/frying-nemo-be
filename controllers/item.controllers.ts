import Item from "../models/item.model"
import { IItemQuery } from "../types/index";

const getItems = async (qs: IItemQuery) => {
    const items = await Item.find();
    return items;
}
const createItem = (data: any) => {

}
export default {
    getItems,
    createItem
};