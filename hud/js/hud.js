var hud = new Vue({
    el: '#body',
    data: {
        //observer
        obs: {
            show: false,
            nick: "1234213",
            level: '06',
            kills: '0',
            vip: 'deluxe'
        },

        visible: true,
        showWUP: false,
        textWUP: 'Поиск игрового мира...',
        pulseWUP: false,
        intervalWUP: null,
        
        showHUD: false, 
        showLogo: false,
        showLogoTimer: null,
        startPlayers: 0,
        killsHandle: null,
        killsBar: false,
        killsBarShow: false,

        //HUD
        alivePlayers: 0,
        kills: 0,
        ammo: [0, 0],
        time: 120,
        timeInterval: null,

        //KillFeed
        killFeed: [
            // "DOLBAEB KILL DOLBAEBA2 из M4A1",
            // "DOLBAEB KILL DOLBAEBA2 из M4A1",
        ],
        killFeedInterval: null, 
        killFeedHTML: null,

        //Lobby 
        lobby: {},
        
        help: 0,   
        keyMenu: 112,
        helpMainMenu: false,
        //Misc
        audio: null,
        avatars: {
            "A": "0",
            "B": "1",
            "C": "2",
            "D": "3", 
            "E": "4",
            "F": "5",
            "G": "6",
            "H": "7",
            "I": "8",
            "J": "9",
            "K": "10",
            "L": "11",
            "M": "12",
            "N": "13", 
            "O": "14",
            "P": "15",
            "Q": "16",
            "R": "17",
            "S": "18",
            "T": "19",
            "U": "20",
            "V": "21",
            "W": "22",
            "X": "23",
            "Y": "24",
            "Z": "25"
        },
        keyCodes: {
            3: 'break',
            8: 'backspace',
            9: 'tab',
            12: 'clear',
            13: 'enter',
            16: 'shift',
            17: 'ctrl',
            18: 'alt',
            19: 'pause',
            20: 'caps lock',
            21: 'hangul',
            25: 'hanja',
            // 27: 'escape',
            28: 'conversion',
            29: 'non-conversion',
            32: 'spacebar',
            33: 'page up',
            34: 'page down',
            35: 'end',
            36: 'home',
            37: 'left arrow',
            38: 'up arrow',
            39: 'right arrow',
            40: 'down arrow',
            41: 'select',
            42: 'print',
            43: 'execute',
            44: 'PS',
            45: 'insert',
            46: 'delete',
            47: 'help',
            48: '0',
            49: '1',
            50: '2',
            51: '3',
            52: '4',
            53: '5',
            54: '6',
            55: '7',
            56: '8',
            57: '9',
            58: ':',
            59: 'semicolon',
            60: '<',
            61: 'equals',
            63: 'ß',
            64: '@ ',
            65: 'a',
            66: 'b',
            67: 'c',
            68: 'd',
            69: 'e',
            70: 'f',
            71: 'g',
            72: 'h',
            73: 'i',
            74: 'j',
            75: 'k',
            76: 'l',
            77: 'm',
            78: 'n',
            79: 'o',
            80: 'p',
            81: 'q',
            82: 'r',
            83: 's',
            84: 't',
            85: 'u',
            86: 'v',
            87: 'w',
            88: 'x',
            89: 'y',
            90: 'z',
            91: 'Win Key',
            92: 'r. Win Key',
            93: 'Win Menu',
            95: 'sleep',
            96: 'n. 0',
            97: 'n. 1',
            98: 'n. 2',
            99: 'n. 3',
            100: 'n. 4',
            101: 'n. 5',
            102: 'n. 6',
            103: 'n. 7',
            104: 'n. 8',
            105: 'n. 9',
            106: 'multiply',
            107: 'add',
            108: 'n. period',
            109: 'subtract',
            110: 'decimal point',
            111: 'divide',
            112: 'f1',
            113: 'f2',
            114: 'f3',
            115: 'f4',
            116: 'f5',
            117: 'f6',
            118: 'f7',
            119: 'f8',
            120: 'f9',
            121: 'f10',
            122: 'f11',
            123: 'f12',
            124: 'f13',
            125: 'f14',
            126: 'f15',
            127: 'f16',
            128: 'f17',
            129: 'f18',
            130: 'f19',
            131: 'f20',
            132: 'f21',
            133: 'f22',
            134: 'f23',
            135: 'f24',
            136: 'f25',
            137: 'f26',
            138: 'f27',
            139: 'f28',
            140: 'f29',
            141: 'f30',
            142: 'f31',
            143: 'f32',
            144: 'num lock',
            145: 'scroll lock',
            151: 'airplane mode',
            160: '^',
            161: '!',
            162: '؛',
            163: '#',
            164: '$',
            165: 'ù',
            166: 'page backward',
            167: 'page forward',
            168: 'refresh',
            169: 'closing paren',
            170: '*',
            171: '~ + * key',
            172: 'home key',
            173: 'minus',
            174: 'decrease ',
            175: 'increase',
            176: 'next',
            177: 'previous',
            178: 'stop',
            179: 'play/pause',
            180: 'e-mail',
        },
        lang: 'en',
        i18n: {
            kill: {
                ru: 'УБИЙСТВО',
                en: 'KILL'
            },
            kills: {
                ru: 'УБИЙСТВА',
                en: 'KILLS'
            },
            kill2: {
                ru: 'УБИЙСТВ', 
                en: 'KILLS'
            },
            ukilled: {
                ru: 'ВЫ УБИЛИ ИГРОКА', 
                en: 'YOU KILLED THE PLAYER'
            },
            distance: {
                ru: 'С РАССТОЯНИЯ В', 
                en: 'FROM A DISTANCE OF IN'
            },
            meters: {
                ru: 'МЕТРОВ', 
                en: 'METERS'
            },
            exit: {
                ru: 'выход', 
                en: 'exit'
            },
            menu: {
                ru: 'меню', 
                en: 'menu'
            },
            enemy: {
                ru: 'ВРАГ', 
                en: 'ENEMY'
            },
            enemies: {
                ru: 'ВРАГОВ', 
                en: 'ENEMIES'
            },
            player: {
                ru: 'ИГРОК', 
                en: 'PLAYER'
            },
            players: {
                ru: 'ИГРОКОВ', 
                en: 'PLAYERS'
            },
            management: {
                ru: 'управление', 
                en: 'management'
            },
        },
        getText(name)
        {
            return this.i18n[name][this.lang]
        }
    }, 
    methods: {
        fGetColor(value)
        {
            if(value < +30) return 'red'
            else if(value < +60) return 'orange'
            else return 'green'
        },
        fUpdateKills(name, dist, kills = 1)
        {
            this.kills += kills;
            if(kills === -1) return
            this.killsBar = [name, dist];
            if(this.killsHandle !== null) clearTimeout(this.killsHandle);

            this.killsBarShow = true;
            this.killsHandle = setTimeout(() => { 
                this.killsBarShow = false;
                this.killsHandle = null;
            }, 9000);  
        }, 
        fupdateWarmUP(text, pulse, time = 1500)
        {
            if(hud.intervalWUP != null) clearTimeout(hud.intervalWUP); 
            hud.showWUP = true;
            hud.textWUP = text; 
            hud.pulseWUP = pulse; 

            hud.intervalWUP = setTimeout(() => { 
                hud.showWUP = false;
                hud.intervalWUP = null;  
            }, time); 
        },
        fTimeDisplay()
        {
            let minute = Math.floor((this.time / 60));
            let second = this.time - (minute * 60);
            return `${minute}:${second < 10 ? '0' : ''}${second}`; 
        },
        fTimeUpdate(time)
        {
            if(this.timeInterval != null) clearInterval(this.timeInterval);
            this.time = time;
            this.timeInterval = setInterval(() => {
                if(this.time <= 0) return clearInterval(this.timeInterval); 
                this.time -= 1; 
            }, 1000); 
        },
        fKillFeedUpdate(obj)
        {  
            if(this.killFeed[2]) 
            {
                console.log(`${this.killFeed[2]}; ${this.killFeed.splice(0, 1)}`)
                return setTimeout(() => this.fKillFeedUpdate(obj), 0) 
            }
            obj.iKey = Date.now()
            this.killFeed.push(obj);
            let htmlEl = document.getElementById('killfeed'); 
            if(htmlEl == null) return;
             
            htmlEl.style.opacity = 1;    

            if(this.killFeedInterval != null) clearInterval(this.killFeedInterval); 
            this.killFeedInterval = setInterval(() => {
                if(htmlEl.style.opacity <= 0.3) 
                {
                    this.killFeed.splice(0, this.killFeed.length)
                }
                if(htmlEl.style.opacity <= 0.2) 
                {  
                    htmlEl.style.opacity = 0;
                    clearInterval(this.killFeedInterval);
                    this.killFeedInterval = null;
                    this.killFeed = [];
                }
                htmlEl.style.opacity = htmlEl.style.opacity - 0.02; 
                // //console.log(htmlEl.style.opacity)
            }, 500);    
        },
        fPlayAudio(name, volume = 0.1) 
        {
            if(this.audio !== null) this.audio.pause();
            this.audio = new Audio(`./audio/${name}.mp3`);

            this.audio.volume = volume;   
            this.audio.play();  
        },
        getLevel: function(elo = 0) {
            if(elo < 800) return '01';
            else if(elo < 950) return '02';
            else if(elo < 1100) return '03';
            else if(elo < 1250) return '04';
            else if(elo < 1400) return '05';
            else if(elo < 1550) return '06';
            else if(elo < 1700) return '07';
            else if(elo < 1850) return '08';
            else if(elo < 2000) return '09';
            else return '10'; 
         }, 
        getAvatar(nick)
        {
            if(nick) 
            {
                return this.avatars[nick[0].toUpperCase()]
            }
            else return this.avatars['A']
        },
        rgbToHex(red, green, blue)
        {
            return '#' + 
            ("0" + (red).toString(16)).slice(-2) + 
            ("0" + (green).toString(16)).slice(-2) +
            ("0" + (blue).toString(16)).slice(-2);
        },
        //Изменяет необходимые аргументы. Входные данные: ['nameVar', value], ...
        changeVar(...args) 
        { 
            // //console.log(`changeVar: ${JSON.stringify(...args)}`)
            args.forEach(el => { 
                // //console.log(`changeVar(0): ${JSON.stringify(el)}`) 
                // //console.log(`changeVar(1): hud.${el[0]} = ${el[1]}`) 
                hud[el[0]] = el[1]; 
                // //console.log(`changeVar: ${hud[el[0]]}`)  
            })  
        },
        useFunction(name, ...args) {
            return hud[name](...args);
        },
    },
})

