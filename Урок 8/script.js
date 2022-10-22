function createError(targetIdentifier, errorMessage = "Данное поле должно быть заполнено!"){
    removeError(targetIdentifier);
    let errorBox = document.createElement("div");
    errorBox.style.cssText = 'position: absolute; background-color: red; padding: 3px;';
    errorBox.id = targetIdentifier + "-error";
    errorBox.innerText = errorMessage;
    let buff = document.getElementById(targetIdentifier);
    errorBox.style.left = buff.offsetLeft + buff.offsetWidth + 10 + "px";
    errorBox.style.top = buff.offsetTop + "px";
    document.body.appendChild(errorBox);
}

function removeError(targetIdentifier){
    if (document.getElementById(targetIdentifier + "-error") !== null){
        document.body.removeChild(document.getElementById(targetIdentifier + "-error"));
    }
}

function getEventElement(eo) {
  if ( window.event && window.event.srcElement )
    return window.event.srcElement;

  if ( eo.target )
    return eo.target;

  return null;
}

function getRadioValue(radioName) {
    return document.forms[0].elements[radioName].value;
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

function isWrong(target){
    if (target.type === "number" && target.value < 0){
        createError(target.id, "Значение данного поля не должно быть отрицательным.");
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
    
    if (isEmpty(target)) return false;

    if (isShort(target)) return false;

    if (isWrong(target)) return false;

    removeError(target.id);
    return true;
}

function validateField(EO){
    EO = EO || window.event;
    validateItem(EO.target.id);
}

function validate(){
    for (let i = 0; i < document.forms[0].elements.length - 1; i++){
        document.forms[0].elements[i].addEventListener('blur',validateField,false);
    }
}

function submit(EO){
    EO = EO || window.event;
    EO.preventDefault();
    let formValid = true;
    for (let i = 0; i < document.forms[0].elements.length - 1; i++){
        if (!validateItem(document.forms[0].elements[i].id))
            formValid = false;
    }
    if (formValid) document.forms[0].submit();
}

document.forms[0].addEventListener('submit', submit);

validate();