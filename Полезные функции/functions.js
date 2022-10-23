////// Библиотеки //////
// EventEmitter - паттерн Observer (подписка на обновление состояния)
// 
////////////////////////

//Чтобы поймать EO:
EO = EO || window.event;

//получение целевого элемента события
//eo - объект события
function getEventElement(eo) {
  if ( window.event && window.event.srcElement )
    return window.event.srcElement;

  if ( eo.target )
    return eo.target;

  return null;
}

// получение нажатой кнопки мыши
// eo - объект события
function getMouseWhich(eo) {
  if ( eo.which ) return eo.which;
  if ( eo.button&1 ) return 1;
  if ( eo.button&4 ) return 2;
  if ( eo.button&2 ) return 3;
  return 0;
}

// получение нажатого на клавиатуре символа
// eo - объект события
function getKeyboardChar(eo) {
  if ( eo.which==null ) {  // IE
    if ( eo.keyCode<32) return null; // управляющая клавиша
    return String.fromCharCode(eo.keyCode); // печатный символ
  }
  if ( eo.which!=0 && eo.charCode!=0 ) {  // остальные браузеры
    if ( eo.which<32 ) return null; // управляющая клавиша
    return String.fromCharCode(eo.which); // печатный символ
  }
  return null; // управляющая клавиша
}