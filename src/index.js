import express from "express";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Rutas

app.use("/api/products" , productRouter);
app.use("/api/cart" , cartRouter);

// creo el Puerto

const PORT = 8080 ;
const server = app.listen (PORT , () => { 
    console.log(`Local host ${server.address().port}` )
});

// inicializo el servidor 

server.on("error" , (error) => console.log(`Error on ${error}`));
