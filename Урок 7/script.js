"use strict"

var formDef1=
[
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы:',kind:'check',name:'votes'},
  {label:'Описание сайта:',kind:'memo',name:'description'},
  {caption:'Опубликовать',kind:'submit'},
];

var formDef2=
[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {caption:'Зарегистрироваться',kind:'submit'},
];

function appendElement(parent, element){
    if (element.kind !== "submit"){
        let caption = document.createTextNode(element.label);
        parent.appendChild(caption);
    }
    let item;
    switch (element.kind){
        case 'longtext':
            item = document.createElement("input");
            item.name = element.name;
            item.style.width = "453px";
            break;
        case 'number':
            item = document.createElement("input");
            item.name = element.name;
            item.style.width = "80px";
            break;
        case 'shorttext':
            item = document.createElement("input");
            item.name = element.name;
            item.style.width = "200px";
            break;
        case 'combo':
            item = document.createElement("select");
            item.name = element.name;
            for (let i = 0; i < element.variants.length; i++){
                let option = document.createElement("option");
                option.value = element.variants[i].text;
                
                let optionCaption = document.createTextNode(element.variants[i].text);
                option.appendChild(optionCaption);
                
                item.appendChild(option);
            }
            item.selectedIndex = 2;
            break;
        case 'radio':
            for (let i = 0; i < element.variants.length; i++){
                item = document.createElement("label");
                
                let radio = document.createElement("input");
                radio.type = "radio";
                radio.name = element.name;
                radio.value = element.variants[i].text;

                item.appendChild(radio);
                item.appendChild(document.createTextNode(element.variants[i].text));
                
                parent.appendChild(item);
            }
            break;
        case 'check':
            item = document.createElement("input");
            item.type = 'checkbox';
            item.name = element.name;
            item.checked = "checked";
            break; 
        case 'memo':
            parent.appendChild(document.createElement("br"));
            item = document.createElement("textarea");
            item.name = element.name;
            break; 
        case 'submit':
            item = document.createElement("button");
            item.type = 'submit';
            item.name = element.caption;
            item.appendChild(document.createTextNode(element.caption));
            break; 
        default:
            item = document.createElement("input");
            break;
    }
    parent.appendChild(item);
    parent.appendChild(document.createElement("br"));
}

function buildForm(formDefenition){
    let formContainer = document.createElement("div");
    
    let form = document.createElement("form");
    form.action = "https://fe.it-academy.by/TestForm.php";
    formContainer.appendChild(form);

    for (let element in formDefenition){
        appendElement(form, formDefenition[element]);
    }


    document.body.appendChild(formContainer);
}

buildForm(formDef1);
for (let i = 0; i < 5; i++)
    document.body.appendChild(document.createElement('br'));
buildForm(formDef2);