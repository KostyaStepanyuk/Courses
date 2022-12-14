const form = document.forms[0];

function createError(targetIdentifier, errorMessage = "Данное поле должно быть заполнено!"){
    removeError(targetIdentifier);
    let errorBox = document.createElement("div");
    errorBox.style.cssText = 'position: absolute; background-color: red; padding: 2px;';
    errorBox.id = targetIdentifier + "-error";
    errorBox.innerText = errorMessage;
    let buff = document.getElementById(targetIdentifier);
    errorBox.style.left = buff.offsetLeft + buff.offsetWidth + 10 + "px";
    errorBox.style.top = buff.offsetTop - 1 + "px";
    document.body.appendChild(errorBox);
}

function removeError(targetIdentifier){
    if (document.getElementById(targetIdentifier + "-error") !== null){
        document.body.removeChild(document.getElementById(targetIdentifier + "-error"));
    }
}

function getRadioValue(radioName) {
    return form.elements[radioName].value;
  }

function isEmpty(target){
    if ((target.type === "text" && target.value === '') || 
        (target.type === "number" && target.value === '') || 
        (target.type === "date" && target.value === '') ||
        (target.type === "email" && target.value === '') ||
        (target.type === "textarea" && target.value === '')){
        createError(target.id);
        return true;
    }
    return false;
}

function isShort(target){
    if ((target.type === "text" && target.value !== '' && target.value.length < 5) ||        
        (target.type === "textarea" && target.value !== '' && target.value.length < 5)){
            createError(target.id, "Данное значение слишком короткое.");
            return true;
    }
    return false;
}

function isNegative(target){
    if (target.type === "number" && target.value < 0){
        createError(target.id, "Значение данного поля не должно быть отрицательным.");
        return true;
    }
    return false;
}

function isDefaultValue(target){
    if (target.type === "select-one" && target.value === "1"){
        createError(target.id, "Данное значение недопустимо.");
        return true;
    }
    if (target.type === "checkbox" && target.checked === false){
        createError(target.id, "Данное значение недопустимо.");
        return true;
    }
    
    return false;
}

function validateItem(targetIdentifier){
    if (targetIdentifier === "free" || targetIdentifier === "pay" || targetIdentifier === "vip")
        if (getRadioValue("values") !== 'on'){
            createError("vipLabel", "Нужно выбрать значение!");
            return true;
        }
        else{
            removeError("vipLabel");
            return true;
        }
    let target = document.getElementById(targetIdentifier);
    
    if (isEmpty(target)) return false; // не может быть пустым

    if (isShort(target)) return false; // не может быть короче 5 символов

    if (isNegative(target)) return false; // не может быть меньше 0

    if (isDefaultValue(target)) return false; // не может иметь начальное значение

    removeError(target.id);
    return true;
}

function validateField(EO){
    EO = EO || window.event;
    validateItem(EO.target.id);
}

function applyEventListeners(){
    for (let i = 0; i < form.elements.length - 1; i++){
        if (form.elements[i].type === "radio" ||
            form.elements[i].type === "checkbox" ||
            form.elements[i].type === "select-one"){
                form.elements[i].addEventListener('change',validateField,false);
            }
        else form.elements[i].addEventListener('blur',validateField,false);
    }
}

function submit(EO){
    EO = EO || window.event;
    EO.preventDefault();
    let formValid = true,
        firstWrongField = -1;
    for (let i = 0; i < form.elements.length - 1; i++){
        if (!validateItem(form.elements[i].id)){
            formValid = false;
            if (firstWrongField === -1) firstWrongField = form.elements[i];
        }
    }
    if (formValid) form.submit();
    else {
        firstWrongField.focus();
    }
}

form.addEventListener('submit', submit);

applyEventListeners();