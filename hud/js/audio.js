    // создаем аудио контекст
    var context = new window.AudioContext(); //
    let pannerOptions = {
        pan: 0
    };
    let panner = new StereoPannerNode(context, pannerOptions);
    let gainNode = context.createGain();
    // переменные для буфера, источника и получателя
    var buffer = [],
        source, destination;

    // функция для подгрузки файла в буфер
    var loadSoundFile = function (url, type) {
        // делаем XMLHttpRequest (AJAX) на сервер
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer'; // важно
        xhr.onload = function (e) {
            // декодируем бинарный ответ
            context.decodeAudioData(this.response,
                function (decodedArrayBuffer) {
                    // получаем декодированный буфер
                    buffer[type] = decodedArrayBuffer;
                },
                function (e) {
                    console.log('Error decoding file', e);
                });
        };
        xhr.send();
    }

    // функция начала воспроизведения
    var play = function (type) {
        // создаем источник
        source = context.createBufferSource();
        // подключаем буфер к источнику
        console.log(JSON.stringify(buffer[type]))
        source.buffer = buffer[type];
        // дефолтный получатель звука
        destination = context.destination;
        // подключаем источник к получателю
        source.connect(panner).connect(gainNode).connect(destination);
        // воспроизводим
        source.start(0);
    }

    function pan(range, volume) {
        panner.pan.value = Math.sin(range * (Math.PI / 180))
        gainNode.gain.value = volume
    }

    // функция остановки воспроизведения
    var stop = function () {
        source.stop(0);
    }

    // Enemy_Deliver = 1
    // Deliver_Pick_Up = 0
    // win = -1
    // Friend_Deliver = -2
    // prison_alarm_01 = -3
    loadSoundFile('./audio/Deliver_Pick_Up.mp3', 0);
    loadSoundFile('./audio/Enemy_Deliver.mp3', 1);
    loadSoundFile('./audio/win.mp3', -1);
    loadSoundFile('./audio/Friend_Deliver.mp3', -2);
    loadSoundFile('./audio/prison_alarm_01.mp3', -3);