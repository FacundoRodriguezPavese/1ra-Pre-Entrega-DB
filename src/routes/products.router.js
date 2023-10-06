import ProductManager from '../managers/product.manager.js';
import { Router } from "express";
import { __dirname } from "../utils.js";
import path from 'node:path';

const router = Router();

const productsFilePath = path.join(__dirname, "./files/products.json");
const productManager = new ProductManager(productsFilePath);

// La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior
router.get('/', async (req, res) => {
    const products = await productManager.getAll();
    const limit = req.query.limit;
    if (!limit) return res.send({ status: 'success', payload: products });
    if (isNaN(limit)) return res.send({ status: 'error', error: 'El valor ingersado no es un numero' });

    const productsLimitados = carts.slice(0, limit)
    //Tengo el arreglo y si me llega el limit, tomo esos primeros elementos del arreglo
    res.send({ status: 'sucess', payload: productsLimitados });
});

//La ruta GET /:pid deberá traer sólo el producto con el id proporcionado
router.get('/:pid', async (req, res) => {
    const id = req.params.pid
    const product = await productManager.getById(id);
    res.send( {status: 'success', payload: product} )
})

// La ruta raíz POST / deberá agregar un nuevo producto 
router.post('/', async (req, res) => {
    try {
        const product = req.body;
        await productManager.addProduct(product);
        res.status(200).send({ status: 'success', payload: product });
    }
    catch(error) {
        res.status(400).send({ error: 'producto no agregado' });
    }
});

//La ruta PUT /:pid deberá tomar un producto y actualizarlo
router.put('/:pid', async (res,req) => {
    const products = await productManager.getAll();
    const product = req.body;
    const productId = req.params.pid;
    
    const index = products.findIndex(product => product.id === productId);

    //Si lo encontró
    if(index !== -1) {
        //Vamos a agregar el id al usuario que queremos actualizar
        const newProduct = { id: productId, ...product }
        products[index] = newProduct;
        res.send({ status: 'success', message: 'product updated' });
    } else {
        res.status(404).send({ status: 'error', error: 'product not found' });
    }

});

//La ruta DELETE /:pid deberá eliminar el producto con el pid indicado.
router.delete('/:pid', async (res,req) => {
    try {
        const id = Number(req.params.pid);
        await productManager.deleteProduct(id);

        res.status(200).send({ status: 'success' });
    }
    catch (error) {
        res.status(400).send({ error: 'no fue posible elminiar el producto' }); 
    }

});

export default router;