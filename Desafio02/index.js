let fs = require("fs");

let archivo = "./productos.txt"

class Producto {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}
let producto = new Producto("calculadora1", 12.34, "foto1", archivo);
let producto2 = new Producto("calculadora2", 23.54, "foto2", archivo);
let producto3 = new Producto("calculadora3", 35.46, "foto3", archivo);
let producto4 = new Producto("calculadora4", 45.67, "foto4", archivo);
let producto5 = new Producto("calculadora5", 56.78, "foto5", archivo);
let producto6 = new Producto("calculadora6", 67.89, "foto6", archivo);
let array = [];
producto.id = array.length + 1;
array.push(producto);
producto2.id = array.length + 1;
array.push(producto2);
producto3.id = array.length + 1;
array.push(producto3);
producto4.id = array.length + 1;
array.push(producto4);
producto5.id = array.length + 1;
array.push(producto5);
producto6.id = array.length + 1;
array.push(producto6);
arrString = JSON.stringify(array);
//console.log(arrString);
class Contenedor {
    constructor(archivo, array) {
        this.archivo = archivo;
        this.array = array;
    }
    async save() {
        try {
            arrString = JSON.stringify(array);
            await fs.promises.appendFile(this.archivo, arrString);
            console.log('Saved!');
        }
        catch (err) {
            console.log("No se pudo guardar");
        }
        console.log(`El array escrito es ${arrString}`);
    };




    async getAll() {
        try {
            let objeto = await fs.promises.readFile(this.archivo, 'utf8');
            let arr = JSON.parse(objeto);
            console.log(arr);
            return arr;
        }
        catch (error) {
            console.log('No se pudo leer el archivo');
        }
    }

    async getById(id) {
        this.id = id;
        let newId = id - 1;
        try {
            let objeto = await fs.promises.readFile(this.archivo, 'utf8');
            let arr = JSON.parse(objeto);
            if (newId < arr.length && newId >= 0) {
                console.log(arr[newId]);
            } else {
                console.log('No existe el elemento');
            }
            return (arr[newId]);
        }
        catch (error) {
            console.log('No se pudo leer el elemento');
        }
    }
    async deleteById(id) {
        this.id = id;
        let newId = id - 1;
        try {
            let objeto = await fs.promises.readFile(this.archivo, 'utf8');
            let arr = JSON.parse(objeto);
            if (newId < arr.length && newId >= 0) {
                arr[newId] = 'Elemento Vacio';
                objeto = JSON.stringify(arr);
                fs.writeFile(this.archivo, objeto, function (err) {
                    if (err) throw err;
                    console.log(`Se eliminó el elemento\n ${arr}`);
                });
                return (arr);
            } else {
                console.log('No existe el elemento');
            }
        }
        catch (error) {
            console.log('No se pudo leer el elemento');
        }
    }
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.archivo, "");
            console.log('Se borró el documento');
        }
        catch (err) {
            console.log('No se pudo borrar el documento');
        }
    }
}

let contenedor1 = new Contenedor(archivo, array);

//contenedor1.save();
//contenedor1.getAll();
contenedor1.getById(4);
//contenedor1.deleteById(1);
//contenedor1.deleteAll();