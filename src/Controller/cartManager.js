import { promises as fs } from "fs" ; 
import { nanoid } from "nanoid";


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

    existProducts = async (id) => {
        let carts = await this.readCarts();
        return carts.find((cart) => cart.id === id);
    };

    addCart = async () => {
        let cartOld = await this.readCarts();
        let id = nanoid(1);
        const cartsConcat = [{ id: id , products: []} , ...cartOld];
        await this.writecarts(cartsConcat);
        return "carrito agregado"
    }

    getCartById = async (id) => {
        let cartById = await this.existProducts(id);
        if(!cartById) return(`carrito no encontrado`);
        return cartById;
    }
}

export default cartManager;