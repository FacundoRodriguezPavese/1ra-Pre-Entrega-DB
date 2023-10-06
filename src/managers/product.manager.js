import fs from 'fs';

export default class ProductManager {

  constructor(ruta) {
    this.ruta = ruta;
  }

  async save(product) {
    try {
      const products = await this.getProducts();

      if (!product.title || !product.description || !product.price || !product.status || !product.stock || !product.category) {
        console.log({error: 'Todos los campos son obligatorios'});;
    }

      if (products.length === 0) {
        product.id = 1;
      } else {
        product.id = products[products.length - 1].id + 1;
      }

      products.push(product);

      await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))

      return products;

    } catch (error) {
      console.log(error);
      console.log('mi error');
    }
  }

  async getById(id) {
    try {
        const products = await this.getProducts();
        const productById = products.find(product => product.id === id);

        if (!productById) {
            console.log('Producto no encontrado');;
        }
        return productById;
    } catch (error) {
        console.log(error);
    }
}

  async getAll() {
    try {
      if (fs.existsSync(this.ruta)) {
        const data = await promises.readFile(this.ruta, 'utf-8');
        const products = JSON.parse(data)
        return products;
      } else return [];
    }
    catch (error) {
      console.log(error);
      return [];
    }
  }

  async deleteById(id) {
    try {
        const products = await this.getProducts();
        const productIndex = products.findIndex(product => product.id === id);

        if (productIndex != -1) {
          products.splice(productIndex, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        }
        else {
            console.log('El producto que intentas eliminar no se encontro');
        }

    } catch (error) {
        console.log(error);
    }
  };
};