import fs from 'fs';

export default class CartManager {

  constructor(ruta) {
    this.ruta = ruta;
  }

  addCart = async () => {
    try {
      const carts = await this.getAll();
      let cart = {};

      cart.id = carts.length === 0 ? 1 : carts[carts.length - 1].id + 1;
      cart.products = [];

      carts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
      return cart;

    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const carts = await this.getCart();
      const getCartById = carts.find(p => p.id === id);

      if (!getCartById) {
        throw new Error(`El carrito no existe`);
      }
      return getCartById;
    } catch (error) {
      console.log(error);
    }
  };

  async getAll() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.ruta, 'utf-8');
        const carts = JSON.parse(data)
        return carts;
      } else return [];
    }
    catch (error) {
      console.log(error);
    }
  };

  updateCart = async (cartId, productId) => {
    try {
      const allCarts = await this.getCart();
      const cartIndex = allCarts.findIndex(p => p.id === cartId);

      if (cartIndex !== -1) {
        const productIndex = allCarts[cartIndex].products.findIndex(product => product.id === productId);

        if (productIndex !== -1) {
          allCarts[cartIndex].products[productIndex].quantity++;
        } else {
          allCarts[cartIndex].products.push({ id: productId, quantity: 1 });
        }

        await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, '\t'));
      } else {
        console.log("El carrito que intentas actualizar no existe");
      }

    } catch (error) {
      console.log(error);
    }
  }



  async deleteById(id) {

  }

  async deleteAll() {

  }
}