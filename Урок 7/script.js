function HashStorageFunc(){
    var self = this;
    var mainStorage = {};

    // ADD VALUE
    self.addValue = function (key, value){
        mainStorage[key] = value;
    }
    
    // GET VALUE
    self.getValue = function(key){
        if (key in mainStorage)
            return mainStorage[key];
        else
            return undefined;
    }

    // DELETE VALUE
    self.deleteValue = function(key){
        if (key in mainStorage){
            delete mainStorage[key];
            return true;
        }
        return false;
    }

    // GET KEYS
    self.getKeys = function(){
        // let bufferArray = [];
        // for (let item in mainStorage){
        //     bufferArray.push(item);
        // }
        // return bufferArray;

        return Object.keys(mainStorage);
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
