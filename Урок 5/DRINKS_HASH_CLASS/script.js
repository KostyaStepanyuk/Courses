"use strict"

class HashStorageFunc {
    
    mainStorage = {};

    // ADD VALUE
    addValue(key, value){
        this.mainStorage[key] = value;
    }
    
    // GET VALUE
    getValue(key){
        if (key in this.mainStorage)
            return this.mainStorage[key];
        else
            return undefined;
    }

    // DELETE VALUE
    deleteValue(key){
        if (key in this.mainStorage){
            delete this.mainStorage[key];
            return true;
        }
        return false;
    }

    // GET KEYS
    getKeys(){
        let bufferArray = [];
        for (let item in this.mainStorage){
            bufferArray.push(item);
        }
        return bufferArray;
    }
}

let drinkStorage = new HashStorageFunc();

function addValue(){
    let name = prompt("Введите название напитка: ");
    let productInfo = {};
    productInfo.alcochol = confirm("Является ли напиток алкогольным?\nОК - да, Отмена - нет");
    let recipe = prompt("Введите рецепт напитка: ");
    productInfo.recipe = recipe;
    drinkStorage.addValue(name, productInfo);
    console.log("Успешно добавлено!");
}

function getValue(){
    let keyName = prompt("Введите название продукта, о котором хотите получить информацию:");
    let productInformation = drinkStorage.getValue(keyName);
    if (productInformation !== undefined){
        if (productInformation.alcochol) productInformation.alcochol = "Да"
        else productInformation.alcochol = "Нет"
        console.log("Название: " + keyName +
                    "\nАлкогольный: " + productInformation.alcochol + 
                    "\nРецепт: " + productInformation.recipe);
    }
    else
        console.log("Такого продукта не существует.");
}

function deleteValue(){
    let key = prompt("Введите название продукта, который хотите удалить: ");
    if (drinkStorage.deleteValue(key))
        console.log("Продукт успешно удалён.");
    else
        console.log("Продукт с заданным именем отсутствует.");
}

function getKeys(){
    console.log(drinkStorage.getKeys());
}
