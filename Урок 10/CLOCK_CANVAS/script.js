"use strict";
function createClock(){
    // Удаляем старые часы, если такие были
    let oldCanvas = document.getElementById("canvas");
    if (oldCanvas){
        document.body.removeChild(oldCanvas);
    }

    let clockDiameter = document.getElementById("clockDiameter").value; // Диаметр часов
    let clockRadius = clockDiameter / 2; // Радиус часов
    // Создаём новый canvas
    let canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = clockDiameter;
    canvas.height = clockDiameter;
    let context = canvas.getContext('2d');
    
    // Создаём новые часы
    
    context.strokeStyle = 'orange';
    context.fillStyle = 'orange';
    context.beginPath();
    context.arc(clockRadius, clockRadius, clockRadius, 0, Math.PI*2, true);
    context.stroke();
    context.fill();
    
    
    let centerX = clockRadius; // Центр круга по оси X
    let centerY = clockRadius; // Центр круга по оси Y

    let hoursDistance = clockRadius * 0.8; // Расстояние до объектов с числами часов

    // Создаём циферблат
    for (let hour = 1; hour <= 12; hour++){        
        const hourAngle = 360 / 12 * hour / 180 * Math.PI; // Угол каждого объекта с числом часов в радианах
        const hourDiameter = clockDiameter * 0.15;
        const hourRadius = hourDiameter / 2;
        const hourX = centerX + hoursDistance * Math.sin(hourAngle); // Центр круга с числов часов по оси X 
        const hourY = centerY - hoursDistance * Math.cos(hourAngle); // Центр круга с числов часов по оси Y 

        context.strokeStyle = 'lightgreen';
        context.fillStyle = 'lightgreen';
        context.beginPath();
        context.arc(hourX, hourY, hourRadius, 0, Math.PI*2, true);
        context.stroke();
        context.fill();
        
        context.fillStyle='black';
        context.font='italic bold 28px Arial';
        context.fillText(hour , hourX - hourRadius / 4, hourY + hourRadius / 4);
    }

    let currentTime = new Date();
    console.log(currentTime);

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const milliseconds = currentTime.getMilliseconds();

    // Создаём стрелки часов
    let minuteHandWidth = clockDiameter / 50; // Задаём ширину минутной стрелки, равной 1/50 от диаметра часов

    // Параметры секундной стрелки
    const secondDistance = clockRadius * 0.85; // Расстояние до объектов с числами секунд
    const secondAngle = 360 / 60 * seconds / 180 * Math.PI; // Угол каждого объекта с числом секунд в радианах
    const secondX = centerX + secondDistance * Math.sin(secondAngle); // Центр круга с числов секунд по оси X 
    const secondY = centerY - secondDistance * Math.cos(secondAngle); // Центр круга с числов секунд по оси Y 

    // Отрисовка секундной стрелки
    context.strokeStyle = 'black';
    context.lineWidth = minuteHandWidth * 0.5;
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(secondX, secondY);
    context.stroke();

    // Параметры минутной стрелки
    const minuteDistance = clockRadius * 0.75; // Расстояние до объектов с числами часов
    const minuteAngle = (360 / 60 * minutes + ((seconds / 60) * 6)) / 180 * Math.PI;
    const minuteX = centerX + minuteDistance * Math.sin(minuteAngle); // Центр круга с числов секунд по оси X 
    const minuteY = centerY - minuteDistance * Math.cos(minuteAngle); // Центр круга с числов секунд по оси Y 

    // Отрисовка минутной стрелки
    context.strokeStyle = 'black';
    context.lineWidth = minuteHandWidth;
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(minuteX, minuteY);
    context.stroke();

    // Параметры часовой стрелки
    const hourDistance = clockRadius * 0.5; // Расстояние до объектов с числами часов
    const hourAngle = (hours * 360 / 12 + (minutes * (30 / 60))) / 180 * Math.PI;
    const hourX = centerX + hourDistance * Math.sin(hourAngle); // Центр круга с числов секунд по оси X 
    const hourY = centerY - hourDistance * Math.cos(hourAngle); // Центр круга с числов секунд по оси Y 

    // Отрисовка часовой стрелки
    context.strokeStyle = 'black';
    context.lineWidth = minuteHandWidth * 2;
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(hourX, hourY);
    context.stroke();
    
    context.fillStyle='black';
    context.font='italic bold 28px Arial';
    context.fillText(hours + ":" + minutes + ":" + ("0" + seconds).slice(-2), centerX - clockRadius / 4, centerY - clockRadius / 3);

    document.body.appendChild(canvas);
    setTimeout(createClock, 1000 - milliseconds);
}