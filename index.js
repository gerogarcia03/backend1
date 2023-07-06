class ProductManager {
    constructor() {
        this.products = []
    }


    addProduct(title, description, price, thumbnail, code, stock) {
        const product = {
            id: this.products.length,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(product);
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const prod = this.products.find((prod) => prod.id === id)

        if (this.products.id != id) {
            console.log("Not found")
        }
            return prod
    }
}

const product1 = new ProductManager();
product1.addProduct("coca cola", "coca cola 500ml", "$350", "no disponible", "777812831", 45);
product1.addProduct("pepsi", "pepsi 600ml", "$300", "no dispobible", "77123894", 14);
console.log(product1.getProductById(2));