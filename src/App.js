import express from "express";
import ProductManager from "./productManager.js";


const app = express();
app.use(express.urlencoded({ extended: true}));

const productos = new ProductManager();
const readProduct = productos.readProducts();

// consulto por todos los productos 

app.get("/products", async (req ,res) => {
    let limit = parseInt(req.query.limit);  
    if (!limit) return res.send(await readProduct)  // condicional para que si no pongo un limit me tire todos los producto 
    let allProducts = await readProduct;
    let productLimit = allProducts.slice(0, limit);
    res.send(productLimit);
});

app.get("/products/:id", async (req ,res) => {
    let id = parseInt(req.params.id);
    let allProducts = await readProduct;
    let productsById = allProducts.find(productos => productos.id === id); 
    if (!productsById) {
        res.send(`PRODUCT ID ${id} NOT FOUND`);
    } else {
        res.send(productsById);
    }
})

// creo el Puerto
const PORT = 8080 ;
const server = app.listen (PORT , () => { 
    console.log(`Local host ${server.address().port}` )
});

// inicializo el servidor 

server.on("error" , (error) => console.log(`Error on ${error}`));