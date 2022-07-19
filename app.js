

$(document).ready( function ()  {
   loadData();
});

//Datos 
const products = [
    {
        "id": 140717952,
        "name": "Billetera",
        "description": "Billetera de cuero negro",
        "quantity": 4,
        "unitCost": 50,
    },
    {
        "id": 140717932,
        "name": "Carterra",
        "description": "Cartera de cuero negro",
        "quantity": 4,
        "unitCost": 30,
    },
    {
        "id": 140717953,
        "name": "Zapatos",
        "description": "Zapatos de cuero negro",
        "quantity": 2,
        "unitCost": 120,
    },
    {
        "id": 140717225,
        "name": "Correa",
        "description": "correa de cuero negro",
        "quantity": 15,
        "unitCost": 10,
    },
];

//Cargar los datos
function loadData() { 
    //Estructura de la tabla #table-products
   $("#table-products").append('<tr>'+
        '<th>ID</th>'+
        ' <th>Nombre</th>'+
        ' <th>Descripcion</th>'+
        '<th>Cantidad</th>'+
        '<th>Costo</th>'+
        ' <th>Total</th>'+
        ' <th>Accion</th>'+
        '</tr>');
   var total = 0, quantityTotal = 0;
    //recoremos los datos de product
    for (i = 0; i < products.length; i++){
       let totalProducto = products[i]['quantity'] * products[i]['unitCost'];
       $("#table-products").append(
        `<tr>
            <td> ${ products[i]['id'] } </td>
            <td> ${ products[i]['name'] } </td>
            <td> ${ products[i]['description'] } </td>
            <td><p id="td-quantity${ i }"> ${products[i]['quantity']}</p></td>
            <td>
                <p class="d-inline">$</p><p id="td-cost${ i }" class="d-inline">${ products[i]['unitCost'] } </p>
            </td>
            <td>
                <p class="d-inline">$</p><p id="td-total${ i }" class="d-inline">${ totalProducto } </p>
            </td>
            <td >
                <button id="quantity-up${ i }" onclick="increase(${ i })" type="button" class="m-1 btn btn-info btn text-white" title="Sumar cantidad de producto a la lista" >
                    <i class="bi bi-plus-circle-fill"></i> 
                </button>
                <button id="quantity-down${ i }" onclick="decrease(${ i })" type="button" class="m-1 btn btn-warning btn  text-white" title="Restar cantidad de producto a la lista" >
                    <i class="bi bi-dash-circle-fill"></i>
                </button>
                <button onclick="storeProduct(${ i })" data-bs-toggle="modal" data-bs-target="#productModal" type="button" class="m-1 btn btn-primary btn" title="Editar producto de la lista">
                    <i class="bi bi-pencil"></i>
                </button>
                <button type="button" onclick="storeProduct(${ i })" data-bs-toggle="modal" data-bs-target="#deleteModal" class="m-1 btn btn-danger btn" title="Editar producto de la lista">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `
       );
        //Si el total es menor a 0 lo igualamos a 0            
        if (isNaN(totalProducto)) {
            total += 0;
            quantityTotal += 0;
            
        }else {
            total += totalProducto;
            quantityTotal += products[i]['quantity'];
        }                
    }
    $("#table-products").append(
        `<tr>
            <td colspan="3"><b>Total</b></td>
            <td colspan="2"><h5 id="td-quantity-total" class="d-inline"> ${ quantityTotal } </h5></td>
            <td colspan="2"><h5 class="d-inline">$</h5><h5 id="td-total-total" class="d-inline"> ${ total } </h5></td>
        </tr>`
    );
}

//Agregar producto y edita productos
function addAndEditProduct() {

    let imputId = document.getElementById('inputId').value,
    table = document.getElementById("table-products"),
    productModal = document.getElementById('productModal'),
    modal = bootstrap.Modal.getInstance(productModal);

    //si la variable imputId no esta vacia editamos
    if(imputId){

        // var item = products.find(item => item.id == imputId);
        let name = document.getElementById('inputName').value,
        description = document.getElementById('inputDescription').value,
        quantity = parseInt(document.getElementById('inputQuantity').value),
        unitCost = document.getElementById('inputCost').value;

        //validacion de nombre tipo texto
        if( name == null || name.length == 0 || /^\s+$/.test(name) ) {
            document.getElementById("inputName").style.border = "3px solid red";
            return false;
        }else{
            document.getElementById("inputName").style.border = "1px solid #ced4da";
        }

        editProduct(imputId, name, description, quantity, unitCost);
        modal.hide();

    //si la variable imputId esta vacia registramos
    }else{
            
        let newId =  UniqueID(),
        name = document.getElementById('inputName').value,
        description = document.getElementById('inputDescription').value,
        quantity = 0,
        unitCost = document.getElementById('inputCost').value;

        //validacion de nombre tipo texto
        if( name == null || name.length == 0 || /^\s+$/.test(name) ) {
            document.getElementById("inputName").style.border = "3px solid red";
            return false;
        }else{
            document.getElementById("inputName").style.border = "1px solid #ced4da";
        }

        products.push({"id": newId, "name":name, "description":description, "quantity":quantity,  "unitCost": unitCost}); 
        modal.hide();
    }

    console.log(products);
    //limpiamos la tabla
    table.innerHTML = "";
    loadData();
    clearForm();

}

