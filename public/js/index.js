const socketClient = io()

const prodsForm = document.getElementById('prodsForm');
const title = document.getElementById("title");
const description = document.getElementById("description");
const price = document.getElementById("price");
const stock = document.getElementById("stock");
const prodsTable = document.getElementById("prodsTable");
const deleteForm = document.getElementById("deleteProduct");
const id = document.getElementById("id");

prodsForm.onsubmit = (e) => {
    e.preventDefault();
    const obj = {
        title: title.value,
        description: description.value,
        price: Number(price.value),
        stock: Number(stock.value),
    };

    socketClient.emit("addProd", obj);
    title.value = '';
    description.value = '';
    price.value = '';
    stock.value = '';
    console.log('Producto', obj);
};

socketClient.on("addProd", (newProduct) => {
    console.log('nuevo producto registrado: ', newProduct);
    const addRow = `
        <tr>
            <td>${newProduct.id}</td>
            <td>${newProduct.title}</td>
            <td>${newProduct.description}</td>
            <td>${newProduct.price}</td>
            <td>${newProduct.stock}</td>
        </tr>`;
    prodsTable.innerHTML += addRow;

});

deleteForm.onsubmit = (e) => {
    e.preventDefault();
    socketClient.emit('deleteProd', Number(id.value));
    id.value = '';
    console.log('producto eliminado')
};

socketClient.on('deletedProd', (prodsArray) => {
    const addRow = prodsArray.map((objProd) => {
        return `
            <tr>
            <td>${objProd.id}</td>
            <td>${objProd.title}</td>
            <td>${objProd.description}</td>
            <td>${objProd.price}</td>
            <td>${objProd.stock}</td>
            </tr>
        `;
    }).join(' ');
    prodsTable.innerHTML = addRow;
});
