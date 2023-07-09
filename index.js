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

        const prod = this.products.find((prod) => prod.code === code)

        if(prod){
            console.log(`el codigo de ${product.title} no fue encontrado`)

        }
        else{
            this.products.push(product);
        } 
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const prod = this.products.find((prod) => prod.id === id)

        if (prod) {
            return prod
        }
        else {
            console.log("este producto no existe")
        }

    }
}

const product1 = new ProductManager();
product1.addProduct("coca cola", "coca cola 500ml", "$350", "no disponible", "777812831", 45);
product1.addProduct("pepsi", "pepsi 600ml", "$300", "no dispobible", "77781412", 14);
product1.addProduct("fanta", "fanta 500ml", "$350", "no disponible", "777812831", 42 )
console.log(product1.getProductById(1));