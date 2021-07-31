let menu = new Vue({
    el: '#body',
    data: {
        show: false,
        page: 0, //НЕ МЕНЯЙ ТУТ НИХУЯ, ИДИ ВНИЗ СТРАНИЦЫ
        subPage: 0, //
        nextSubPage: -1,
        lastPage: 0, 
        cursorWhile: null,
        fCursoring: undefined,
        fToggleCursor: undefined,

        //money
        money: 0,

        //SETTINGS
        lang: 'ru',
        vr: false, //true, чтобы вр подрубить,
        disableCursor: false, 
        autoLogin: false, 
        sizeMap: 0,
        quickWeapon: 0,
        volume: 0.1,
        keyMapSize: 90,
        keyQuickMarker: 88,
        keySitDown: 17,
        keyFingerPointing: 66,
        keyMenu: 112,

        //Block Game 
        textMatch: 'В поиске',
        countWarmUp: 0,
        statusGame: false,

        //Lobby
        lobby: [{
            name: "Player",
            ava: 1,
            ready: -2
        }],
        /* -2 = без лобби, -1 = капитан, 0 = не готов, 1 = готов */
        myName: "DARKLEGEND",
        myAvatar: "",
        myID: 0,
        lobbyID: 0,
        myData: null,

        //Friend menu
        // friends: ['DarkLegend', 'Res1ce', 'Obliko', 'Vanya', '123', 'D2arkLegend', 'Res21ce', 'Obliko2', 'Van2ya', '1223', '12', '23', '33', '444', '55', '66'],
        friends: [],
        requestsIn: [],
        requestsOut: [],
        allPlayers: [],

        //Ranks
        elo: 2000,
        kills: 0,
        matches: 0,
        lastMatch: 25,
        wins: 0,
        hours: 0,
        level: '01',

        //Cars 
        minSort: 0,
        maxSort: 1000000,
        maxSpeed: 180,
        onlyMyCars: false,
        cars: [{ name: 'None', model: 'none', price: 0, s100: '0', s200: '0' },
        { name: 'Lamborghini Performante 18', model: '18performante', price: 265000, s100: '3.7', s200: '0' },
        { name: 'T-20', model: 't20', price: 270000, s100: '3.7', s200: '0' },
        { name: 'Pfister-811', model: 'pfister811', price: 135000, s100: '3.9', s200: '0' },
        { name: 'Dubsta 6x6', model: 'dubsta3', price: 66000, s100: '7.2', s200: '0' },
        { name: 'Lamborghini Urus', model: 'urus', price: 178000, s100: '3.9', s200: '0' },
        { name: 'Porsche Taycan', model: 'taycan', price: 275000, s100: '2.6', s200: '0' },
        { name: 'Tesla Model X', model: 'teslax', price: 280000, s100: '2.9', s200: '6.0' },
        { name: 'Bentley Bentayga', model: 'bentayga17', price: 145000, s100: '4.1', s200: '14.0' },
        { name: 'RHAPSODY', model: 'rhapsody', price: 10000, s100: '9.8', s200: '0' },
        { name: 'PRIMO', model: 'PRIMO', price: 12300, s100: '9.8', s200: '0' },
        /*{name: 'ISSI', model: 'issi6', price: 26500, s100: '6.3', s200: '0'},*/
        { name: 'OCELOT', model: 'f620', price: 23600, s100: '6.2', s200: '0' },
        { name: 'EXEMPLAR', model: 'exemplar', price: 23650, s100: '7.3', s200: '0' },
        { name: 'COGCABRIO', model: 'cogcabrio', price: 24500, s100: '9.8', s200: '0' },
        { name: 'SENTINEL', model: 'felon2', price: 22200, s100: '7.7', s200: '0' },
        { name: 'FBI', model: 'fbi', price: 25500, s100: '8.3', s200: '0'},
        { name: 'COQUETTE star', model: 'coquette3', price: 17950, s100: '10.3', s200: '0' },
        { name: 'DOMINATOR', model: 'dominator3', price: 26000, s100: '7.3', s200: '0' },
        { name: 'HERMES', model: 'hermes', price: 14000, s100: '11.1', s200: '0' },
        { name: 'DUBSTA', model: 'dubsta2', price: 26000, s100: '12.5', s200: '0' },
        { name: 'BANSHEE', model: 'banshee', price: 61500, s100: '5.8', s200: '0' },
        { name: 'Nissan GT-R', model: '17r35', price: 63500, s100: '5.3', s200: '0' },
        { name: 'COQUETTE', model: 'coquette4', price: 84500, s100: '5.7', s200: '0' },
        { name: 'DEVESTE', model: 'deveste', price: 170000, s100: '8.0', s200: '0' },
        { name: 'ELEGY', model: 'elegy2', price: 30050, s100: '5.6', s200: '0' },
        { name: 'HOTRING', model: 'hotring', price: 28500, s100: '5.4', s200: '0' },
        { name: 'ITALI', model: 'italigto', price: 130000, s100: '3.4', s200: '0' },
        { name: 'NEON', model: 'neon', price: 240000, s100: '2.8', s200: '0' },
        { name: 'NINEF', model: 'ninef2', price: 100500, s100: '5.5', s200: '0' },
        /*{name: 'OMNIS', model: 'omnis', price: 30000, s100: '5.1', s200: '0'},*/
        { name: 'SCHLAGEN', model: 'schlagen', price: 125500, s100: '4.4', s200: '0' },
        /*{name: 'SENTINEL', model: 'sentinel3', price: 23000, s100: '9.4', s200: '0'},*/
        { name: 'SPECTER', model: 'specter2', price: 91200, s100: '8.0', s200: '0' },
        { name: 'VERLIERER', model: 'verlierer2', price: 91200, s100: '5.0', s200: '0' },
        { name: 'SAVESTRA', model: 'savestra', price: 19500, s100: '9.9', s200: '0' },
        { name: 'SWINGER', model: 'swinger', price: 100000, s100: '5.3', s200: '0' },
        { name: 'TURISMO', model: 'turismo2', price: 130000, s100: '4.9', s200: '0' },
        { name: 'ADDER', model: 'adder', price: 190000, s100: '5.0', s200: '0' },
        { name: 'CYCLONE', model: 'cyclone', price: 210000, s100: '5.3', s200: '0' },
        { name: 'ENTITYXF', model: 'entityxf', price: 200000, s100: '6.3', s200: '0' },
        { name: 'FMJ', model: 'fmj', price: 190000, s100: '4.5', s200: '0' },
        { name: 'ITALIGTD', model: 'italigtb2', price: 245000, s100: '4.1', s200: '0' },
        { name: 'NERO', model: 'nero2', price: 255000, s100: '4.8', s200: '0' },
        { name: 'REAPER', model: 'reaper', price: 260000, s100: '8.2', s200: '0' },
        { name: 'TEMPESTA', model: 'tempesta', price: 262000, s100: '7.3', s200: '0' },
        { name: 'SHEAVA', model: 'sheava', price: 135000, s100: '4.9', s200: '0' },
        { name: 'TYRUS', model: 'tyrus', price: 235000, s100: '4.2', s200: '0' },
        { name: 'XA-21', model: 'xa21', price: 270000, s100: '3.8', s200: '0' },
        { name: 'TROPHYTRUCK', model: 'trophytruck', price: 70000, s100: '4.6', s200: '0' },
        { name: 'ZENTORNO', model: 'zentorno', price: 220000, s100: '3.9', s200: '0' },
        { name: 'SHOTARO', model: 'shotaro', price: 230000, s100: '3.8', s200: '0' },
        { name: 'SANCTUS', model: 'sanctus', price: 44000, s100: '5.4', s200: '0' },
        { name: 'VORTEX', model: 'vortex', price: 42000, s100: '4.0', s200: '0' },
        { name: 'ENDURO', model: 'enduro', price: 29000, s100: '5.6', s200: '0' },
        { name: 'BATI', model: 'bati', price: 42100, s100: '5.0', s200: '0' },
        { name: 'Tesla S', model: 'teslapd', price: 200000, s100: '3.7', s200: '0' },
        { name: 'Porsche Panamera', model: 'panamera17turbo', price: 300000, s100: '2.3', s200: '4.1' },
        { name: 'BMW M5', model: 'bmci', price: 200000, s100: '3.9', s200: '11.2' },
        { name: 'AUDI RS7', model: 'rs7c8', price: 285000,  s100: '3.9', s200: '11.2'},
        { name: 'PORSCHE 911R', model: '911r', price: 270000, s100: '3.9', s200: '11.2'},
        { name: 'F12 TDF', model: 'tdf', price: 240000,  s100: '3.9', s200: '11.2'},
        { name: 'Ford F-150 Raptor', model: '19raptor', price: 155200,  s100: '3.9', s200: '11.2'}, 
        { name: 'LADA NIVA', model: 'urban', price: 20000,  s100: '3.9', s200: '11.2'},  
        { name: 'Toyota 4Runner', model: '4runner', price: 39900,  s100: '3.9', s200: '11.2'},
        { name: 'GAUNTLET', model: 'GAUNTLET', price: 39900,  s100: '0', s200: '0'},
        { name: 'PARAGON', model: 'paragon', price: 62000,  s100: '0', s200: '0'},
        { name: 'KHAMELION', model: 'khamelion', price: 81500,  s100: '0', s200: '0'},
        { name: 'YOSEMITE', model: 'yosemite3', price: 27500, s100: '0', s200: '0'},
        { name: 'brawler', model: 'brawler', price: 55600, s100: '0', s200: '0'},
        { name: 'JUGULAR', model: 'jugular', price: 95000,  s100: '0', s200: '0'},].sort((a, b) => a.price - b.price), 
        carsPointer: 0,
        myCar: 'none',
        camRotation: -90,
        oldColor: [0, 0, 0, 'none'],
        updateTuning: false,

        //Admin
        adminLevel: 0,
        adminType: 0,
        adminAny: 0,
        adminAny2: 0,
        adminCurrentReport: 0,
        adminBell: false,

        //Bell
        bell: null,
        hoverBell: false,

        //Misc
        miscInput: '',
        coolDown: false,
        superCoolDown: false,

        //Shop
        moneyRM: 0,
        converterRM: 0,
        converterD: 0,
        assortPriv: {
            vip: {
                name: 'VIP',
                k: 5,
                bonus: 1.3,
            },
            premium: {
                name: 'PREMIUM',
                k: 10,
                bonus: 1.5,
            },
            deluxe: {
                name: 'DELUXE',
                k: 16.65,
                bonus: 1.7,
            }, 
        },
        assortSelected: 'vip',
        assortDays: '30',
        //Manage VIP
        gait: {
            name: 'Normal',
            vipLevel: 0
        },

        //EndGame
        wsWin: false,
        phrase: '«Я требую продолжения банкета!»',
        killsInMatch: 0,
        // elo: 0, 
        place: 0,
        placeAll: 0,
        plusMoney: 0,
        bonusMoney: 0,
        lifeTime: 0, //Минут

        //VIP
        vip: 'none',
        vipLevel: 2,
        myEndTime: Date.now() + 40000,

        //Report
        reportType: -1,
        reportReason: -1,
        reportInput: '',
        reportPlayers: [],

        //Misc
        anyVar: null,
        anyVarSecond: null,
        anyVarС: null,

        //i18n
        i18n: {
            // balance: 'Balance', 
            balance: 'BALANCE',
            personal: 'PRIVATE',
            managerCars: 'Manage your cars',
            transport: 'TRANSPORT',
            ready: 'READY',
            notready: 'NOT READY',
            inGame: 'IN GAME',
            topap: 'TOP UP YOUR BALANCE',
            managmentSub: 'REPORT SYSTEM',
            control: 'MANAGE',
            start: 'START',
            game: 'GAME',
            status: 'Status',
            expectation: 'Players waiting',
            stop: 'STOP',
            clickready: 'Click for ready',
            clicknotready: 'Click if not ready',
            settings: 'SETTINGS',
            pack: 'STORE',
            noob: 'PRIVILEGE',
            left: 'left until the end of the discount',
            time: '13 hours',
            license: 'LICENSE',
            rank: 'RANK',
            backmatch: 'For the previous match',
            score: 'SCORE',
            wins: 'WINS',
            hours: 'PLAYED HOURS',
            hours2: 'HOURS',
            awards: 'AWARDS',
            gifts: 'Get gifts',
            person: 'THE CHARACTER',
            custom: 'PERSONALIZATION',
            friends: 'FRIENDS',
            clothing: 'CLOTHES',
            invite: 'Invite to team',
            controlFriends: 'MANAGEMENT',
            requestsIn: 'INCOMING REQUESTS',
            requestsOut: 'OUTGOING REQUESTS',
            add: 'ADD',
            addFriend: 'ADD FRIEND',
            tips: 'TIPS',
            sit: 'SIT',
            keyMenu: 'MENU',
            keyFingerPointing: 'POINT YOUR FINGER',
            menuMode: 'MODE IN MENU',
            sizeMap: 'SIZE MAP',
            small: 'SMALL',
            normal: 'NORMAL',
            big: 'BIG',
            disableCursor: 'DISABLING A CUSTOM CURSOR',
            autoLogin: 'AUTOMATIC LOGIN TO THE SERVER',
            btnBack: 'BACK',
            leavelobby: 'LEAVY LOBBY',
            buy: 'BUY',
            select: 'SELECT',
            selected: 'SELECTED',
            none: 'NOT SELECTED',
            none2: 'NOT SELECTED',
            inviteToLobby: 'INVITATION TO THE LOBBY',
            accept: 'ACCEPT',
            cancel: 'DENY',
            quickWeaponT: 'TAKE THE SELECTED WEAPON IN HAND',
            infoStopGame: 'When you finish the game, you will leave the lobby',
            applyColor: 'APPLY COLOR',
            applyTuning: 'APPLY TUNING',
            inviteText: 'INVITE',
            win: "WIN",
            lose: "LOSE",
            place: "PLACE",
            kills: "KILLS",
            playingTime: "PLAYING TIME",
            minutes: "MINUTES",
            exitToMenu: "EXIT TO THE MENU",
            iAgree: "I AGREE",
            language: "LANGUAGE",
            volume: "VOLUME",
            quickMarker: "QUICK MARKER",
            mapSize: "QUICK MAP SIZE CHANGE",
            acceptAction: "CONFIRM THE ACTION",
            connectPrivileges: "CONNECT PRIVILEGES",
            pricePrivileges: "COST",
            timeActions: "VALIDITY TIME",
            agreeOffer: "You agree to all the terms and conditions of the offer",
            days: "DAYS",
            sortByPrice: "SORT BY PRICE",
            minValue: "MINIMUM",
            maxValue: "MAXIMUM",
            infoSort: "TO SEE YOUR CARS SET THE MINIMUM PRICE TO ZERO",
            onlyMyCars: "ONLY MY CARS",
            privileges: "MANAGING A PRIVILEGE",
            gait: "GAIT",
            actions: "ACTIONS",
            delFriend: "REMOVE FROM FRIENDS",
            bonus: "BONUS",
            moreMoneyEndGame: "MORE MONEY AT THE END OF THE GAME",
            na: "ON",
            endPriv: "UNTIL THE END OF THE SUBSCRIPTION", 
            comingSoon: "THIS SECTION WILL BE AVAILABLE SOON!",
            level: "LEVEL",
            tuning: "TUNING OF PERSONAL TRANSPORT", 
            second: "SECONDS",
            reloadQuickMarker: "RELOADING THE QUICK MARK FOR",
            cashBackVIP: "FOR SELLING OLD CLOTHES",
            componentsVIP: "INCREASED CHANCE OF DROPPING MODIFICATIONS FOR HEAVY SNIPER BY",
            armourVIP: "ARMOR AT THE BEGINNING OF THE MATCH",
            bell: "NOTIFICATIONS",
            question: "QUESTION",
            complaint: "COMPLAINT",
            suggestion: "SUGGESTION",
            cheats: "THIRD-PARTY SOFTWARE", 
            useBugs: "USING BUGS",
            insult: "INSULT",
            intruderID: "SPECIFY THE ID OF THE VIOLATOR",
            questionInput: "DESCRIBE YOUR QUESTION", 
            improvementInput: "DESCRIBE YOUR PROPOSAL",
            send: "SEND",
            discord: "OUR DISCORD",
            clearAll: "CLEAR ALL",
            victimLP: "WAS KILLED BY YOU",
            killerLP: "KILLED YOU",
            obsLP: "YOU WATCHED HIM",
            notAvailable: "This section is not available to you",
            changePassword: "CHANGE PASSWORD",
            currentPassword: "YOUR CURRENT PASSWORD",
            newPassword: "YOUR NEW PASSWORD",
            newPassword2: "REPEAT YOUR NEW PASSWORD",
            apply: "APPLY",
            newPassDontMatch: "The new passwords don't match",
            newPassDontValid: "The password contains forbidden characters. Use A-Z and numbers",
            newPassTooLong: "The new password is too long. The password must be up to 20 characters",
            newPassTooShort: "The new password is too short.",
            newPassSameCurrent: "The new password must be different from the old one",
            changedPassword: "The password was successfully changed!",
            sellCar: "TO SELL",
            toSellCar: "CAR SALES",
            cashBackCAR: "FOR THE SALE OF CARS",
            upTo: "UP TO",
            stopFlood: "Stop flooding!",
            notValid: "You are using forbidden characters. Remove them, and try again",
        },
        i18nTemp: null,
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
        recordKey: false,
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
            // 89: 'y', 
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
        jetPackSkins: {
            'vip': [0, 36, 35, 34, 33, 32, 28, 27, 25, 23, 22, 20, 19, 16, 14],
            'premium': [37, 31, 29, 24, 21, 17, 15, 9, 8, 7, 6, 5, 3],
            'deluxe': [40, 39, 38, 30, 26, 2, 21, 37, 1, 4, 11, 12, 10] 
        }
    },
    methods: {
        emitServer: function (eventName, ...args) {
            //console.log(...args)
            if ('alt' in window) alt.emit('emitToServer', eventName, ...args)
        },
        emitToServerWithWT: function (wt = 250, eventName, ...args) {
            // //console.log(...args)
            if ('alt' in window) alt.emit('emitToServerWithWT', wt, eventName, ...args)
        },
        waitEmitToServer: function (variable, valueTrue, valueFalse, ...args) {
            // //console.log(...args)
            if ('alt' in window) alt.emit('waitEmitToServer', variable, valueTrue, valueFalse, ...args)
        },
        callBackEmitToServer: function (variable, value) {
            if (variable === 'carsPointer') {
                this.cars[this.carsPointer].color = {
                    r: this.oldColor[0],
                    g: this.oldColor[1],
                    b: this.oldColor[2]  
                }
                menu[variable] = value;
                //console.log(`callBackEmitToServer: ${this.cars[this.carsPointer].model}; ${this.oldColor[3]} --> ${this.cars[this.carsPointer].model !== this.oldColor[3]}`)
                if (this.cars[this.carsPointer].model !== this.oldColor[3]) {
                    menu.oldColor = [this.cars[this.carsPointer].color.r, this.cars[this.carsPointer].color.g, this.cars[this.carsPointer].color.b,
                        this.cars[this.carsPointer].model
                    ];
                    this.updateTuning = false;
                }
                // //console.log(`callBackEmitToServer: ${JSON.stringify(this.oldColor)}; model: ${this.cars[this.carsPointer].model}; this.updateTuning: ${this.updateTuning}`)
                menu.initColor();
                setTimeout(() => {
                    if(menu.initColor()) colorToPos('rgb ' + this.cars[this.carsPointer].color.r + ' ' + this.cars[this.carsPointer].color.g + ' ' + this.cars[this.carsPointer].color.b)
                    
                else menu.setTimeout(() => colorToPos('rgb ' + menu.cars[pointer].color.r + ' ' + menu.cars[pointer].color.g + ' ' + menu.cars[pointer].color.b), 100)
                }, 100)
            } else menu[variable] = value;
            // //console.log(this.cars[this.carsPointer].model)  
        },
        emitToClient: function (eventName, ...args) {
            // //console.log(...args)  
            if ('alt' in window) alt.emit('emitToClient', eventName, ...args)
        },
        emit: function (value, ...args) {
            // //console.log(`emit: ${value} -> ${args[0]}`) 
            if ('alt' in window) alt.emit(value, ...args)
        },
        //Изменяет необходимые аргументы. Входные данные: ['nameVar', value], ...
        changeVar(...args) {
            //console.log(`changeVar: ${JSON.stringify(...args)}`)
            args.forEach(el => {
                //console.log(`changeVar(0): ${JSON.stringify(el)}`)
                //console.log(`changeVar(1): menu.${el[0]} = ${el[1]}`)
                Vue.set(menu, el[0], el[1])
                //console.log(`changeVar: ${menu[el[0]]}`)
            })
        },
        //Изменяет необходимые аргументы. Входные данные: ['nameVar', 'nameVar2', value], ...
        changeVar2(...args) {
            //console.log(`changeVar: ${JSON.stringify(...args)}`)
            args.forEach(el => {
                //console.log(`changeVar(0): ${JSON.stringify(el)}`)
                //console.log(`changeVar(1): menu.${el[0]}.${el[1]} = ${el[2]}`)
                Vue.set(menu[el[0]], el[1], el[2])
            })
        },
        //Изменяет необходимые аргументы. Входные данные: ['nameVar', index, 'nameArg', value], ...
        changeArgument(...args) {
            //console.log(`changeArgument: ${JSON.stringify(...args)}`)
            args.forEach(el => {
                //console.log(el)
                //console.log(`changeArgument(1): menu[${el[0]}][${el[1]}][${el[2]}] = ${el[3]}`)
                menu[el[0]][el[1]][el[2]] = el[3];
            }) 
        },
        useFunction(name, ...args) {
            return menu[name](...args);
        },

        // Срабатывает, когда человек "открывает" меню
        eventOpen()
        {
            // 
        },

        translateSubPages()
        {
            if(this.subPage === 1) 
            {
                this.transleteById('i18nInvite', 'inviteText')
                this.transleteById('i18nSelect', 'select')
            }
            else if(this.subPage === 2)
            {
                this.transleteById('i18nActions', 'actions')
                menu.friends.forEach(el => {
                    if(document.getElementById(el.name)) document.getElementById(el.name).setAttribute('data-title', menu.i18n.delFriend);
                })
            }
            else if(this.subPage === 3) 
            {
                this.transleteById('i18nAdd', 'add')
                this.transleteById('i18nAccept', 'accept')
                this.transleteById('i18nCancel', 'cancel') 
            }
        },

        transleteById(id, text)
        {
            document.querySelectorAll(`[id=${id}]`).forEach(el => {
                el.setAttribute('data-title', menu.i18n[text]);
            })
        },

        changePassword(current, newPass, newPass2)
        {
            if(newPass !== newPass2) return menu.emit('customNotify', 1, menu.i18n.newPassDontMatch)
            if(/[^A-Z-a-z-0-9]/g.test(newPass)) return menu.emit('customNotify', 1, menu.i18n.newPassDontValid)
            if(newPass.length > 20) return menu.emit('customNotify', 1, menu.i18n.newPassTooLong)
            if(newPass.length < 4) return menu.emit('customNotify', 1, menu.i18n.newPassTooShort)
            if(newPass === current) return menu.emit('customNotify', 1, menu.i18n.newPassSameCurrent)
            menu.emitToServerWithWT(1000, 'sLogin:changePassword', current, newPass); 
        }, 
        changedPassword()
        {
            let cP = document.getElementById('currentPass'), nP = document.getElementById('newPass'), nP2 = document.getElementById('newPass2')
            if(cP && nP && nP2) cP = nP = nP2 = ""
            menu.emit('customNotify', 2, menu.i18n.changedPassword) 
            menu.switchPage(1, 0)
        },

        reportSend(text = menu.reportInput)
        {
            if(!menu.textValid(text)) return menu.emit('customNotify', 1, menu.i18n.notValid) 
            if(menu.superCoolDown) return menu.emit('customNotify', 1, menu.i18n.stopFlood) 
  
 
            let reason = menu.reportType;
            if(menu.reportType === 2)
            {
                reason = 3 + +menu.reportReason
            } 
            menu.emitToServerWithWT(250, 'sReport:new', reason, text)  
            menu.superCoolDown = true
            menu.setTimeout(() => {
                menu.superCoolDown = false
            }, 5000)
        },

        reportSent() 
        {
            menu.switchPage(0,0); 
            menu.reportInput = ''; 
            menu.reportReason = 
            menu.reportType = -1;   
            menu.emitToClient('notifyI18n', '2', 'report', 'send', '3500');
        },

        //Возвращает true, если текст проходит проверку на A-Z, А-Я, 0-9
        textValid(text)
        {
            return !(/[^A-Z-a-z-0-9-а-я-А-Я,ёЁ?! ]/g.test(text))
        },

        saveSettings(page, subPage = 0) {
            //console.log(`saveMenu`)
            if (page !== -1) this.switchPage(page, subPage);
            if ('alt' in window) {
                alt.emit('saveSettings', {
                    lang: this.lang,
                    vr: this.vr,
                    sizeMap: this.sizeMap,
                    quickWeapon: this.quickWeapon,
                    disableCursor: this.disableCursor,
                    autoLogin: this.autoLogin,
                    volume: this.volume,
                    keyMapSize: this.keyMapSize,
                    keyQuickMarker: this.keyQuickMarker,
                    keySitDown: this.keySitDown,
                    keyFingerPointing: this.keyFingerPointing,
                    keyMenu: this.keyMenu,
                })
            }
        },
        //Page = -3 -> игнорирование запроса о смене страницы
        switchPage(newPage, newSubPage = -1) {  
            if(newPage === -3) return; 
            if(newPage === 4 && menu.vip === 'none') return menu.emit('customNotify', 1, menu.i18n.notAvailable)
            if(newPage === 5) 
            {
                if(menu.playingTime === -1) menu.switchPage(7,2) //Если из наблюдения вышел админ в режиме recon
                setTimeout(() => this.emitToClient('cAudio:play', menu.wsWin ? 'win' : 'DirectedByROBERT'), 1000) 
            }
            this.resetPage(newPage, newSubPage).then(() => {
                if (this.subPage === -2) return;

                
                if(('alt' in window)) alt.emit('changeVarOnClient', ['page', newPage]) 
                //console.log(`switchPage: ${newPage}; ${newSubPage}`)
                // if(('alt' in window) && (newPage > 1 || newSubPage > 1)) return;
                if (newSubPage !== -1 || (this.nextSubPage !== -1 && this.page !== 2)) {
                    // if(newPage == 0) return this.subPage = newSubPage;
                    this.page = newPage;
                    this.subPage = -2;
                    setTimeout(() => {
                        if (this.nextSubPage !== -1) {
                            this.subPage = this.nextSubPage;
                            if(this.page <= -1) this.page = 0;   
                            this.nextSubPage = -1;
                        } else this.subPage = newSubPage;

                        this.translateSubPages() 
                    }, 350)
                } else {
                    //При закрывании страницы
                    if(newPage === -2) 
                    {
                        menu.lastPage = this.page; 
                        newPage = 0;
                    }
                    //При открывании страницы, если надо ластовую
                    if(newPage === -1 && menu.lastPage >= 0) newPage = menu.lastPage; 
                    this.page = newPage;
                    let objInvite = menu.lobby.find(el => (el.name === 'ПРИГЛАСИТЬ' || el.name === 'INVITE'))
                    Vue.set(objInvite, 'name', menu.i18n.inviteText) 
                    this.resetPageAfter(newPage);

                    if (this.coolDown) return;
                    this.coolDown = true;
                    setTimeout(() => {
                        this.coolDown = false;
                        this.subPage = 0;
                        //console.log(`swithPage(after): ${this.page}; ${this.subPage}`)
                    }, 150);
                }
            })
        },

        async resetPage(newPage, newSubPage) {
            if (this.page === 2 && (newPage === 0 || newPage === 4)) {
                menu.emit('cCar:setCarPreview', false);
                if (this.subPage === 0) {
                    this.cars[this.carsPointer].color = {
                        r: this.oldColor[0],
                        g: this.oldColor[1],
                        b: this.oldColor[2]
                    }
                }
                // else // this.subPage === 1
                // {
                //     this.emitToClient('cJetPack:exit', this.anyVarC, this.anyVar); 
                // }
            }

            if (newPage === 2 && newSubPage === 1) {
                this.anyVarSecond = menu.fGetJPSkins(); // this.anyVarSecond - возможные скины игрока
                // //console.log(`reset: ${JSON.stringify(this.anyVarSecond)}`)
                // //console.log(this.anyVarSecond.length)
                this.emitToClient('cJetPack:update'); // this.anyVar - выбранный скин джетпака
            }
            // else  
            // { 
            //     this.anyVar = null;
            //     this.anyVarSecond = null;
            //     this.anyVarC = null;
            // }
            this.updateTuning = false;
            this.recordKey = false;
        },

        resetPageAfter(newPage)
        {
            if (this.page === 5 && newPage === 0) this.wsWin = false
        },

        setTimeout(nameFunction, time)
        {
            setTimeout(nameFunction, time)
        },

        fLoadJP(selected) {
            this.anyVar = selected[0];
            this.anyVarC = selected;

            if (this.anyVarSecond.length > 0) {
                this.carsPointer = this.anyVarSecond.findIndex(el => el === this.anyVar)
                //console.log(this.carsPointer)
            }
            if(this.anyVarC[0] === this.anyVarSecond[this.carsPointer] && this.anyVarC[1].r !== this.anyVarC[2].r)  
            {
                menu.emitToServerWithWT(0, 'sCar:preview', { 
                    model: 'thruster',
                    color: this.anyVarC[1],
                    color2: this.anyVarC[2],  
                }, 48, this.anyVarSecond[this.carsPointer]);
            }
            else
            {
                menu.emitToServerWithWT(0, 'sCar:preview', {
                    model: 'thruster',
                    color: null,
                }, 48, this.anyVarSecond[this.carsPointer]);
            }
        },

        fGetJPSkins() {
            switch (this.vip) {
                case 'none':
                    return [];
                case 'vip':
                    return this.jetPackSkins.vip
                case 'premium':
                    return this.jetPackSkins.vip.concat(this.jetPackSkins.premium)
                case 'deluxe':
                    return this.jetPackSkins.vip.concat(this.jetPackSkins.premium.concat(this.jetPackSkins.deluxe))
            }
        },

        //LOBBY
        fUpdateLobby(data) {
            //console.log(JSON.stringify(data))
            if (data[0].name && data[0].name !== menu.myName) {
                let index = data.findIndex(el => el.name === menu.myName);
                if (index !== -1) {
                    let client = data.find(el => el.name === menu.myName);
                    data.splice(index, 1);
                    data.unshift(client)
                }
            }

            data.forEach(async (player, index) => {
                if (player.name === menu.myName) {
                    myID = index;
                    return player.ava = menu.myAvatar;
                } else player.ava = await this.getPhoto(null, player.name)
            })

            if (data.length < 4) {
                data.push({
                    name: menu.i18n.inviteText,
                    ava: 0
                })
            }

            menu.lobby = data;
        },

        //
        fUpdateLobbyMic(data)
        {
            // //console.log(`fUpdateLobbyMic: ${JSON.stringify(data)}`)
            Object.keys(data).forEach(el => {
                // el = el.toLocaleUpperCase(); 
                let index = menu.lobby.findIndex(player => {
                    // //console.log(`fUpdateLobbyMic: ${player.name} === ${el} => ${player.name === el}`); 
                    return player.name === el
                })
                if(index === -1) return;
                Vue.set(menu.lobby[index], 'mic', data[el])
                // menu.lobby[index].mic = data[el]
            })  
        },

        fUpdateLobbyInGame(data)
        {
            Object.keys(data).forEach(el => {
                let index = menu.lobby.findIndex(player => {
                    return player.name.toLowerCase() === el.toLowerCase()
                })
                if(index === -1) return;
                // home + noReady
                if(data[el] && (menu.lobby[index].ready === 0 || menu.lobby[index].ready === -1))
                {
                    Vue.set(menu.lobby[index], 'inGame', data[el])
                }
                else Vue.set(menu.lobby[index], 'inGame', false)
            })  
        },

        fInviteToLobby(lobbyID, myData) {
            this.lobbyID = lobbyID;
            this.myData = myData;
            if (this.page !== 0 || !menu.show) //Если игрок не на главной странице
            {
                this.emitToClient('cMenu:inviteToLobbyNotify'); 
                this.nextSubPage = 4;
            } else this.switchPage(0, 4);
 
            setTimeout(() => {
                if (this.lobbyID === lobbyID && this.myData === myData) {
                    this.answerInvite(false)
                }
            }, 30000)
        },

        answerInvite(value) {
            if(this.myData === null) return;
            this.emitServer('sLobby:answerInvite', value, this.lobbyID)
            if(this.nextSubPage === 4) this.nextSubPage = 0; 
            this.lobbyID = 0;
            this.myData = null;

            if(this.subPage === 4)
            {

                if(this.page !== 0) this.subPage = 0;
                else this.switchPage(0, 0) 
            }
        },

        fLeaveLobby(onServer = false) {
            if (!onServer) this.emitServer(`sLobby:leaveLobby`);
            this.lobbyID = 0;
            this.lobby.splice(1, this.lobby.length);
            this.lobby[0].ready = -2
            this.lobby.push({
                name: menu.i18n.inviteText,
                ava: 0
            })
        },

        //Кнопка сверху справа в лобби
        fInviteOrProfile(ava) {
            this.switchPage(0, ava === 0 ? 1 : 0);
        },

        //FRIENDS
        getPhoto(avatar, name = this.myName) {
            if (avatar === null) return Promise.resolve(`./img/avatars/${this.getAvatar(name)}.jpg`)
            // if(avatar.length < 5) return `./img/avatars/${avatar}.jpg`; 
            const url = `https://cdn.discordapp.com/avatars/${avatar}.png`

            return fetch(url)
                .then(response => (response.ok) ? response.blob() : Promise.reject())
                .then(result => Promise.resolve(URL.createObjectURL(result)))
                .catch(() => Promise.resolve(`./img/avatars/${this.getAvatar(name)}.jpg`))
        },
        getAvatar(nick) {
            if (nick) {
                return this.avatars[nick[0].toUpperCase()]
            } else return this.avatars['A']
        },
        getRandomInt: function (max) {
            return Math.floor(Math.random() * Math.floor(max));
        },
        getLevel: function () {
            if (this.elo < 800) this.level = '01';
            else if (this.elo < 950) this.level = '02';
            else if (this.elo < 1100) this.level = '03';
            else if (this.elo < 1250) this.level = '04';
            else if (this.elo < 1400) this.level = '05';
            else if (this.elo < 1550) this.level = '06';
            else if (this.elo < 1700) this.level = '07';
            else if (this.elo < 1850) this.level = '08';
            else if (this.elo < 2000) this.level = '09';
            else this.level = '10';
        },
        getKD: function () {
            let value = (+this.kills / +this.matches).toFixed(2);
            return value === 'NaN' ? '0.00' : value
        },
        showProfileDetails: function (name, value = null) {
            let el = document.getElementById(name);
            if (value == null) value = el.style.opacity;
            else value = 1;

            if (value <= 0.2) {
                el.style.opacity = 1;
                // el.style.position = 'static'
                el.style.transform = 'translateX(-2vw)'
            } else {
                el.style.transform = 'translateX(2vw)'
                el.style.position = 'absolute'
                el.style.opacity = 0;
            }
            // if(value != null) el.style.opacity = value; 
            // else el.style.opacity = el.style.opacity <= 0.2 ? 1 : 0;
        },
        delFriend: function (name) {
            let el = document.getElementById(name);
            if (el.style.opacity <= 0.2) return;
            this.request(name, 'friends')
        },
        getOnlineFriend: function () {
            return this.friends.filter(el => el.online).filter(el => !this.lobby.some(player => player.name === el.name)) //.toUpperCase()
        },
        updateOnline: function (allPlayers) {
            // //console.log(`allPlayers: ${allPlayers}`)
            let online = false;
            this.allPlayers = allPlayers;
            this.friends.forEach(el => {
                allPlayers.forEach(el2 => {
                    if (el.name === el2) {
                        online = true;
                    }
                })

                el.online = online;
                online = false;
            })
        },
        fRightClick(index)
        {
            //Удаление новости 
            menu.emitToClient('bell:delete', index)
        },

        loadLang(lang = this.lang) { 
            if(lang !== this.lang) this.lang = lang;

            if (lang === 'ru') this.loadRu();
            else this.loadEn();
        },
        loadRu() {
            document.getElementById('inputAddFriend').placeholder = "Введите NickName"
            menu.i18n = {
                balance: 'БАЛАНС',
                personal: 'ЛИЧНЫЙ',
                managerCars: 'Управляйте своими машинами',
                transport: 'ТРАНСПОРТ',
                ready: 'ГОТОВ',
                notready: 'НЕ ГОТОВ',
                inGame: 'В ИГРЕ',
                topap: 'ПОПОЛНИТЬ БАЛАНС',
                managmentSub: 'СВЯЗЬ С АДМИНИСТРАЦИЕЙ',
                control: 'УПРАВЛЕНИЕ',
                start: 'НАЧАТЬ',
                game: 'ИГРУ',
                status: 'Статус',
                expectation: 'Игроков в ожидании',
                stop: 'ЗАКОНЧИТЬ',
                clickready: 'Нажмите для готовности',
                clicknotready: 'Нажмите, если не готовы',
                settings: 'НАСТРОЙКИ',
                pack: 'МАГАЗИН',
                noob: 'ПРИВИЛЕГИЙ',
                left: 'Осталось до конца скидки',
                time: '13 ЧАСОВ',
                license: 'ЛИЦЕНЗИИ',
                rank: 'РАНГ',
                backmatch: 'За предыдущий матч',
                score: 'ОЧКИ',
                wins: 'ПОБЕД',
                hours: 'НАИГРАНО ЧАСОВ',
                hours2: 'ЧАСОВ',
                awards: 'НАГРАДЫ',
                gifts: 'Получай подарки',
                person: 'ПЕРСОНАЖ',
                custom: 'ПЕРСОНАЛИЗАЦИЯ',
                friends: 'ДРУЗЬЯ',
                clothing: 'ОДЕЖДА',
                invite: 'Пригласить в команду',
                controlFriends: 'УПРАВЛЕНИЕ',
                requestsIn: 'ВХОДЯЩИЕ ЗАЯВКИ',
                requestsOut: 'ИСХОДЯЩИЕ ЗАЯВКИ',
                add: 'ДОБАВИТЬ',
                addFriend: 'ДОБАВИТЬ ДРУГА',
                tips: 'ПОДСКАЗКИ',
                sit: 'ПРИСЕСТЬ',
                keyMenu: 'МЕНЮ',
                keyFingerPointing: 'УКАЗЫВАТЬ ПАЛЬЦЕМ',
                menuMode: 'РЕЖИМ В МЕНЮ',
                sizeMap: 'РАЗМЕР КАРТЫ',
                small: 'МАЛЕНЬКИЙ',
                normal: 'СРЕДНИЙ',
                big: 'БОЛЬШОЙ',
                disableCursor: 'ОТКЛЮЧЕНИЕ КАСТОМНОГО КУРСОРА',
                autoLogin: 'АВТОМАТИЧЕСКИЙ ВХОД НА СЕРВЕР',
                btnBack: 'НАЗАД',
                leavelobby: 'ВЫЙТИ',
                buy: 'КУПИТЬ',
                select: 'ВЫБРАТЬ',
                selected: 'ВЫБРАНО',
                none: 'НЕ ВЫБРАНО',
                none2: 'НЕ ВЫБРАНА',
                inviteToLobby: 'ПРИГЛАШЕНИЕ В ЛОББИ',
                accept: 'ПРИНЯТЬ',
                cancel: 'ОТКАЗАТЬСЯ',
                quickWeaponT: 'БРАТЬ ПОДОБРАННОЕ ОРУЖИЕ В РУКИ',
                infoStopGame: 'Закончив игру, Вы покинете лобби',
                applyColor: 'ПРИМЕНИТЬ ЦВЕТ',
                applyTuning: 'ПРИМЕНИТЬ ТЮНИНГ',
                inviteText: 'ПРИГЛАСИТЬ',
                win: "ПОБЕДА",
                lose: "ПОРАЖЕНИЕ",
                place: "МЕСТО",
                kills: "УБИЙСТВ",
                playingTime: "ИГРОВОЕ ВРЕМЯ",
                minutes: "МИНУТ",
                exitToMenu: "ВЫЙТИ В МЕНЮ",
                iAgree: "Я СОГЛАСЕН",
                language: "ЯЗЫК",
                volume: "ГРОМКОСТЬ",
                quickMarker: "БЫСТРАЯ МЕТКА",
                mapSize: "БЫСТРАЯ СМЕНА РАЗМЕРА КАРТЫ",
                acceptAction: "ПОДТВЕРДИТЕ ДЕЙСТВИЕ",
                connectPrivileges: "ПОДКЛЮЧЕНИЕ ПРИВИЛЕГИИ",
                pricePrivileges: "СТОИМОСТЬ",
                timeActions: "ВРЕМЯ ДЕЙСТВИЯ",
                agreeOffer: "Вы соглашаетесь со всеми правилами и условиями офферты",
                days: "ДНЕЙ",
                sortByPrice: "СОРТИРОВКА ПО ЦЕНЕ",
                minValue: "МИНИМАЛЬНАЯ",
                maxValue: "МАКСИМАЛЬНАЯ",
                infoSort: "ЧТОБЫ ВИДЕТЬ СВОИ МАШИНЫ ПОСТАВЬТЕ МИНИМАЛЬНУЮ ЦЕНУ НА НОЛЬ",
                onlyMyCars: "ТОЛЬКО МОИ МАШИНЫ",
                privileges: "ПРИВИЛЕГИЕЙ",
                gait: "ПОХОДКА",
                actions: "ДЕЙСТВИЯ",
                delFriend: "УДАЛИТЬ ИЗ ДРУЗЕЙ",
                bonus: "БОНУС",
                moreMoneyEndGame: "БОЛЬШЕ ДЕНЕГ В КОНЦЕ ИГРЫ",
                na: "НА",
                endPriv: "ДО ОКОНЧАНИЯ ПОДПИСКИ",
                comingSoon: "ЭТОТ РАЗДЕЛ СКОРО СТАНЕТ ДОСТУПЕН!",
                level: "УРОВНЯ",
                tuning: "ТЮНИНГ ЛИЧНОГО ТРАНСПОРТА",
                second: "СЕКУНД",
                reloadQuickMarker: "ПЕРЕЗАРЯДКА БЫСТРОЙ МЕТКИ ЗА",
                cashBackVIP: "ЗА ПРОДАЖУ СТАРОЙ ОДЕЖДЫ",
                componentsVIP: "ПОВЫШЕННЫЙ ШАНС ВЫПАДЕНИЯ МОДИФИКАЦИЙ ДЛЯ HEAVY SNIPER НА",
                armourVIP: "БРОНЯ В НАЧАЛЕ МАТЧА",
                bell: "УВЕДОМЛЕНИЯ",
                question: "ВОПРОС",
                complaint: "ЖАЛОБА",
                suggestion: "ПРЕДЛОЖЕНИЕ",
                cheats: "СТОРОННЕЕ ПО",
                useBugs: "ИСПОЛЬЗОВАНИЕ БАГОВ",
                insult: "ОСКОРБЛЕНИЕ",
                intruderID: "УКАЖИТЕ ИДЕНТИФИКАТОР НАРУШИТЕЛЯ",
                questionInput: "ОПИШИТЕ ВАШ ВОПРОС",
                improvementInput: "ОПИШИТЕ ВАШЕ ПРЕДЛОЖЕНИЕ",
                send: "ОТПРАВИТЬ",
                discord: "НАШ DISCORD",
                clearAll: "ОЧИСТИТЬ ВСЕ",
                victimLP: "БЫЛ УБИТ ВАМИ",
                killerLP: "УБИЛ ВАС",
                obsLP: "ВЫ НАБЛЮДАЛИ ЗА НИМ",
                notAvailable: "Этот раздел вам недоступен",
                changePassword: "ИЗМЕНИТЬ ПАРОЛЬ",
                currentPassword: "ВАШ ТЕКУЩИЙ ПАРОЛЬ",
                newPassword: "ВАШ НОВЫЙ ПАРОЛЬ",
                newPassword2: "ПОВТОРИТЕ ВАШ НОВЫЙ ПАРОЛЬ",
                apply: "ПРИМЕНИТЬ",
                newPassDontMatch: "Новые пароли не совпадают",
                newPassDontValid: "Пароль содержит запрещенные символы. Используйте A-Z и цифры",
                newPassTooLong: "Новый пароль слишком длинный. Пароль должен быть до 20 символов",
                newPassTooShort: "Новый пароль слишком короткий",
                newPassSameCurrent: "Новый пароль должен отличаться от старого",
                changedPassword: "Пароль успешно изменен!",
                sellCar: "ПРОДАТЬ",
                toSellCar: "ПРОДАЖА АВТОМОБИЛЯ",
                cashBackCAR: "ЗА ПРОДАЖУ МАШИН",
                upTo: "ДО",
                stopFlood: "Прекратите флудить!",
                notValid: "Вы используете запрещенные символы. Уберите их, и попробуйте еще раз",
            }
        },
        loadEn() {
            document.getElementById('inputAddFriend').placeholder = "Input NickName"
            menu.i18n = JSON.parse(menu.i18nTemp);
        },
        updateCars(list, selected) {
            // //console.log(`LIST: ${JSON.stringify(list)}; selected: ${JSON.stringify(selected)}`)
            // { 
            //     model: string,  
            //     color: iRGB,
            // }
            let carSelected = this.cars[this.carsPointer].model,
                foundIndex = this.cars.findIndex(el => el.price === -1);
            //Сбрасываем старый выбор
            if (foundIndex !== -1) this.cars[foundIndex].price = 0;

            //Добавляем новые машины
            list.forEach((carOfList) => {
                let found = this.cars.findIndex(car => car.model === carOfList.model);
                if (found !== -1) {
                    this.cars[found].price = 0;
                    this.cars[found].color = carOfList.color;
                }
            })

            //Выставляем новый выбор
            foundIndex = this.cars.findIndex(el => el.model === selected.model);
            //console.log(`foundIndex: ${foundIndex}; ${selected.model}`)
            if (foundIndex !== -1) this.cars[foundIndex].price = -1;

            //Чтобы "не выбрано" всегда было в начале списка
            let value;
            foundIndex = this.cars.findIndex(el => el.model === 'none');
            if (foundIndex !== -1) {
                value = this.cars[foundIndex].price;
                this.cars[foundIndex].price = -2;
            }
            this.cars.sort((a, b) => a.price - b.price)
            if (foundIndex !== -1) this.cars[foundIndex].price = value;

            this.carsPointer = this.cars.findIndex(el => el.model === carSelected);
            if (this.page === 2) this.setPreviewCar(this.carsPointer);
        },

        setPreviewCar(pointer = null, onlyColoring = false) {
            if (pointer === null) {
                pointer = this.cars.findIndex(el => el.price === -1)
                if (pointer === -1) pointer = 0; 
                this.carsPointer = pointer;
            }
            menu.emitToServerWithWT(0, 'sCar:preview', { 
                model: this.cars[pointer].model,
                color: this.cars[pointer].color
            }, null, 0, onlyColoring);
            // //console.log(`setPreviewCar: ${this.cars[this.carsPointer].model}; ${this.oldColor[3]} --> ${this.cars[this.carsPointer].model !== this.oldColor[3]}`)
            if (this.cars[this.carsPointer].model !== this.oldColor[3]) {
                menu.oldColor = [this.cars[this.carsPointer].color.r, this.cars[this.carsPointer].color.g, this.cars[this.carsPointer].color.b,
                    this.cars[this.carsPointer].model
                ];
                this.updateTuning = false;
            } else if (menu.oldColor[0] !== this.cars[this.carsPointer].color.r ||
                menu.oldColor[1] !== this.cars[this.carsPointer].color.g ||
                menu.oldColor[2] !== this.cars[this.carsPointer].color.b) {
                this.updateTuning = true;
                let el = document.getElementById('changeColorCar');
                if (el) 
                {
                    el.style.backgroundColor = 'rgb(' + this.cars[this.carsPointer].color.r + ',' + this.cars[this.carsPointer].color.g + ',' + this.cars[this.carsPointer].color.b + ')';
                    // //console.log(`carColor: ${contrastingColor([this.cars[this.carsPointer].color.r, this.cars[this.carsPointer].color.g, this.cars[this.carsPointer].color.b])}`)
                    el.style.color = `#${contrastingColor([this.cars[this.carsPointer].color.r, this.cars[this.carsPointer].color.g, this.cars[this.carsPointer].color.b])}` 
                } 
            }
            // //console.log(`this.updateTuning: ${this.updateTuning}`)  
             
            if (!this.cars[pointer].color) this.cars[pointer].color = {
                r: 255,
                g: 255,
                b: 255
            }
            if(menu.initColor()) colorToPos('rgb ' + menu.cars[pointer].color.r + ' ' + menu.cars[pointer].color.g + ' ' + menu.cars[pointer].color.b)
            menu.setTimeout(() => 
            {
                if(menu.initColor()) colorToPos('rgb ' + menu.cars[pointer].color.r + ' ' + menu.cars[pointer].color.g + ' ' + menu.cars[pointer].color.b) 
            }, 700)    
        },
        
        initColor() {
            if(!initColor()) return false
            ColorPicker(); 
            return true;
        },

        sortLiveCar(plus, onlyMyCarsClick)
        {
            //console.log(`sortLiveCar: ${onlyMyCarsClick}; ${this.onlyMyCars}`)
            if(onlyMyCarsClick === 3)
            {
                if(this.onlyMyCars) this.minSort = this.maxSort = 0
                else 
                {
                    this.minSort = 1000;
                    this.maxSort = 500000;
                }
            }
            else if(this.onlyMyCars && onlyMyCarsClick === 1) this.onlyMyCars = false; 
            let result = this.carsPointer;
            if(+this.maxSort < +this.minSort) 
            {
                if(this.maxSort <= 0)
                {
                    this.minSort = 1000;
                    this.maxSort = 500000;
                }
                else {
                    this.minSort = this.maxSort-1
                }
            }
            if(plus)
            {
                if(result > this.cars.length) return result;
                result += +1;
                while(this.cars[result].price > this.maxSort) 
                {
                    if(this.cars[result].price === -1) break;
                    //console.log(`${result} === ${this.cars.length-1} --> ${result === this.cars.length-1}`)
                    if(result === this.cars.length-1) break;
                    //console.log(`result(maxSort): ${result}`)
                    result -= +1;
                }
                while(this.cars[result].price < this.minSort)
                {
                    if(this.cars[result].price === -1) break;
                    //console.log(`${result} === ${this.cars.length-1} --> ${result === this.cars.length-1}`)
                    if(result === this.cars.length-1) break;
                    //console.log(`result(minSort): ${result}`)
                    result += +1;
                }
            }
            else 
            {
                if(this.cars[result-+1].price > this.maxSort) 
                {
                    // result -= +1;
                    while(this.cars[result].price > this.maxSort) 
                    {
                        //console.log(`${this.cars[result].price === -1}`)
                        if(this.cars[result].price === -1) break;
                        //console.log(`${result} === ${this.cars.length-1} --> ${result === this.cars.length-1}`)
                        if(result === this.cars.length-1) break;
                        //console.log(`result(maxSort): ${result}`)
                        result -= +1;
                    }
                }
                result -= 1;
                //console.log(`${this.cars[result].price} | ${this.minSort}`)
                if(this.cars[result].price < this.minSort) 
                { 
                    // result += +1;
                    while(this.cars[result].price < this.minSort) 
                    {
                        //console.log(`${this.cars[result].price === -1}`)
                        if(this.cars[result].price === -1) break;
                        //console.log(`${result} === ${this.cars.length-1} --> ${result === this.cars.length-1}`)
                        if(result === this.cars.length-1) break;
                        //console.log(`result(minSort): ${result}`)
                        result += +1;
                    }
                }
            }
            //console.log(`result: ${this.cars[result].price} | min: ${this.minSort} | max: ${this.maxSort}`)
            if(this.cars[result].price !== -1 && (this.minSort > this.cars[result].price || this.maxSort < this.cars[result].price)) this.minSort = this.maxSort = this.cars[result].price

            return result; 
        },
        previewCar(plus, name = 'cars', onlyMyCarsClick = 1) {
            // if(!this.fCoolDown()) return;
            //console.log(`previewCar: ${plus}; ${name}; this.carsPointer: ${this.carsPointer};`) 
            let valueFalse = this.carsPointer,
                valueTrue;
            if((name === 'cars')) valueTrue = this.sortLiveCar(plus, onlyMyCarsClick)
            else {
                if (plus) this.carsPointer === this[name].length - 1 ? valueTrue = this[name].length - 1 : valueTrue = this.carsPointer + 1;
                else this.carsPointer === 0 ? valueTrue = 0 : valueTrue = this.carsPointer - 1 
            }
            if (valueFalse === valueTrue) return;
            if (name === 'cars') {
                if (!this.cars[valueTrue].color) this.cars[valueTrue].color = {
                    r: 255,
                    g: 255,
                    b: 255
                }
                this.waitEmitToServer(50, 'carsPointer', valueTrue, valueFalse, 'sCar:preview', {
                    model: this.cars[valueTrue].model,
                    color: this.cars[valueTrue].color
                });
            } else {
                //console.log(`${valueTrue} | ${valueFalse} | ${this.anyVarSecond[valueTrue]}`)
                // if(valueTrue === valueFalse) this.carsPointer = -1
                // else this.carsPointer = valueTrue

                this.carsPointer = valueTrue;  
                let speicalSkins = [2, 21, 37, 1, 4, 11, 12, 10]
                //console.log(`this.anyVarSecond: ${this.anyVarSecond[valueTrue]}; ${this.anyVarC[0] === this.anyVarSecond[valueTrue]}; ${this.anyVarC[1].r === this.anyVarC[2].r}`)
                if (speicalSkins.some(el => el === this.anyVarSecond[valueTrue])) { 
                    if(this.anyVarC[0] === this.anyVarSecond[valueTrue] && this.anyVarC[1].r !== this.anyVarC[2].r)  
                    {
                        menu.emitServer('sCar:preview', {  
                            model: 'thruster',
                            color: this.anyVarC[1],
                            color2: this.anyVarC[2], 
                        }, 48, this.anyVarSecond[valueTrue]); 
                    }
                    else
                    {
                        let color = {r: this.getRandomInt(255), g: this.getRandomInt(255), b: this.getRandomInt(255)}, color2 = {r: this.getRandomInt(255), g: this.getRandomInt(255), b: this.getRandomInt(255)};
                        this.anyVarC = [this.anyVarSecond[valueTrue], color, color2];
                        menu.emitServer('sCar:preview', {
                            model: 'thruster',
                            color: color,
                            color2: color2,
                        }, 48, this.anyVarSecond[valueTrue]);
                    }
                }
                else  
                {
                    menu.emitServer('sCar:preview', {
                        model: 'thruster',
                        color: null,
                    }, 48, this.anyVarSecond[valueTrue]);
                }
                // this.waitEmitToServer(50, 'carsPointer', valueTrue, valueFalse, 'sCar:preview', {
                //     model: 'thruster',
                //     color: null 
                // }, 48, this.anyVarSecond[valueTrue]);
            }
        },
        fApplyTuning(car) {
            //console.log(`fApplyTuning: ${JSON.stringify(car)}`)
            let found = this.cars.findIndex(veh => veh.model === car.model)
            if (found === -1) return;
            //console.log(`fApplyTuning: found: ${found}`);
            this.cars[found].color = car.color;
            this.oldColor = [car.color.r, car.color.g, car.color.b, car.model]
            this.updateTuning = false;

        },
        fSellCar(car) 
        {
            let found = this.cars.findIndex(veh => veh.model === car.model)
            if (found === -1) return;
            this.cars[found].price = this.cars[found].price2;
            this.cars[found].color = {r: 255, g: 255, b: 255}; 
            this.oldColor = [car.color.r, car.color.g, car.color.b, car.model]
            this.updateTuning = false;
            menu.cars.sort((a, b) => a.price - b.price)
            this.setTimeout(() => { 
                menu.emitToServerWithWT(0, 'sCar:preview', { 
                    model: menu.cars[menu.carsPointer].model,
                    color: menu.cars[menu.carsPointer].color
                }, null, 0, false);  
                if(!menu.initColor()) menu.setTimeout(() => menu.initColor(), 500) 
            }, 200)   
        },
        request(friend, type, event = 'sFriends:rejectRequest') {
            if (type === 'friends') this[type] = this[type].filter(el => el.name !== friend)
            else this[type] = this[type].filter(el => el !== friend)
            this.emitServer(event, friend, type);
        },
        fCoolDown() {
            if (this.coolDown) {
                this.emit('customNotify', 4, menu.i18n.stopFlood)
                return false;
            }
            this.coolDown = true;
            setTimeout(() => {
                this.coolDown = false;
            }, 500)
            return true;
        },
        findFriend() {
            // //console.log(`allPlayers: ${this.allPlayers}`)
            // //console.log(`requestsOut: ${this.requestsOut}`)
            // //console.log(`myName: ${this.myName}`)
            // //console.log(`this.friends: ${JSON.stringify(this.friends)}`)
            return this.allPlayers.filter(el => {
                    let count = 0;
                    for (let i = 0; i < this.miscInput.length; i++) {
                        if (el[i].toLowerCase() === this.miscInput[i].toLowerCase()) count++;
                    }
                    // //console.log(`count: ${count} === ${this.miscInput.length}`)
                    return count === this.miscInput.length
                })
                .filter(el => !this.friends.some(el2 => el2.name.toLowerCase() === el.toLowerCase()))
                .filter(el => !this.requestsOut.some(el2 => el2.toLowerCase() === el.toLowerCase()))
                .filter(el => el.toLowerCase() !== this.myName.toLowerCase())
            // .filter(el => {   
            //     if(this.myName && el) el.toLowerCase() === this.myName.toLowerCase() 
            // })  
        },
        changeCamRotation: function (value = this.camRotation) {
            // //console.log(this.camRotation)  
            this.emit('cCar:rotation', value);
            // mp.trigger("cChangeHeading", this.camRotation);
        },
        changeConverter: function (nameOut, nameIn, k) {
            this[nameOut] = Math.round(this[nameIn] * +k);
        },
        getVipColor()
        {
            return this.vip === 'deluxe' ? '#ff0000' : this.vip === 'premium' ? '#47b139' : '#ffc400'
        },
        getVipEndTime()
        {
            let left = this.myEndTime - +Date.now()
            //console.log(`getVipEndTime: ${this.myEndTime}; left: ${left}`)
            if(+left > +86400000)
            {
                left /= +86400000;
                left = `${left.toFixed(0)} ${this.i18n.days}`
            }
            else if(+left > +3600000)
            {
                left /= +3600000;
                left = `${left.toFixed(0)} ${this.i18n.hours2}`
            }
            else if(+left > +60000)
            {
                left /= +60000;
                left = `${left.toFixed(0)} ${this.i18n.minutes}`
            }
            else left = `<1 ${this.i18n.minutes}`

            return left
        },
        getVipPrice()
        {
            let value = this.assortPriv[this.assortSelected].k * this.assortDays
            if(this.assortDays > 30) value -= +((this.assortDays/+30) * +25)
            return Math.ceil(value)
        },
        // getVipLevel(vip = menu.vip)
        // {
        //     return vip === 'deluxe' ? 3 : vip === 'premium' ? 2 : vip === 'vip' ? 1 : 0
        // },
        fKeyDown(keyCode)
        {
            // //console.log(keyCode) 
            // //console.log(menu.keyCodes[keyCode]) 
            // //console.log(menu.recordKey)  
            // if (menu.recordKey !== false && menu.Object.keys(menu.keyCodes).some(el => el === event.code)) 
            if (menu.recordKey !== false) { 
                if (keyCode === 27) return menu.recordKey = false;
                if (menu.keyCodes[keyCode] !== undefined) { 
                    let count = 0;
                    if (menu.keySitDown === keyCode) count += +1;
                    if (menu.keyQuickMarker === keyCode) count += +1;
                    if (menu.keyMapSize === keyCode) count += +1;
                    if (menu.keyFingerPointing === keyCode) count += +1;
                    if (menu.keyMenu === keyCode) count += +1; 
         
                    if (count > 0) menu.emitToClient('notifyI18n', '1', 'menu', 'keyBusy', '2500');
                    else {
                        menu[menu.recordKey] = keyCode;
                        menu.recordKey = false;
                    }
                }
            }
        }, 
        fCheckCursor(value = false) 
        {
            //console.log(`fCheckCursor: ${value}`)
            if(value) //Положение "true"
            {
                menu.fToggleCursor(false)
                if(menu.cursorWhile !== null) clearInterval(menu.cursorWhile)
                document.body.style.cursor = "auto"
                menu.emit('showCursor', true)
            }
            else
            {
                menu.fToggleCursor(true)
                if(menu.cursorWhile !== null) clearInterval(menu.cursorWhile)
                menu.cursorWhile = setInterval(menu.fCursoring, 0)
                document.body.style.cursor = 'none'
                menu.emit('showCursor', false)   
            }
        },
        //ADMIN
        //+10, -10, 0(update)
        fGetReport(diff = 0)
        {
            if(diff !== 0) 
            {
                menu.adminAny += +diff
                menu.adminAny2 += +diff
            }
            if(menu.adminAny < 0) menu.adminAny = 0
            if(menu.adminAny2 < 10) menu.adminAny2 = 10 

            menu.emitToServerWithWT(0, 'sReport:get', menu.adminType, menu.adminAny, menu.adminAny2) 
        },
        // fGetReportManual(start, stop)
        // {
        //     menu.emitServer('sReport:get', menu.adminType, start, stop)  
        // },
        fDateToText(ms) 
        { 
            let result="", d = new Date(+ms); 
            result += d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate() + 
                      " "+ d.getHours()+":"+d.getMinutes()+":"+
                      d.getSeconds();
            return result;
        },
        fGetReportReason(number)
        {
            
            console.log(`fGetReportReason: ${number}`) 
            if(+number > +4) return 'НЕИЗВЕСТНО' 
            let reason = [
                'ИСПОЛЬЗОВАНИЕ ЗАПРЕЩЕНОГО ПО',
                'ИСПОЛЬЗОВАНИЕ БАГОВ',
                'ОСКОРБИТЕЛЬНОЕ ПОВЕДЕНИЕ'] 

            return reason[number-2].toUpperCase()
        },
        fGetReportReasonShort(number)
        {
            console.log(`fGetReportReasonShort: ${number}`)
            if(+number > +4) return 'НЕИЗВЕСТНО'  
            let reason = [
                'cheats',
                'bugs',
                'insult']  

            return reason[number-2].toUpperCase()
        },
    },
});

