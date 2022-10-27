"use strict";

function createClock(){
    // Удаляем старые часы, если такие были
    let oldSVGElement = document.getElementById("clockSVGElement");
    if (oldSVGElement){
        document.body.removeChild(oldSVGElement);
    }

    // Создаём новые часы
    let clockDiameter = document.getElementById("clockDiameter").value; // Диаметр круга
    let clockRadius = clockDiameter / 2; // Радиус круга
    
    let svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', clockDiameter);
    svg.setAttribute('height', clockDiameter);
    svg.setAttribute('id', 'clockSVGElement');
    
    document.body.appendChild(svg);
    
    let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    svg.appendChild(g);
    
    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('fill', 'orange');
    circle.setAttribute('r', clockRadius);
    circle.setAttribute('cx', clockRadius);
    circle.setAttribute('cy', clockRadius);
    g.appendChild(circle);
    
    let centerX = clockRadius; // Центр круга по оси X
    let centerY = clockRadius; // Центр круга по оси Y

    let hoursDistance = clockRadius * 0.8; // Расстояние до объектов с числами часов

    // Создаём циферблат
    for (let hour = 1; hour <= 12; hour++){
        let hourElement = document.createElementNS('http://www.w3.org/2000/svg', "circle");
        
        const hourAngle = 360 / 12 * hour / 180 * Math.PI; // Угол каждого объекта с числом часов в радианах
        const hourDiameter = clockDiameter * 0.15;
        const hourRadius = hourDiameter / 2;
        const hourX = centerX + hoursDistance * Math.sin(hourAngle); // Центр круга с числом часов по оси X 
        const hourY = centerY - hoursDistance * Math.cos(hourAngle); // Центр круга с числом часов по оси Y 

        hourElement.setAttribute('fill', 'lightgreen');
        hourElement.setAttribute('r', hourRadius);
        hourElement.setAttribute('cx', hourX);
        hourElement.setAttribute('cy', hourY);
        
        let hourElementText = document.createElementNS('http://www.w3.org/2000/svg', "text");
        const hourElementTextX = hourX - hourElementText.offsetWidth / 2;
        hourElementText.setAttribute('text-anchor', 'middle');
        hourElementText.setAttribute('x', hourX);
        hourElementText.setAttribute('y', hourY);
        hourElementText.innerHTML = hour;
        
        g.appendChild(hourElement);
        
        g.appendChild(hourElementText);
    }

    // Создаём стрелки часов
    let minuteHandWidth = clockDiameter / 50; // Задаём ширину минутной стрелки, равной 1/50 от диаметра часов
    // Часовая стрелка
    let hourHand = document.createElementNS('http://www.w3.org/2000/svg', "line");
    hourHand.setAttribute('x1', centerX);
    hourHand.setAttribute('y1', centerY);
    hourHand.setAttribute('x2', centerX);
    hourHand.setAttribute('y2', centerY - clockRadius * 0.5); // длина часовой стрелки - половина радиуса часов
    hourHand.setAttribute('stroke', 'black');
    hourHand.setAttribute('stroke-width', minuteHandWidth * 2);
    hourHand.setAttribute('transform-origin', centerX + " " + centerY);
    hourHand.setAttribute('id', 'hourHand');
    g.appendChild(hourHand);

    // Минутная стрелка
    let minuteHand = document.createElementNS('http://www.w3.org/2000/svg', "line");
    minuteHand.setAttribute('x1', centerX);
    minuteHand.setAttribute('y1', centerY);
    minuteHand.setAttribute('x2', centerX);
    minuteHand.setAttribute('y2', centerY - clockRadius * 0.75); // длина часовой стрелки - половина радиуса часов
    minuteHand.setAttribute('stroke', 'black');
    minuteHand.setAttribute('stroke-width', minuteHandWidth);
    minuteHand.setAttribute('transform-origin', centerX + " " + centerY);
    minuteHand.setAttribute('id', 'minuteHand');
    g.appendChild(minuteHand);

    // Секундная стрелка
    let secondHand = document.createElementNS('http://www.w3.org/2000/svg', "line");
    secondHand.setAttribute('x1', centerX);
    secondHand.setAttribute('y1', centerY);
    secondHand.setAttribute('x2', centerX);
    secondHand.setAttribute('y2', centerY - clockRadius * 0.85); // длина часовой стрелки - половина радиуса часов
    secondHand.setAttribute('stroke', 'black');
    secondHand.setAttribute('stroke-width', minuteHandWidth * 0.5);
    secondHand.setAttribute('transform-origin', centerX + " " + centerY);
    secondHand.setAttribute('id', 'secondHand');
    g.appendChild(secondHand);

    // Создаём контейнер для числового отображения времени

    let currentTimeElementText = document.createElementNS('http://www.w3.org/2000/svg', "text");
    currentTimeElementText.setAttribute('text-anchor', 'middle');
    currentTimeElementText.setAttribute('x', centerX);
    currentTimeElementText.setAttribute('y', centerY - clockRadius / 2);
    currentTimeElementText.setAttribute('id', "currentTimeElementText");
    currentTimeElementText.innerHTML = "";
    g.appendChild(currentTimeElementText);

    updateClock();
}

function updateClock() {
    let currentTime = new Date();
    console.log(currentTime);

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const milliseconds = currentTime.getMilliseconds();

    // Обновляем числовое значение времени
    let currentTimeElementText = document.getElementById("currentTimeElementText");
    currentTimeElementText.innerHTML = hours + ":" + minutes + ":" + ("0" + seconds).slice(-2);
    // Обновляем координату Х для числового значения

    
    // Поворачиваем секундную стрелку
    let secondHand = document.getElementById("secondHand");
    // Каждую секунду секундная стрелка должна быть повернута на угол в 
    // (360 / 60 * секунды) градусов
    const degreesForSecond = 6 * seconds;
    secondHand.style.transform = "rotate(" + degreesForSecond + "deg)";

    // Поворачиваем минутную стрелку
    let minuteHand = document.getElementById("minuteHand");
    // Каждую секунду минутная стрелка должна быть повернута на угол в
    // (360 / 60 * минуты + (секунды / 60) * 360 / 60) градусов
    // (секунды / 60 * 360 / 60) - на сколько градусов секундная стрелка сдвигает минутуную каждую секунду
    const degreesForMinute = 6 * minutes + (seconds / 60) * 6;
    minuteHand.style.transform = "rotate(" + degreesForMinute + "deg)";

    // Поворачиваем часовую стрелку
    let hourHand = document.getElementById("hourHand");
    const degreesForHour = hours * 360 / 12 + (minutes * (30 / 60));
    // Каждую секунду часовая стрелка должна быть повернута на угол в
    // (часы * 360 / 12 + (минуты * (30 / 60))) градусов
    // (минуты / (60 / 30)) - на сколько градусов минутная стрелка сдвигает часовую в данный момент
    // 30 / 60 - на сколько градусов минутная стрелка сдвигает часовую каждую минуту
    hourHand.style.transform = "rotate(" + degreesForHour + "deg)";

    setTimeout(updateClock, 1000 - milliseconds);
}