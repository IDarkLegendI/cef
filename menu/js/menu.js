var menu = new Vue({
    el: '#body',
    data: {
        show: false,
        page: 0, //НЕ МЕНЯЙ ТУТ НИХУЯ, ИДИ ВНИЗ СТРАНИЦЫ
        subPage: 0, //
        nextSubPage: -1,

        //money
        money: 0,

        //SETTINGS
        lang: 'ru',
        vr: false, //true, чтобы вр подрубить,
        sizeMap: 0,
        quickWeapon: 0,
        volume: 0.1,
        keyMapSize: 90,
        keyQuickMarker: 88,
        keySitDown: 17,

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
        myName: "Player",
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
        onlyMyCars: false,
        cars: [{
                name: 'None',
                model: 'none',
                price: 0
            }, {
                name: 'Lamborghini Performante 18',
                model: '18performante',
                price: 275000
            }, {
                name: 'T-20',
                model: 't20',
                price: 270000
            },
            {
                name: 'Porsche-811',
                model: 'pfister811',
                price: 90000
            }, {
                name: 'Dubsta 6x6',
                model: 'dubsta3',
                price: 54000
            }, {
                name: 'Lamborghini Urus',
                model: 'urus',
                price: 178000
            },
            {
                name: 'Porsche Taycan',
                model: 'taycan',
                price: 178000
            }, {
                name: 'Tesla Model X',
                model: 'teslax',
                price: 185000
            }, {
                name: 'Bentley Bentayga',
                model: 'bentayga17',
                price: 33000
            },
            {
                name: 'RHAPSODY',
                model: 'rhapsody',
                price: 15000
            }, {
                name: 'ISSI',
                model: 'issi6',
                price: 16500
            }, {
                name: 'OCELOT',
                model: 'f620',
                price: 20000
            }, {
                name: 'EXEMPLAR',
                model: 'exemplar',
                price: 21500
            }, {
                name: 'COGCABRIO',
                model: 'cogcabrio',
                price: 21000
            },
            {
                name: 'SENTINEL',
                model: 'felon2',
                price: 20000
            }, {
                name: 'FBI',
                model: 'fbi',
                price: 36500
            }, {
                name: 'COQUETTE',
                model: 'coquette3',
                price: 17950
            }, {
                name: 'DOMINATOR',
                model: 'dominator3',
                price: 45000
            }, {
                name: 'HERMES',
                model: 'hermes',
                price: 28000
            },
            {
                name: 'DUBSTA',
                model: 'dubsta2',
                price: 49000
            }, {
                name: 'BANSHEE',
                model: 'banshee',
                price: 50000
            }, {
                name: 'Nissan GT-R',
                model: '17r35',
                price: 52000
            },
            {
                name: 'COQUETTE',
                model: 'coquette4',
                price: 70000
            }, {
                name: 'DEVESTE',
                model: 'deveste',
                price: 170000
            }, {
                name: 'ELEGY',
                model: 'elegy2',
                price: 28500
            },
            {
                name: 'HOTRING',
                model: 'hotring',
                price: 65000
            }, {
                name: 'ITALI',
                model: 'italigto',
                price: 90000
            }, {
                name: 'NEON',
                model: 'neon',
                price: 275000
            }, {
                name: 'NINEF',
                model: 'ninef2',
                price: 130000
            },
            {
                name: 'OMNIS',
                model: 'omnis',
                price: 30000
            }, {
                name: 'SCHLAGEN',
                model: 'schlagen',
                price: 120000
            }, {
                name: 'SENTINEL',
                model: 'sentinel3',
                price: 23000
            },
            {
                name: 'SPECTER',
                model: 'specter2',
                price: 125000
            }, {
                name: 'VERLIERER',
                model: 'verlierer2',
                price: 85000
            },
            {
                name: 'SAVESTRA',
                model: 'savestra',
                price: 35000
            }, {
                name: 'SWINGER',
                model: 'swinger',
                price: 135000
            }, {
                name: 'TURISMO',
                model: 'turismo2',
                price: 115000
            },
            {
                name: 'ADDER',
                model: 'adder',
                price: 190000
            }, {
                name: 'CYCLONE',
                model: 'cyclone',
                price: 210000
            }, {
                name: 'ENTITYXF',
                model: 'entityxf',
                price: 200000
            },
            {
                name: 'FMJ',
                model: 'fmj',
                price: 230000
            }, {
                name: 'ITALIGTD',
                model: 'italigtb2',
                price: 245000
            }, {
                name: 'NERO',
                model: 'nero2',
                price: 255000
            },
            {
                name: 'REAPER',
                model: 'reaper',
                price: 260000
            }, {
                name: 'TEMPESTA',
                model: 'tempesta',
                price: 262000
            }, {
                name: 'SHEAVA',
                model: 'sheava',
                price: 220000
            },
            {
                name: 'TYRUS',
                model: 'tyrus',
                price: 235000
            }, {
                name: 'XA-21',
                model: 'xa21',
                price: 270000
            }, {
                name: 'TROPHYTRUCK',
                model: 'trophytruck',
                price: 70000
            },
            {
                name: 'ZENTORNO',
                model: 'zentorno',
                price: 220000
            }, {
                name: 'SHOTARO',
                model: 'shotaro',
                price: 280000
            },
            {
                name: 'SANCTUS',
                model: 'sanctus',
                price: 80000
            }, {
                name: 'VORTEX',
                model: 'vortex',
                price: 110000
            },
            {
                name: 'ENDURO',
                model: 'enduro',
                price: 29000
            }, {
                name: 'BATI',
                model: 'bati',
                price: 47500
            }, {
                name: 'Porsche Turismo',
                model: 'pturismo',
                price: 300000
            },
        ].sort((a, b) => a.price - b.price),
        carsPointer: 0,
        myCar: 'none',
        camRotation: -90,
        oldColor: [0, 0, 0, 'none'],
        updateTuning: false,

        //Admin
        adminLevel: 0,

        //Inventory

        //Misc
        miscInput: '',
        coolDown: false,

        //Shop
        moneyRM: 0,
        converterRM: 0,
        converterD: 0,
        assortPriv: {
            vip: {
                name: 'VIP',
                k: 5,
            },
            premium: {
                name: 'PREMIUM',
                k: 10,
            },
            deluxe: {
                name: 'DELUXE',
                k: 16.65,
            },
        },
        assortSelected: 'vip',

        //EndGame
        wsWin: false,
        phrase: '«Я требую продолжения банкета!»',
        killsInMatch: 0,
        // elo: 0, 
        place: 0,
        placeAll: 0,
        plusMoney: 0,
        lifeTime: 0, //Минут

        //VIP
        vip: 'deluxe',

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
            managmentSub: 'MANAGE SUBSCRIPTIONS',
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
            money: 'MONEY',
            rank: 'RANK',
            backmatch: 'For the previous match',
            score: 'SCORE',
            wins: 'WINS',
            hours: 'PLAYED HOURS',
            awards: 'AWARDS',
            gifts: 'Get gifts',
            person: 'THE CHARACTER',
            custom: 'CASTOMIZATION',
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
            menuMode: 'MODE IN MENU',
            sizeMap: 'SIZE MAP',
            small: 'Small',
            normal: 'Normal',
            big: 'Big',
            btnBack: 'BACK',
            leavelobby: 'LEAVY LOBBY',
            buy: 'BUY',
            select: 'SELECT',
            selected: 'SELECTED',
            none: 'NOT SELECTED',
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
            onlyMyCars: "ONLY MY CARS"
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
        jetPackSkins: {
            'vip': [0, 36, 35, 34, 33, 32, 28, 27, 25, 23, 22, 20, 19, 16, 14],
            'premium': [37, 31, 29, 24, 21, 17, 15, 9, 8, 7, 6, 5, 3],
            'deluxe': [40, 39, 38, 30, 26, 2, 21, 37, 1, 4, 11, 12, 10] 
        }
    },
    methods: {
        emitServer: function (eventName, ...args) {
            // console.log(...args)
            if ('alt' in window) alt.emit('emitToServer', eventName, ...args)
        },
        emitToServerWithWT: function (wt = 250, eventName, ...args) {
            // console.log(...args)
            if ('alt' in window) alt.emit('emitToServerWithWT', wt, eventName, ...args)
        },
        waitEmitToServer: function (variable, valueTrue, valueFalse, ...args) {
            // console.log(...args)
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
                console.log(`callBackEmitToServer: ${this.cars[this.carsPointer].model}; ${this.oldColor[3]} --> ${this.cars[this.carsPointer].model !== this.oldColor[3]}`)
                if (this.cars[this.carsPointer].model !== this.oldColor[3]) {
                    menu.oldColor = [this.cars[this.carsPointer].color.r, this.cars[this.carsPointer].color.g, this.cars[this.carsPointer].color.b,
                        this.cars[this.carsPointer].model
                    ];
                    this.updateTuning = false;
                }
                // console.log(`callBackEmitToServer: ${JSON.stringify(this.oldColor)}; model: ${this.cars[this.carsPointer].model}; this.updateTuning: ${this.updateTuning}`)
                initColor();
                ColorPicker();
                setTimeout(() => {
                    initColor();
                    ColorPicker();
                    colorToPos('rgb ' + this.cars[this.carsPointer].color.r + ' ' + this.cars[this.carsPointer].color.g + ' ' + this.cars[this.carsPointer].color.b)
                }, 100)
            } else menu[variable] = value;
            // console.log(this.cars[this.carsPointer].model)  
        },
        emitToClient: function (eventName, ...args) {
            // console.log(...args)  
            if ('alt' in window) alt.emit('emitToClient', eventName, ...args)
        },
        emit: function (value, ...args) {
            // console.log(`emit: ${value} -> ${args[0]}`) 
            if ('alt' in window) alt.emit(value, ...args)
        },
        //Изменяет необходимые аргументы. Входные данные: ['nameVar', value], ...
        changeVar(...args) {
            console.log(`changeVar: ${JSON.stringify(...args)}`)
            args.forEach(el => {
                console.log(`changeVar(0): ${JSON.stringify(el)}`)
                console.log(`changeVar(1): menu.${el[0]} = ${el[1]}`)
                menu[el[0]] = el[1];
                console.log(`changeVar: ${menu[el[0]]}`)
            })
        },
        useFunction(name, ...args) {
            return menu[name](...args);
        },
        saveSettings(page) {
            console.log(`saveMenu`)
            if (page != -1) this.switchPage(page);
            if ('alt' in window) {
                alt.emit('saveSettings', {
                    lang: this.lang,
                    vr: this.vr,
                    sizeMap: this.sizeMap,
                    quickWeapon: this.quickWeapon,
                    volume: this.volume,
                    keyMapSize: this.keyMapSize,
                    keyQuickMarker: this.keyQuickMarker,
                    keySitDown: this.keySitDown,
                })
            }
        },
        switchPage(newPage, newSubPage = -1) {
            this.resetPage(newPage, newSubPage).then(() => {
                if (this.subPage === -2) return;

                console.log(`switchPage: ${newPage}; ${newSubPage}`)
                // if(('alt' in window) && (newPage > 1 || newSubPage > 1)) return;
                if (newSubPage != -1 || this.nextSubPage !== -1) {
                    // if(newPage == 0) return this.subPage = newSubPage;
                    this.page = newPage;
                    this.subPage = -2;
                    setTimeout(() => {
                        if (this.nextSubPage !== -1) {
                            this.subPage = this.nextSubPage;
                            this.nextSubPage = -1;
                        } else this.subPage = newSubPage;
                    }, 350)
                } else {
                    this.page = newPage;
                    if (this.coolDown) return;
                    this.coolDown = true;
                    setTimeout(() => {
                        this.coolDown = false;
                        this.subPage = 0;
                    }, 150);
                }
            })
        },

        async resetPage(newPage, newSubPage) {
            if (this.page === 2 && newPage === 0) {
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
                // console.log(`reset: ${JSON.stringify(this.anyVarSecond)}`)
                // console.log(this.anyVarSecond.length)
                this.emitToClient('cJetPack:update'); // this.anyVar - выбранный скин джетпака
            }
            // else  
            // { 
            //     this.anyVar = null;
            //     this.anyVarSecond = null;
            //     this.anyVarC = null;
            // }
            this.recordKey = false;
            if (this.page === 5 && newPage === 0) this.wsWin = false
        },

        fLoadJP(selected) {
            this.anyVar = selected[0];
            this.anyVarC = selected;

            if (this.anyVarSecond.length > 0) {
                this.carsPointer = this.anyVarSecond.findIndex(el => el === this.anyVar)
                console.log(this.carsPointer)
            }
            if(this.anyVarC[0] === this.anyVarSecond[this.carsPointer] && this.anyVarC[1].r !== this.anyVarC[2].r)  
            {
                menu.emitServer('sCar:preview', { 
                    model: 'thruster',
                    color: this.anyVarC[1],
                    color2: this.anyVarC[2],  
                }, 48, this.anyVarSecond[this.carsPointer]);
            }
            else
            {
                menu.emitServer('sCar:preview', {
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
            console.log(JSON.stringify(data))
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

        fInviteToLobby(lobbyID, myData) {
            this.lobbyID = lobbyID;
            this.myData = myData;
            if (this.page !== 0 || !menu.show) //Если игрок не на главной странице
            {
                this.emitToClient('notifyI18n', '4', 'menu', 'inviteToLobby', '5000');
                this.nextSubPage = 4;
            } else this.switchPage(0, 4);

            setTimeout(() => {
                if (this.lobbyID === lobbyID && this.myData === myData) {
                    this.answerInvite(false)
                }
            }, 30000)
        },

        answerInvite(value) {
            this.emitServer('sLobby:answerInvite', value, this.lobbyID)
            this.lobbyID = 0;
            this.myData = null;
            this.switchPage(0, 0);
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
            // console.log(`allPlayers: ${allPlayers}`)
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
        loadLang() {
            if (this.lang === 'ru') this.loadRu();
            else this.loadEn();
        },
        loadRu() {
            document.getElementById('inputAddFriend').placeholder = "Введите NickName"
            menu.i18n = {
                balance: 'Баланс',
                personal: 'ЛИЧНЫЙ',
                managerCars: 'Управляйте своими машинами',
                transport: 'ТРАНСПОРТ',
                ready: 'ГОТОВ',
                notready: 'НЕ ГОТОВ',
                inGame: 'В ИГРЕ',
                topap: 'ПОПОЛНИТЬ БАЛАНС',
                managmentSub: 'УПРАВЛЕНИЕ ПОДПИСКАМИ',
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
                money: 'ДЕНЬГИ',
                rank: 'РАНГ',
                backmatch: 'За предыдущий матч',
                score: 'ОЧКИ',
                wins: 'ПОБЕД',
                hours: 'НАИГРАНО ЧАСОВ',
                awards: 'НАГРАДЫ',
                gifts: 'Получай подарки',
                person: 'ПЕРСОНАЖ',
                custom: 'КАСТОМИЗАЦИЯ',
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
                menuMode: 'РЕЖИМ В МЕНЮ',
                sizeMap: 'РАЗМЕР КАРТЫ',
                small: 'Маленький',
                normal: 'Средний',
                big: 'Большой',
                btnBack: 'НАЗАД',
                leavelobby: 'ВЫЙТИ',
                buy: 'КУПИТЬ',
                select: 'ВЫБРАТЬ',
                selected: 'ВЫБРАНО',
                none: 'НЕ ВЫБРАНО',
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
                acceptAction: "ПОДВЕРДИТЕ ДЕЙСТВИЕ",
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
            }
        },
        loadEn() {
            document.getElementById('inputAddFriend').placeholder = "Input NickName"
            menu.i18n = JSON.parse(menu.i18nTemp);
        },
        updateCars(list, selected) {
            console.log(`LIST: ${JSON.stringify(list)}; selected: ${JSON.stringify(selected)}`)
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
                if (found != -1) {
                    this.cars[found].price = 0;
                    this.cars[found].color = carOfList.color;
                }
            })

            //Выставляем новый выбор
            foundIndex = this.cars.findIndex(el => el.model === selected.model);
            console.log(`foundIndex: ${foundIndex}; ${selected.model}`)
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
        setPreviewCar(pointer = null) {
            if (pointer === null) {
                pointer = this.cars.findIndex(el => el.price === -1)
                if (pointer === -1) pointer = 0;
                this.carsPointer = pointer;
            }
            menu.emitServer('sCar:preview', {
                model: this.cars[pointer].model,
                color: this.cars[pointer].color
            });
            // console.log(`setPreviewCar: ${this.cars[this.carsPointer].model}; ${this.oldColor[3]} --> ${this.cars[this.carsPointer].model !== this.oldColor[3]}`)
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
                if (el) el.style.backgroundColor = 'rgb(' + this.cars[this.carsPointer].color.r + ',' + this.cars[this.carsPointer].color.g + ',' + this.cars[this.carsPointer].color.b + ')';
            }

            // console.log(`this.updateTuning: ${this.updateTuning}`)  

            setTimeout(() => {
                initColor();
                ColorPicker();
                if (!this.cars[pointer].color) this.cars[pointer].color = {
                    r: 255,
                    g: 255,
                    b: 255
                }
                colorToPos('rgb ' + this.cars[pointer].color.r + ' ' + this.cars[pointer].color.g + ' ' + this.cars[pointer].color.b)
            }, 100)
        },
        sortLiveCar(plus, onlyMyCarsClick)
        {
            console.log(`sortLiveCar: ${onlyMyCarsClick}; ${this.onlyMyCars}`)
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
                if(this.maxSort === 0)
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
                    console.log(`${result} === ${this.cars.length-1} --> ${result === this.cars.length-1}`)
                    if(result === this.cars.length-1) break;
                    console.log(`result(maxSort): ${result}`)
                    result -= +1;
                }
                while(this.cars[result].price < this.minSort)
                {
                    if(this.cars[result].price === -1) break;
                    console.log(`${result} === ${this.cars.length-1} --> ${result === this.cars.length-1}`)
                    if(result === this.cars.length-1) break;
                    console.log(`result(minSort): ${result}`)
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
                        console.log(`${this.cars[result].price === -1}`)
                        if(this.cars[result].price === -1) break;
                        console.log(`${result} === ${this.cars.length-1} --> ${result === this.cars.length-1}`)
                        if(result === this.cars.length-1) break;
                        console.log(`result(maxSort): ${result}`)
                        result -= +1;
                    }
                }
                result -= 1;
                console.log(`${this.cars[result].price} | ${this.minSort}`)
                if(this.cars[result].price < this.minSort) 
                { 
                    // result += +1;
                    while(this.cars[result].price < this.minSort) 
                    {
                        console.log(`${this.cars[result].price === -1}`)
                        if(this.cars[result].price === -1) break;
                        console.log(`${result} === ${this.cars.length-1} --> ${result === this.cars.length-1}`)
                        if(result === this.cars.length-1) break;
                        console.log(`result(minSort): ${result}`)
                        result += +1;
                    }
                }
            }
            console.log(`result: ${this.cars[result].price} | min: ${this.minSort} | max: ${this.maxSort}`)
            if(this.cars[result].price !== -1 && (this.minSort > this.cars[result].price || this.maxSort < this.cars[result].price)) this.minSort = this.maxSort = this.cars[result].price

            return result; 
        },
        previewCar(plus, name = 'cars', onlyMyCarsClick = 1) {
            // if(!this.fCoolDown()) return;
            console.log(`previewCar: ${plus}; ${name}; this.carsPointer: ${this.carsPointer};`) 
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
                console.log(`${valueTrue} | ${valueFalse} | ${this.anyVarSecond[valueTrue]}`)
                // if(valueTrue === valueFalse) this.carsPointer = -1
                // else this.carsPointer = valueTrue

                this.carsPointer = valueTrue;  
                let speicalSkins = [2, 21, 37, 1, 4, 11, 12, 10]
                console.log(`this.anyVarSecond: ${this.anyVarSecond[valueTrue]}; ${this.anyVarC[0] === this.anyVarSecond[valueTrue]}; ${this.anyVarC[1].r === this.anyVarC[2].r}`)
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
            console.log(`fApplyTuning: ${JSON.stringify(car)}`)
            let found = this.cars.findIndex(veh => veh.model === car.model)
            if (!found) return;
            console.log(`fApplyTuning: found: ${found}`);
            this.cars[found].color = car.color;
            this.oldColor = [car.color.r, car.color.g, car.color.b, car.model]
            this.updateTuning = false;

        },
        request(friend, type, event = 'sFriends:rejectRequest') {
            if (type === 'friends') this[type] = this[type].filter(el => el.name !== friend)
            else this[type] = this[type].filter(el => el !== friend)
            this.emitServer(event, friend, type);
        },
        fCoolDown() {
            if (this.coolDown) {
                this.emit('customNotify', 4, 'Прекратите флудить!')
                return false;
            }
            this.coolDown = true;
            setTimeout(() => {
                this.coolDown = false;
            }, 500)
            return true;
        },
        findFriend() {
            // console.log(`allPlayers: ${this.allPlayers}`)
            // console.log(`requestsOut: ${this.requestsOut}`)
            // console.log(`myName: ${this.myName}`)
            // console.log(`this.friends: ${JSON.stringify(this.friends)}`)
            return this.allPlayers.filter(el => {
                    let count = 0;
                    for (let i = 0; i < this.miscInput.length; i++) {
                        if (el[i].toLowerCase() === this.miscInput[i].toLowerCase()) count++;
                    }
                    // console.log(`count: ${count} === ${this.miscInput.length}`)
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
            // console.log(this.camRotation)  
            this.emit('cCar:rotation', value);
            // mp.trigger("cChangeHeading", this.camRotation);
        },
        changeConverter: function (nameOut, nameIn, k) {
            this[nameOut] = Math.round(this[nameIn] * +k);
        }
    },
});

if ('alt' in window) {
    alt.on('toggle', toggle => {
        menu.show = toggle;
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
        // console.log(name)
        menu.myName = name;
        menu.fUpdateLobby([{
            name: menu.myName,
            ava: menu.myAvatar,
            ready: -2
        }]);
    });

    alt.on('bMenu:setMyAvatar', async (avatar) => {
        // console.log(`bMenu:setMyAvatar: ${avatar}`)  
        menu.myAvatar = await menu.getPhoto(avatar)
        menu.fUpdateLobby([{
            name: menu.myName,
            ava: menu.myAvatar,
            ready: -2
        }]);
    });

    alt.on('bMenu:changeVar', (...args) => menu.changeVar(...args))
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
        console.log(`updateFriends: ${JSON.stringify(menu.friends)}`)
        if (requestsIn != null) menu.requestsIn = JSON.parse(requestsIn);
        if (requestsOut != null) menu.requestsOut = JSON.parse(requestsOut);
        console.log(`menu.requestsOut: ${menu.requestsOut}`)
        // menu.updateOnline(allPlayers); 
    })

    alt.on('bFriends:remove', (variable, nickName) => {
        console.log(`bFriends:remove: ${variable}; ${nickName}`)
        menu[variable] = menu[variable].filter(el => el !== nickName);
    });

    alt.on('bFriends:updateOnline', (allPlayers) => menu.updateOnline(allPlayers))
    alt.on('bMenu:updateCars', (list, selected) => menu.updateCars(list, selected))
    alt.on('bMenu:setPreviewCar', () => menu.setPreviewCar())
    alt.on('bMenu:fInviteToLobby', (lobbyID, myData) => menu.fInviteToLobby(lobbyID, myData))
    alt.on('bMenu:fLeaveLobby', () => menu.fLeaveLobby(true))

    alt.on('bMenu:applyTuning', (car) => menu.fApplyTuning(car))

    //EMIT 
    alt.on('bMenu:callBackEmitToServer', (variable, value) => menu.callBackEmitToServer(variable, value))
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
            }
        ]
        // menu.requestsIn = ['DarkLegend', 'Res1ce', 'Obliko', 'Vanya', 'ADS', 'D2arkLegend', 'Res21ce', 'Obliko2', 'Van2ya', 'AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG']
        // menu.requestsOut = ['DarkLegend', 'Res1ce', 'Obliko', 'Vanya', 'ADS', 'D2arkLegend', 'Res21ce', 'Obliko2', 'Van2ya', 'AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG']
        // menu.requestsOut = ['DarkLegend']
        menu.fUpdateLobby([{
                name: "DARKLEGEND",
                ready: 2
            },
            {
                name: "Dima",
                ready: 1
            }
        ])
        // menu.fUpdateLobby([{name: "Player-1", ava: 1}, {name: "Player-2", ava: 2}, {name: "DarkLegend", ava: 1}]) // Если хочешь пригласить чтобы кнопка появилась
        // menu.wsWin = true
        menu.switchPage(5, 0)
        // menu.fInviteToLobby(1, [{name: "Player", ready: 0}, {name: "Resce", ready: 0}, {name: "DarkLegend", ready: 1}])
        // menu.statusGame = true;
    }, 100)
    document.getElementById('body').style.backgroundImage = "url(./img/fon.png)"
    document.body.style.cursor = "default"
    menu.placeAll = 3;
    menu.place = 2;
    // menu.anyVar = 34 //УБРАТЬ!
        setTimeout(() => {
            if(menu.page !== 2) return;
            initColor();
            ColorPicker(); 
    }, 800)
}
menu.i18nTemp = JSON.stringify(menu.i18n);
menu.loadLang();
document.addEventListener('keyup', function (event) {
    // console.log(event.keyCode)
    // console.log(menu.keyCodes[event.keyCode])
    // if (menu.recordKey !== false && menu.Object.keys(menu.keyCodes).some(el => el === event.code)) 
    if (menu.recordKey !== false) {
        if (event.keyCode === 27) return menu.recordKey = false;
        if (menu.keyCodes[event.keyCode] !== undefined) {
            let count = 0;
            if (menu.keySitDown === event.keyCode) count += +1;
            if (menu.keyQuickMarker === event.keyCode) count += +1;
            if (menu.keyMapSize === event.keyCode) count += +1;

            if (count > 0) this.emitToClient('notifyI18n', '1', 'menu', 'keyBusy', '5000');
            else {
                menu[menu.recordKey] = event.keyCode;
                menu.recordKey = false;
            }
        }
    }
});
// window.addEventListener('resize', function(){
//     console.log('resize')
//   }); 