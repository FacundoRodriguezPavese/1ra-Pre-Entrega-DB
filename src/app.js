import express from "express";
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import { __dirname } from './utils.js';

const app = express();
const port = 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use('/static-files', express.static(`${__dirname}/public`));
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);

app.listen(port, () => { console.log(`Listening on por ${port}`); })