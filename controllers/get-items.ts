import { IMenuItem } from "../interfaces/item";
import Item from "../models/item"

const getItems = async (params: IMenuItem.IItemQuery) => {
    const items = await Item.find(
        {
            price: {
                $lte: params.maxPrice
            }
        }
    );

    return items;
}

const createItems = (data: any) => {

}

export default { getItems, createItems };