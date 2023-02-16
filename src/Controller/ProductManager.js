import { promises as fs } from "fs" ; 
import { nanoid } from "nanoid";


export default class ProductManager {
    constructor () {
    this.path = "src/models/products.json"
    this.products = [] ;
    }

    static id = 0 ; 

    readProducts = async () => {
        let respuesta = await fs.readFile(this.path , "utf-8");
        return JSON.parse(respuesta);
    };

    writeProducts = async (product) => {
        await fs.writeFile(this.path , JSON.stringify(product, null , 2));
    }

    existProducts = async (id) => {
        let products = await this.readProducts();
        return products.find((product) => product.id === id);
    }

    // promesa para agregar producto
    addProduct = async (objeto) => {
        objeto.status = true;
        if(objeto.title && objeto.description && objeto.code && objeto.stock && objeto.prince  ) {
            let productOld = await this.readProducts();
            objeto.id = nanoid(1).toUpperCase();
            let productAll = [...productOld , objeto];
            await this.writeProducts(productAll);
            return "Product Agregado";
        } else {
            return "All Field Are requerid" ;
        }
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts();
        return console.log(respuesta2);
    }

    getProductById = async (id) => {
        let exist = await this.existProducts(id);
        if(!exist) return(`product ID ${id} NOT FOUND`);
        return exist;
    }

    deleteProduct = async (id) => { 
        let respuesta = await this.readProducts();
        let exist = respuesta.some((product) => product.id === id);
        let productFilter = respuesta.filter((products) => products.id !== id);
        if (!exist) {
            return "Pruduct Mising"
        }  else {
            await this.writeProducts(productFilter,null,2);
            return `Product with ID ${id} are deleted` ;
        } 
    } 

    updateProducts = async ({id , ...producto}) => {
        let exist = await this.existProducts(id);
        if(!exist) return `Product with id ${id} NOT FOUND` ;
        await this.deleteProduct(id);
        let productOld = await this.readProducts();
        let ProdcutModif = [{...producto , id: id}, ...productOld];
        await this.writeProducts(ProdcutModif);
        return "Product Updated";
    }
}