if ('alt' in window) {
    alt.on('toggle', toggle => {
        menu.show = toggle;  
        // document.body.style.cursor = "auto" 
        // document.body.style.cursor = 'none' 
        if(toggle)
        {
            menu.fCheckCursor()
            menu.eventOpen();
        }
        else
        {
            if(menu.cursorWhile !== null) 
            {
                clearInterval(menu.cursorWhile)
                menu.cursorWhile = null;
            } 
            document.body.style.cursor = 'none'
            menu.emit('showCursor', false)    
        }
        // if(toggle)
        // {  
        //     menu.fToggleCursor(menu.disableCursor)
        //     if(menu.disableCursor) 
        //     {
        //         if(menu.cursorWhile !== null) clearInterval(menu.cursorWhile)
        //         menu.cursorWhile = null; 
        //     }
        //     else { 
        //         setTimeout(() => menu.fToggleCursor(toggle), 50)
        //         if(menu.cursorWhile === null) menu.cursorWhile = setInterval(menu.fCursoring, 0)
        //     }

        //     menu.eventOpen();
        // } 
        // else 
        // {
        //     menu.fToggleCursor(false) 
        //     if(menu.cursorWhile !== null) 
        //     {
        //         clearInterval(menu.cursorWhile)
        //         menu.cursorWhile = null;
        //     }
        // }
        document.getElementById('fade').style.opacity = toggle ? 1 : 0;
        if (menu.page === 1) menu.saveSettings(-1);
    });
    alt.on('getShow', () => alt.emit('keyOpenPressed', menu.show));
    alt.on('bMenu:switchPage', (page = 0, subPage = 0) => menu.switchPage(page, subPage))
    alt.on('changeStatusGame', toggle => menu.statusGame = toggle);
    alt.on('update', (textMatch, countWarmUp) => {
        menu.textMatch = textMatch;
        menu.countWarmUp = countWarmUp;
    });

    alt.on('getSettings', () => menu.saveSettings(-1));
    alt.on('bMenu:setMyName', async (name) => {
        // //console.log(name)
        menu.myName = name;
        menu.fUpdateLobby([{
            name: menu.myName,
            ava: menu.myAvatar,
            ready: -2
        }]);
    });

    alt.on('bMenu:setMyAvatar', async (avatar) => {
        // //console.log(`bMenu:setMyAvatar: ${avatar}`)  
        menu.myAvatar = await menu.getPhoto(avatar)
        menu.fUpdateLobby([{
            name: menu.myName,
            ava: menu.myAvatar,
            ready: -2
        }]);
    });

    alt.on('bMenu:changeVar', (...args) => menu.changeVar(...args))
    alt.on('bMenu:changeVar2', (...args) => menu.changeVar2(...args))
    alt.on('bMenu:changeArgument', (...args) => menu.changeArgument(...args))
    alt.on('bMenu:useFunction', (...args) => menu.useFunction(...args))
    alt.on('bMenu:fUpdateLobby', async (data) => menu.fUpdateLobby(data));
    alt.on('bMenu:updateWinScreen', (data) => {
        menu.wsWin = data.wsWin;
        menu.place = data.place;
        menu.placeAll = data.placeAll;
        menu.killsInMatch = data.kills;
        if (menu.killsInMatch < 0) menu.killsInMatch = 0;
        menu.plusMoney = data.plusMoney;
        menu.lifeTime = data.lifeTime;
    });

    alt.on('bMenu:reCalcWinScreen', (data) => {
        menu.wsWin = data.wsWin;
        menu.place = data.place;
        menu.plusMoney += +data.plusMoney;
        menu.bonusMoney += +data.bonusMoney;
    });

    alt.on('bMenu:updateRank', (obj) => {
        menu.elo = obj.elo;
        menu.kills = obj.kills;
        menu.matches = obj.matches;
        menu.lastMatch = obj.lastMatch;
        menu.wins = obj.wins;
        menu.hours = obj.hours;

        menu.getLevel();
    });

    alt.on('bMenu:updateCash', (cash, cashRM) => {
        menu.money = cash;
        menu.moneyRM = cashRM;
    });

    // Friends
    alt.on('bMenu:updateFriends', (friends, requestsIn, requestsOut) => {
        menu.friends = [];
        if (friends != null) JSON.parse(friends).forEach(el => menu.friends.push({
            name: el,
            online: false
        }));
        // //console.log(`updateFriends: ${JSON.stringify(menu.friends)}`)
        if (requestsIn != null) menu.requestsIn = JSON.parse(requestsIn);
        if (requestsOut != null) menu.requestsOut = JSON.parse(requestsOut);
        setTimeout(() => {
            menu.translateSubPages()
        }, 1000)
        //console.log(`menu.requestsOut: ${menu.requestsOut}`)
        // menu.updateOnline(allPlayers); 
    })

    alt.on('bFriends:remove', (variable, nickName) => {
        //console.log(`bFriends:remove: ${variable}; ${nickName}`)
        menu[variable] = menu[variable].filter(el => el !== nickName);
    });

    alt.on('bFriends:updateOnline', (allPlayers) => menu.updateOnline(allPlayers))
    alt.on('bMenu:updateCars', (list, selected) => menu.updateCars(list, selected))
    alt.on('bMenu:setPreviewCar', () => menu.setPreviewCar())
    alt.on('bMenu:fInviteToLobby', (lobbyID, myData) => menu.fInviteToLobby(lobbyID, myData))
    alt.on('bMenu:fLeaveLobby', () => menu.fLeaveLobby(true))

    alt.on('bMenu:applyTuning', (car) => menu.fApplyTuning(car))

    //EMIT 
    alt.on('bMenu:callBackEmitToServer', (variable, value) => menu.callBackEmitToServer(variable, value));
    alt.emit('changeVarOnClient', ['page', menu.page])
} else {
    menu.show = true;
    menu.carsPointer = 1;
    setTimeout(async () => {
        menu.myAvatar = await menu.getPhoto('287911323130396673/ff8e10f4425b81c3d5c4c7440e3fae35');
        menu.getLevel();
        menu.allPlayers = ['Dark', 'Dsrsa', 'Dakr', 'Daaa', 'Daq', 'Dav', 'Das', 'Dac']
        menu.friends = [{
                name: 'DARKLEGEND',
                online: true
            }, {
                name: 'Vanya',
                online: true
            },
            {
                name: 'Dima',
                online: true
            },
            {
                name: 'Dima2',
                online: true
            }
        ]
        menu.adminCurrentReport = {id: 21, authorID: 17, type: 2, msg: '18', dateCreate: 1626731216981, result: 4, resultMsg: null, adminID: 17}
        menu.reportPlayers = [{id: 17, authorID: 17, type: 2, msg: '18', dateCreate: 1626731216981, result: 3}, {id: 25, authorID: 17, type: 2, msg: '18', dateCreate: 1626731216981, result: 0}, {id: 35, authorID: 17, type: 2, msg: '18', dateCreate: 1626731216981, result: 0}, {id: 45, authorID: 17, type: 2, msg: '18', dateCreate: 1626731216981, result: 0}, {id: 22, authorID: 17, type: 2, msg: '18', dateCreate: 1626731216981, result: 0}, {id: 18, authorID: 17, type: 0, msg: '12113333333333333333333333333333333333333333', dateCreate: 1626731216981,  result: 1},]
        menu.requestsIn = ['DarkLegend', 'Res1ce', 'Obliko', 'Vanya', 'ADS', 'D2arkLegend', 'Res21ce', 'Obliko2', 'Van2ya', 'AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG']
        menu.requestsOut = ['DarkLegend', 'Res1ce', 'Obliko', 'Vanya', 'ADS', 'D2arkLegend', 'Res21ce', 'Obliko2', 'Van2ya', 'AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG']
        // menu.requestsOut = ['DarkLegend']
        menu.fUpdateLobby([{
                name: "DARKLEGEND",
                ready: -1,
                inGame: true,
                mic: false
            },
            {
                name: "Dima",
                ready: 1,
                inGame: true,
                mic: false 
            }
        ]) 
        // menu.fUpdateLobby([{name: "Player-1", ava: 1}, {name: "Player-2", ava: 2}, {name: "DarkLegend", ava: 1}]) // Если хочешь пригласить чтобы кнопка появилась
        // menu.wsWin = true
        menu.bell = [{id: 1, msg: "TICKET#7: 'Не открывать сервер': С такими предложениями мы посылаем нахуй", type: 1}, 
        {id: 2, msg: "Вам поступил запрос в друзья", type: 0},{id: 4, msg: "Вам поступил запрос в друзь2", type: 3},{id: 3, msg: "Вам поступил запрос в друзь3", type: 4},]
        menu.switchPage(0, 0) 
        // menu.switchPage(4, 1)
        menu.plusMoney = 5
        menu.bonusMoney = 5 
        menu.wsWin = true
        // menu.fInviteToLobby(1, [{name: "Player", ready: 0}, {name: "Resce", ready: 0}, {name: "DarkLegend", ready: 1}])
        // menu.statusGame = true;
    }, 100)
    document.getElementById('body').style.backgroundImage = "url(./img/fon.png)"
    document.body.style.cursor = "auto"
    menu.disableCursor = true
    menu.placeAll = 3;
    menu.place = 2;
    menu.vip = 'deluxe'
    menu.carsPointer = 1
    menu.cars[1].price = -1
    // menu.anyVar = 34 //УБРАТЬ!
        setTimeout(() => { 
            menu.reportType = 0
            if(menu.page !== 2) return;
            menu.initColor()
    }, 800)
    menu.adminLevel = 1
} 
menu.i18nTemp = JSON.stringify(menu.i18n);
menu.loadLang();
document.addEventListener('keydown', function (event) {
    menu.fKeyDown(event.keyCode) 
});

// document.addEventListener('mousedown', e => {
//     if(e.button === 2) //console.log(`mousedown: CLICK!`) 
//   });
// document.addEventListener('mouseup', e => {
//     if(e.button === 2) 
//     {
//         menu.emit('showCursor', false)  
//         //console.log(`mouseup: CLICK!`)
//         menu.fCheckCursor()
//     }
//   });
menu.cars.forEach((el, index) => {
    menu.cars[index].price2 = JSON.stringify(el.price)
})
// window.addEventListener('resize', function(){
//     //console.log('resize')
//   }); 