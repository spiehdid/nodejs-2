const EventEmitter = require("events"),
//вход несколько аргументов: дату и время в формате час-день-месяц-год:
timers = process.argv.slice(2),
eventEmitter = new EventEmitter(),
handler = (payload) => {
    console.log(payload);
  };
eventEmitter.on("timers", handler);
eventEmitter.emit("timers", "Date now: "+new Date());

for (i= 0; i < timers.length; i++) {
    const dateStop_i = new Date(timers[i][9]+timers[i][10]+timers[i][11]+timers[i][12]+"-"+timers[i][6]+timers[i][7]+"-"+timers[i][3]+timers[i][4]+"T"+timers[i][0]+timers[i][1]+":00:00");
    eventEmitter.emit("timers", "Timer "+(i+1)+": "+dateStop_i);
    
    const timer_index = setInterval(function () {
        if (isNaN(dateStop_i)){
            // Выключаем интервал
            clearInterval(timer_index);
            // Выводим сообщение об окончание
            eventEmitter.emit("timers", "Timer: Invalid");
        } else {
            // Получение времени сейчас
            let now = new Date();
            // Получение заданного времени
            let date = dateStop_i;
            // Вычисление разницы времени 
            let ms_left = (date - now);
            // Если разница времени меньше или равна нулю 
            if (ms_left <= 0) { // То
                // Выключаем интервал
                clearInterval(timer_index);
                // Выводим сообщение об окончание
                eventEmitter.emit("timers", "Timer: Stop");
            } else { // Иначе
                // Получаем время зависимую от разницы
                let res = new Date(ms_left);
                // Делаем строку для вывода
                let str_timer = `Years: ${res.getUTCFullYear() - 1970}, Month: ${res.getUTCMonth()}, Day: ${res.getUTCDate() - 1}, Hours: ${res.getUTCHours()}, Minutes: ${res.getUTCMinutes()}, Seconds: ${res.getUTCSeconds()} to stoped.`;
                // Выводим время
                eventEmitter.emit("timers", "Timer ("+dateStop_i+"): "+str_timer);
            }
        }
    }, 1000);
};