if ('alt' in window) {
    alt.on('customNotify', (notifyType, text, time, pos = 9) => {
        notify(notifyType, pos, text, time);
        // //console.log(`${notifyType}, 9, ${text}, ${time}`);
    });

    alt.on('toggleHud', (toggle, players = -1) => {
        hud.showHUD = toggle;

        hud.kills = 0;
        hud.killsBar = false;
        hud.killsBarShow = false;
        if(this.killsHandle != null) clearTimeout(this.killsHandle);
        
        if(players != -1) hud.startPlayers = players; 
        hud.killFeed = [];
        if(hud.killFeedInterval != null) clearInterval(hud.killFeedInterval);
    });

    alt.on('updateAlive', count => { 
        hud.alivePlayers = count; 
    }) 
    // alt.on('giveKill', hud.fUpdateKills)

    alt.on('toggleLoad', (toggle, duration) => 
    { 
        console.log(`toggleLoad: ${toggle}; duration: ${duration}; hud.showLogoTimer: ${hud.showLogoTimer}`)
        hud.showLogo = toggle
        if(hud.showLogoTimer !== null)
        {
            clearTimeout(hud.showLogoTimer);
            hud.showLogoTimer = null;
        } 
        if(duration !== null) setTimeout(() => {
            hud.showLogo = !toggle 
        }, duration)
    })
 
    alt.on('updateAmmo', (clip, ammo) => hud.ammo = [clip, ammo])
    alt.on('updateWarmUP', hud.fupdateWarmUP)  

    alt.on('obServer', data => 
    { 
        hud.obs = data;  
        hud.obs.level = hud.getLevel(data.level) 
    })

    alt.on('fTimeUpdate', hud.fTimeUpdate) 
    alt.on('updateKillFeed', hud.fKillFeedUpdate)   

    alt.on('updateHelp', toggle =>
    {
        hud.help = toggle
    })    
    alt.on('visible', toggle => hud.visible = toggle)    

    alt.on('fPlayAudio',(name, volume) => hud.fPlayAudio(name, volume))       
    alt.on('changeVar', (...args) => hud.changeVar(...args)) 
    alt.on('useFunction', (...args) => hud.useFunction(...args))  
    alt.on('testHud', (...args) => {
        hud.showHUD = true; 
        setTimeout(() => hud.fKillFeedUpdate({victimName: 'Danila', weaponName: '2', killerName: 'DarkLegend'}), 0)
        setTimeout(() => hud.fKillFeedUpdate({victimName: 'Gruzd', weaponName: 'Hatchet', killerName: 'DarkLegend'}), 0)
        setTimeout(() => hud.fKillFeedUpdate({victimName: 'DanilaImtortal', weaponName: 'Heavy Sniper', killerName: 'DarkLegend'}), 0) 
    })  
}  
else  
{ 
    hud.obs.show = false;
    hud.obs.nick = 'DarkLegend'
    hud.showHUD = true; 
    // hud.showLogo = true;
    hud.help = 2;
    // hud.keyMenu = 66
    // hud.showLogo = true; 
    // hud.fUpdateKills("OBLIKO", 100)
    // setTimeout(() => hud.fKillFeedUpdate("DOLBAEB KILL DOLBAEBA2 из M4A11"), 1000)
    // setTimeout(() => hud.fKillFeedUpdate("DOLBAEB KILL DOLBAEBA2 из M4A12"), 2000)
    // setTimeout(() => hud.fKillFeedUpdate("DOLBAEB KILL DOLBAEBA2 из M4A13"), 3000) 
    let index = 0;
    hud.kills = 1;
    hud.lobby = {0: {name: 'DanilaImortal', color: '#00FF00', hp: 99, armour: 100, mic: false}, 1: {name: 'DarkLegend', color: '#FF0000', hp: -1, mic: true}}
    // setInterval(() => {
    //     // hud.fUpdateKills("OBLIKO", 45)
    //     // hud.fupdateWarmUP('123333333333333', true) 
    //     hud.fKillFeedUpdate(`DOLBAEB KILL DOLBAEBA2 из M4A1-${index++}`) 
    // }, 5000) 
    // setInterval(() => hud.fupdateWarmUP('123333333333333', true), 1500)  
    setTimeout(() => hud.fKillFeedUpdate({victimName: 'Danila', weaponName: '2', killerName: 'DarkLegend'}), 0)
    setTimeout(() => hud.fKillFeedUpdate({victimName: 'Gruzd', weaponName: 'Hatchet', killerName: 'DarkLegend'}), 0)
    setTimeout(() => hud.fKillFeedUpdate({victimName: 'DanilaImtortal', weaponName: "Carbine Rifle", killerName: 'DarkLegend'}), 0)
    // Vue.set(hud, killFeed, [...hud.killFeed, {victimName: 'Danila', weaponName: '2', killerName: 'DarkLegend', iKey: 1}])
}