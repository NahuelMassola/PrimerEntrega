import { Router } from "express";
import cartManager from "../Controller/cartManager.js";


const cartRouter = Router();
const carts = new cartManager;

cartRouter.post("/" , async (req ,res) => {
    res.send ( await carts.addCart());
})

cartRouter.get("/" , async (req , res) => {
    res.send(await carts.readCarts())
})

cartRouter.get('/:id' , async (req , res) => {
    res.send(await carts.getCartById(req.params.id))
})


export default cartRouter;