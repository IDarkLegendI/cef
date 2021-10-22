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
        // console.log(`pan: ${Math.sin(range * (Math.PI / 180)) }`) 
        // console.log(`pan: ${(range/+360) - +1}`)  
        panner.pan.value = +range
        // panner.pan.value = Math.sin(range * (Math.PI / 360)) 
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

    let audioCtx, panner2;

    function init(posX, posY, posZ) {

        audioCtx = new window.AudioContext();

        listener = audioCtx.listener;

        if (listener.positionX) {
            listener.positionX.value = posX;
            listener.positionY.value = posY;
            listener.positionZ.value = posZ - 5;
        } else {
            listener.setPosition(posX, posY, posZ - 5);
        }
 
        if (listener.forwardX) {
            listener.forwardX.value = 0;
            listener.forwardY.value = 0;
            listener.forwardZ.value = -1;
            listener.upX.value = 0;
            listener.upY.value = 1;
            listener.upZ.value = 0;
        } else {
            listener.setOrientation(0, 0, -1, 0, 1, 0);
        }

        const pannerModel = 'HRTF';

        const innerCone = 0;
        const outerCone = 180;
        const outerGain = 0.2;

        const distanceModel = 'linear';

        const maxDistance = 50;

        const refDistance = 1; 

        const rollOff = 10;

        const positionX = 0;
        const positionY = 0;
        const positionZ = 72;

        const orientationX = 0.0;
        const orientationY = 0.0;
        const orientationZ = -1.0;

        // let's use the class method for creating our panner node and pass in all those parameters we've set.

        panner2 = new PannerNode(audioCtx, {
            panningModel: pannerModel,
            distanceModel: distanceModel,
            positionX: positionX,
            positionY: positionY,
            positionZ: positionZ,
            orientationX: orientationX,
            orientationY: orientationY,
            orientationZ: orientationZ,
            refDistance: refDistance,
            maxDistance: maxDistance,
            rolloffFactor: rollOff,
            coneInnerAngle: innerCone,
            coneOuterAngle: outerCone,
            coneOuterGain: outerGain
        })
    }

    var play2 = function (type) {
        setTimeout(() => {
            console.log(`play2: ${type}`)
            // создаем источник
            source = audioCtx.createBufferSource();
            // подключаем буфер к источнику
            console.log(JSON.stringify(buffer[type]))
            source.buffer = buffer[type];
            // дефолтный получатель звука
            destination = audioCtx.destination;
            // подключаем источник к получателю 
            source.connect(panner2).connect(destination);
            // воспроизводим
            source.start(0);
        }, 1000)
    }

    alt.on("updatePlayerPosition", function (x, y, z, angle) {
        // console.log(`updatePlayerPosition: ${angle}`) 
        panner2.setPosition(x, y, z);
        panner2.setOrientation(Math.cos(angle), -Math.sin(angle), 1);
    });