import { Router } from 'express'
import { MenuItem } from '../types/index';
import { itemController } from '../controllers/index';

const router = Router();
const oldItems = [
    {
        "id": 10,
        "name": "fatoosh",
        "price": 20,
        "description": "best meal ever",
        "category": "Salads",
        "ingredients": [
            "tomato",
            "cucumber",
            "onion"
        ],
        "img": "https://upload.wikimedia.org/wikipedia/commons/9/93/Fattoush_mixed-salad.jpg"
    },
    {
        "id": 11,
        "name": "makloba",
        "price": 50,
        "description": "makloba 3kef kefak",
        "category": "Main Dishes",
        "ingredients": [
            "rice",
            "chicken"
        ],
        "img": "https://www.hungrypaprikas.com/wp-content/uploads/2021/04/Maqluba-New-1-1024x1536.jpg"
    },
    {
        "id": 12,
        "name": "shawermah",
        "price": 15,
        "description": "shawerma al haram",
        "category": "Main Dishes",
        "ingredients": [
            "chicken",
            "garlic",
            "fries"
        ],
        "img": "https://images.deliveryhero.io/image/talabat/MenuItems/17DEC20_SHAWARMA_CIT_637726837313071877.jpg"
    },
    {
        "id": 13,
        "name": "Sweet crepe",
        "price": 25,
        "description": "chocolate crepe",
        "category": "Sweets",
        "ingredients": [
            "banana",
            "chocolate"
        ],
        "img": "https://media-cdn.tripadvisor.com/media/photo-s/17/d3/1c/1e/sweet-crepe.jpg"
    },
    {
        "id": 14,
        "name": "orange juice",
        "price": 7,
        "description": "natural orange juice",
        "category": "Drinks",
        "ingredients": [
            "orange"
        ],
        "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Orangejuice.jpg/235px-Orangejuice.jpg"
    },
    {
        "id": 15,
        "name": "classic burger",
        "price": 25,
        "description": "IDK what what to say :)",
        "category": "Sandwiches",
        "ingredients": [
            "150 gm beef",
            "tomato",
            "onions",
            "lettuce",
            "pickles"
        ],
        "img": "https://www.honestburgers.co.uk/wp-content/uploads/2022/07/smashed-single-uber-eats.jpg"
    },
    {
        "id": 16,
        "name": "salmon ",
        "price": 30,
        "description": "healty fresh seafood",
        "category": "Fish",
        "ingredients": [
            "fresh salmon fish",
            "grilled vegetables",
            "seafood sauce"
        ],
        "img": "https://img.freepik.com/premium-photo/baked-fish-dorado-with-lemon-fresh-salad-white-plate-dark-rustic-background-top-view-healthy-dinner-with-fish-concept-dieting-clean-eating_2829-8164.jpg"
    }
]
/**
 * gets items we stored used in phase2, and moves them to mongodb)
 * used once only!
 */
router.get('/add_old_items', async (req, res) => {
    try {
        for (const i in oldItems) {
            if (Object.prototype.hasOwnProperty.call(oldItems, i)) { // checks if oldItems[i] exists 
                const item = oldItems[i];
                await itemController.createItem(
                    {
                        ...item,
                        imageURL: item.img,
                        price: Number(item.price)
                    });
            }
        }
        res.status(201).send("All items Created");
    } catch (error) {

        // res.status(500).send("Failed to Create old items!");
        res.status(500).send("ERR: " + error);

    }
});

export default { router };