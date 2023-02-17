import { promises as fs } from "fs" ; 
import { nanoid } from "nanoid";
import ProductManager from "./ProductManager.js";

const productAll = new ProductManager;


class cartManager {
    constructor() {
        this.path = "src/models/carts.json";
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path , "utf-8");
        return JSON.parse(carts);
    };

    writecarts = async (cart) => {
        await fs.writeFile(this.path , JSON.stringify(cart, null , 2));
    };

    existProductsCart = async (id) => {
        let carts = await this.readCarts();
        return carts.find((carts) => carts.id === id);
    };

    addCart = async () => {
        let cartOld = await this.readCarts();
        let id = nanoid(1);
        const cartsConcat = [{ id: id , products: []} , ...cartOld];
        await this.writecarts(cartsConcat);
        return "carrito agregado"
    }

    getCartById = async (id) => {
        let cartById = await this.existProductsCart(id);
        if(!cartById) return(`carrito no encontrado`);
        return cartById;
    }

    addProducInCart = async (cartId , productId) => {
        let cartById = await this.existProductsCart(cartId);
        if(!cartById) return(`carrito no encontrado`);

        let productById = await productAll.existProducts(productId);
        if(!cartById) return(`Producto no encontrado`);
        
        let cartsAll = await this.readCarts();
        let cartFilter = cartsAll.filter(cart => cart.id != cartId);
        
        if(cartById.products.some(prod => prod.id === productId)) {
            let productInCart = cartById.products.find(prod => prod.id === productId);
            productInCart.quantity++
            let cartsconcat = [cartById , ...cartFilter] //[{id: cartId , products: [{productInCart , ...cartFilter}]}];
            console.log(cartsconcat)
            await this.writecarts(cartsconcat);
            return "Producto Sumado al carrito"
        } else {
            let cartsConcat = [{ id:cartId , products: [{id: productById.id , quantity: 1}]} , ...cartFilter];
            await this.writecarts(cartsConcat);
            return "Producto Agregado al carrito"
        }

    }
}

export default cartManager;