import { promises as fs } from "fs" ; 

export default class ProductManager {
    constructor () {
    this.path = "./products.json"
    this.products = [] ;
    }

    static id = 0 ; 

    // promesa para agregar producto
    addProduct = async (  tilte, description, prince, thumbnail, code, stock, ) => {
        ProductManager.id++ ;  //contador para el id incremetal
        let newProduct = {            
            id: ProductManager.id ,
            tilte,
            description,
            prince,
            thumbnail,
            code,
            stock,
        }

        this.products.push(newProduct) 

        await fs.writeFile(this.path , JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.path , "utf-8");
        return JSON.parse(respuesta);
    };

    getProducts = async () => {
        let respuesta2 = await this.readProducts();
        return console.log(respuesta2);
        
    }

    getProductById = async (id) => {
        let respuesta3 = await this.readProducts();
        let exist = respuesta3.find((product) => product.id === id);
        (!exist) ? console.log("product no found") :  console.log (exist);
        
    }

    
    deleteProduct = async (id) => { 
        let respuesta = await this.readProducts();
        let exist = respuesta.find((product) => product.id === id);
        let productFilter = respuesta.filter((products) => products.id !== id);
        if (!exist) {
            console.log("Pruduct Mising")
        }  else {
            await fs.writeFile(this.path, JSON.stringify(productFilter));
            console.log("Product Deleted");
        } 
    } 

    updateProducts = async ({id , ...producto} ) => {
        await this.deletProduct(id);
        let productOld = await this.readProducts();
        let ProdcutModif = [{id , ...producto} , ...productOld];
        await fs.writeFile(this.path , JSON.stringify(ProdcutModif));
        console.log(ProdcutModif)
    }
}