import { Router } from "express";
import ProductManager from "../Controller/ProductManager.js";


const productRouter = Router();
const productos = new ProductManager();
const readProduct = productos.readProducts();

// consulto por todos los productos 

productRouter.get("/", async (req ,res) => {
    let limit = parseInt(req.query.limit);  
    if (!limit) return res.send(await readProduct)  // condicional para que si no pongo un limit me tire todos los producto 
    let allProducts = await readProduct;
    let productLimit = allProducts.slice(0, limit);
    res.send(productLimit);
});

// consulto por un productos 

productRouter.get("/:id", async (req ,res) => {
    let id = (req.params.id);
    res.send(await productos.getProductById(id));
})

// Metodo para Agregar un productos 

productRouter.post("/" , async (req , res) => {
    const newProduct = req.body
    res.send(await productos.addProduct(newProduct));
})

// Metodo para Eliminar un producto

productRouter.delete("/:id" , async (req , res) => {
    let id = (req.params.id);
    res.send(await productos.deleteProduct(id));
})


productRouter.put("/:id" , async (req , res) => {
    const id = (req.params.id);
    const updateProduct = req.body;
    res.send(await productos.updateProducts(id , updateProduct));
})

export default productRouter;

