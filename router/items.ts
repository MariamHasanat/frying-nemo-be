import express from 'express'
import Item from '../models/item.js'

const router = express.Router();

router.get('/' , async(req,res) => {
    const items = await Item.find();
    res.status(200).send(items);
})

// router.post('/' , async )

export default router