function addZero(x, n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}

//ID unicos extraidos de la hora
function UniqueID() {
   let d = new Date(),
    h = addZero(d.getHours(), 2),
    m = addZero(d.getMinutes(), 2),
    s = addZero(d.getSeconds(), 2),
    ms = addZero(d.getMilliseconds(), 3);

   //concatenamos a unas comillas para que no se sumen las variables y se concatenen
   id = '' + h + m + s + ms;
   return parseInt(id);
   
}

//eliminar productos
function destroyProduct() {
   let table = document.getElementById("table-products"),
   imputId = parseInt(document.getElementById('inputId').value);

    products.forEach(function(currentValue, index, arr){
        if(parseInt(products[index].id) == imputId){
            index == 0 ? products.splice(index, 1) : products.splice(index, index);
        }
    });

    //limpiamos la tabla
    table.innerHTML = "";
    loadData();
    clearForm();
}

// editar productos
function editProduct(id, name, description, quantity, unitCost){
    products.forEach(function(currentValue, index, arr){
        if(products[index].id == id){
            products[index] = {"id": id, "name":name, "description":description, "quantity":quantity,  "unitCost": unitCost};
        }
    })
}

// cargar los datos de un producto a el formulario
function storeProduct(key){
   document.getElementById('productModalLabel').innerHTML = '<i class="bi bi-cart-check"></i> Editar Producto';

   document.getElementById('inputKey').value = key;
   document.getElementById('inputId').value = products[key]['id'];
   document.getElementById('inputName').value = products[key]['name'];
   document.getElementById('inputDescription').value = products[key]['description'];
   document.getElementById('inputQuantity').value = products[key]['quantity'];
   unitCost = document.getElementById('inputCost').value = products[key]['unitCost'];
}

function clearForm() {
   document.getElementById("from-product").reset();
}

// incrementa la cantidad de producto
function increase(key){
    let cellQuantity = parseInt(document.getElementById('td-quantity'+key).innerHTML),
    cellCost = parseInt(document.getElementById('td-cost'+key).innerHTML),
    quantityTotal = parseInt(document.getElementById('td-quantity-total').innerHTML),
    totalTotal = parseInt(document.getElementById('td-total-total').innerHTML);

   document.getElementById('td-quantity'+key).innerHTML = cellQuantity + 1;
   document.getElementById('td-total'+key).innerHTML = document.getElementById('td-quantity'+key).innerHTML * cellCost;
   document.getElementById('td-quantity-total').innerHTML = quantityTotal + 1;
   document.getElementById('td-total-total').innerHTML = totalTotal + parseInt(document.getElementById('td-cost'+key).innerHTML);

   products[key]['quantity'] = cellQuantity + 1;

}

// descrementa la cantidad de producto
function decrease(key){
    let cellQuantity = parseInt(document.getElementById('td-quantity'+key).innerHTML),
    cellCost = parseInt(document.getElementById('td-cost'+key).innerHTML),
    quantityTotal = parseInt(document.getElementById('td-quantity-total').innerHTML),
    totalTotal = parseInt(document.getElementById('td-total-total').innerHTML);

   cellQuantity ? document.getElementById('td-quantity'+key).innerHTML = cellQuantity - 1 : 0;
   document.getElementById('td-total'+key).innerHTML = document.getElementById('td-quantity'+key).innerHTML * cellCost;
   cellQuantity ? document.getElementById('td-total-total').innerHTML = totalTotal - parseInt(document.getElementById('td-cost'+key).innerHTML) : 0;
   cellQuantity != 0 ? document.getElementById('td-quantity-total').innerHTML = quantityTotal - 1 : 0; 

   cellQuantity != 0 ? products[key]['quantity'] = cellQuantity - 1 : 0;
}
