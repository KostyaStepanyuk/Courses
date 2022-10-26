"use strict";
function createClock(){
    // Удаляем старые часы, если такие были
    let oldClockElement = document.getElementById("clockElement");
    if (oldClockElement){
        document.body.removeChild(oldClockElement);
    }

    // Создаём новые часы
    let clockDiameter = document.getElementById("clockDiameter").value; // Диаметр круга
    let clockElement = document.createElement("div"); // Объект круга
    clockElement.id = "clockElement";
    clockElement.style.position = "relative";
    clockElement.style.width = clockDiameter + "px";
    clockElement.style.height = clockDiameter + "px";
    clockElement.style.backgroundColor = "orange";
    clockElement.style.borderRadius = "50%";
    clockElement.style.marginTop = 25 + "px";
    document.body.appendChild(clockElement);


    let clockRadius = clockDiameter / 2; // Радиус часов
    let centerX = clockRadius; // Центр круга по оси X
    let centerY = clockRadius; // Центр круга по оси Y

    let hoursDistance = clockRadius * 0.8; // Расстояние до объектов с числами часов

    // Создаём циферблат
    for (let hour = 1; hour <= 12; hour++){
        let hourElement = document.createElement("div");
        
        const hourAngle = 360 / 12 * hour / 180 * Math.PI; // Угол каждого объекта с числом часов в радианах
        const hourDiameter = clockDiameter * 0.15;
        const hourX = centerX + hoursDistance * Math.sin(hourAngle) - hourDiameter / 2; // Центр круга с числов часов по оси X 
        const hourY = centerY - hoursDistance * Math.cos(hourAngle) - hourDiameter / 2; // Центр круга с числов часов по оси Y 

        hourElement.style.position = "absolute";
        hourElement.style.left = hourX + "px";
        hourElement.style.top = hourY + "px";
        hourElement.style.width = hourDiameter + "px";
        hourElement.style.height = hourDiameter + "px";
        hourElement.style.backgroundColor = "lightgreen";
        hourElement.style.borderRadius = "50%";
        hourElement.style.display = "flex";
        hourElement.style.alignItems = "center";
        hourElement.style.justifyContent = "center";
        hourElement.innerHTML = hour;

        clockElement.appendChild(hourElement);
    }

    // Создаём стрелки часов
    let minuteHandWidth = clockDiameter / 50; // Задаём ширину минутной стрелки
    // Часовая стрелка
    let hourHand = document.createElement("div");
    hourHand.style.position = "absolute";
    hourHand.style.width = minuteHandWidth * 2 + "px";
    hourHand.style.height = clockRadius / 2 + "px"; // Длина часовой стрелки будет равна 0.5 радиуса часов
    hourHand.style.backgroundColor = "black";
    hourHand.style.borderRadius = minuteHandWidth / 2 + "px";
    hourHand.style.transformOrigin = "50% 90%";
    clockElement.appendChild(hourHand);
    hourHand.style.left = centerX - hourHand.offsetWidth / 2 + "px";
    hourHand.style.top = centerY - hourHand.offsetHeight + hourHand.offsetHeight / 10 + "px";
    hourHand.id = "hourHand";

    // Минутная стрелка
    let minuteHand = document.createElement("div");
    minuteHand.style.position = "absolute";
    minuteHand.style.width = minuteHandWidth + "px";
    minuteHand.style.height = clockRadius * 0.75 + "px"; // Длина минутной стрелки будет равна 0.75 радиуса часов
    minuteHand.style.backgroundColor = "black";
    minuteHand.style.borderRadius = minuteHandWidth / 2 + "px";
    minuteHand.style.transformOrigin = "50% 90%";
    clockElement.appendChild(minuteHand);
    minuteHand.style.left = centerX - minuteHand.offsetWidth / 2 + "px";
    minuteHand.style.top = centerY - minuteHand.offsetHeight + minuteHand.offsetHeight / 10 + "px";
    minuteHand.id = "minuteHand";
    
    // Секундная стрелка
    let secondHand = document.createElement("div");
    secondHand.style.position = "absolute";
    secondHand.style.width = minuteHandWidth / 2 + "px";
    secondHand.style.height = clockRadius * 0.85 + "px"; // Длина секундной стрелки будет равна 0.85 радиуса часов
    secondHand.style.backgroundColor = "black";
    secondHand.style.borderRadius = minuteHandWidth / 2 + "px";
    secondHand.style.transformOrigin = "50% 90%";
    clockElement.appendChild(secondHand);
    secondHand.style.left = centerX - secondHand.offsetWidth / 2 + "px";
    secondHand.style.top = centerY - secondHand.offsetHeight + secondHand.offsetHeight / 10 + "px";
    secondHand.id = "secondHand";

    // Создаём контейнер для числового отображения времени
    let currentTimeNumeric = document.createElement("div");
    currentTimeNumeric.style.position = "absolute";
    clockElement.appendChild(currentTimeNumeric);
    currentTimeNumeric.style.top = clockRadius / 2 + "px";
    currentTimeNumeric.style.fontStyle = "italic";
    currentTimeNumeric.style.fontSize = "1.5em";
    currentTimeNumeric.id = "currentTimeNumeric";

    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    let currentTime = new Date();
    console.log(currentTime);

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    // Обновляем числовое значение времени
    let currentTimeNumeric = document.getElementById("currentTimeNumeric");
    currentTimeNumeric.innerHTML = hours + ":" + minutes + ":" + ("0" + seconds).slice(-2);
    // Обновляем координату Х для числового значения
    currentTimeNumeric.style.left = document.getElementById("clockElement").offsetWidth / 2 - currentTimeNumeric.offsetWidth / 2 + "px";

    
    
    let secondHand = document.getElementById("secondHand");
    const degreesForSecond = seconds * 6;
    secondHand.style.transform = "rotate(" + degreesForSecond + "deg)";

    let minuteHand = document.getElementById("minuteHand");
    const degreesForMinute = minutes * 6 + (seconds / 60) * 6;
    minuteHand.style.transform = "rotate(" + degreesForMinute + "deg)";

    let hourHand = document.getElementById("hourHand");
    const degreesForHour = hours * 30 + (minutes / 2);
    hourHand.style.transform = "rotate(" + degreesForHour + "deg)";
}

