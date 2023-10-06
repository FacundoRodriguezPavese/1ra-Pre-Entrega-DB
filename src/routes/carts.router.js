import CartManager from '../managers/cart.manager.js';
import ProductManager from '../managers/product.manager.js'
import { Router } from 'express';
import { __dirname } from "../utils.js";
import path from 'node:path';

const router = Router();

const productsFilePath = path.join(__dirname, "./files/carts.json");
const cartManager = new CartManager(productsFilePath);

const productsFilePath2 = path.join(__dirname, "./files/products.json");
const productManager = new ProductManager(productsFilePath2);

//La ruta raíz POST / deberá crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        await cartManager.addCart();
        res.send( {status: 'succes'} )
    } catch (error) {
        res.send({status: 'error'})
    }
});

//La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.

router.get('/:cid', async (req,res) => {
    try {
        const id = Number(req.params.cid);
        const products = await cartManager.getCartById(id);
        res.send({ status: 'success', payload: products.products });
    }
    catch(error) {
        res.status(400).send({ error: error.message });
    }
});

//La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = Number(req.params.cid);
        const productId = Number(req.params.pid);

        const product = await productManager.getProductById(productId);

        await cartManager.updateCart(cartId, productId);
        res.status(200).send({ status: 'success', payload: product})
    }
    catch(error) {
        res.status(400).send({ error: error.message });
    }
});

export default router;