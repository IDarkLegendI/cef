var menu = new Vue({
    el: '#body',
    data: {
        show: false,
        page: 0, //НЕ МЕНЯЙ ТУТ НИХУЯ, ИДИ ВНИЗ СТРАНИЦЫ
        subPage: 0, //

        //money
        money: 0,

        //SETTINGS
        enableVR: false, //true, чтобы вр подрубить,
        sizeMap: 0,
        quickWeapon: 0,

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
        cars: [{name: 'None', model: 'none', price: 0}, {name: 'X-80 PROTO', model: 'prototipo', price: 275000}, {name: 'T-20', model: 't20', price: 270000},
        {name: 'Porsche-811', model: 'pfister811', price: 90000}, {name: 'Dubsta 6x6', model: 'dubsta3', price: 54000}, {name: 'Lamborghini Urus', model: 'urus', price: 178000},
        {name: 'Porsche Taycan', model: 'taycan', price: 178000}, {name: 'Tesla Model X', model: 'teslax', price: 185000}, {name: 'Bentley Bentayga', model: 'bentayga17', price: 33000},
        {name: 'RHAPSODY', model: 'rhapsody', price: 15000}, {name: 'ISSI', model: 'issi6', price: 16500}, {name: 'OCELOT', model: 'f620', price: 20000}, {name: 'EXEMPLAR', model: 'exemplar', price: 21500}, {name: 'COGCABRIO', model: 'cogcabrio', price: 21000},
        {name: 'SENTINEL', model: 'felon2', price: 20000}, {name: 'FBI', model: 'fbi', price: 36500}, {name: 'COQUETTE', model: 'coquette3', price: 17950}, {name: 'DOMINATOR', model: 'dominator3', price: 45000}, {name: 'HERMES', model: 'hermes', price: 28000},
        {name: 'DUBSTA', model: 'dubsta2', price: 49000}, {name: 'BANSHEE', model: 'banshee', price: 50000}, {name: 'Nissan GT-R', model: '17r35', price: 52000},
        {name: 'COQUETTE', model: 'coquette4', price: 70000}, {name: 'DEVESTE', model: 'deveste', price: 170000}, {name: 'ELEGY', model: 'elegy2', price: 28500},
        {name: 'HOTRING', model: 'hotring', price: 65000}, {name: 'ITALI', model: 'italigto', price: 90000}, {name: 'NEON', model: 'neon', price: 275000}, {name: 'NINEF', model: 'ninef2', price: 130000},
        {name: 'OMNIS', model: 'omnis', price: 30000}, {name: 'SCHLAGEN', model: 'schlagen', price: 120000}, {name: 'SENTINEL', model: 'sentinel3', price: 23000},
        {name: 'SPECTER', model: 'specter2', price: 125000}, {name: 'VERLIERER', model: 'verlierer2', price: 85000},
        {name: 'SAVESTRA', model: 'savestra', price: 35000}, {name: 'SWINGER', model: 'swinger', price: 135000}, {name: 'TURISMO', model: 'turismo2', price: 115000},
        {name: 'ADDER', model: 'adder', price: 190000}, {name: 'CYCLONE', model: 'cyclone', price: 210000}, {name: 'ENTITYXF', model: 'entityxf', price: 200000},
        {name: 'FMJ', model: 'fmj', price: 230000}, {name: 'ITALIGTD', model: 'italigtb2', price: 245000}, {name: 'NERO', model: 'nero2', price: 255000},
        {name: 'REAPER', model: 'reaper', price: 260000}, {name: 'TEMPESTA', model: 'tempesta', price: 262000}, {name: 'SHEAVA', model: 'sheava', price: 220000},
        {name: 'TYRUS', model: 'tyrus', price: 235000}, {name: 'XA-21', model: 'xa21', price: 270000}, {name: 'TROPHYTRUCK', model: 'trophytruck', price: 70000},
        {name: 'ZENTORNO', model: 'zentorno', price: 220000}, {name: 'SHOTARO', model: 'shotaro', price: 280000},
        {name: 'SANCTUS', model: 'sanctus', price: 80000}, {name: 'VORTEX', model: 'vortex', price: 110000},
        {name: 'ENDURO', model: 'enduro', price: 29000}, {name: 'BATI', model: 'bati', price: 47500}, {name: 'Porsche Turismo', model: 'pturismo', price: 300000}, ].sort((a, b) => a.price - b.price),
        carsPointer: 0,
        myCar: 'none',
        camRotation: 0,
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

        //EndGame
        wsWin: true,
        killsInMatch: 0,
        // elo: 0, 
        place: 0,
        placeAll: 0,
        plusMoney: 0,
        lifeTime: 0, //Минут

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
        },
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
    },
    methods: {
        emitServer: function (eventName, ...args) {
            // console.log(...args)
            if ('alt' in window) alt.emit('emitToServer', eventName, ...args)
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
        emitToClient: function (...args) {
            // console.log(...args)
            if ('alt' in window) alt.emit('emitToClient', ...args)
        },
        emit: function (value, ...args) {
            // console.log(`emit: ${value} -> ${args[0]}`) 
            if ('alt' in window) alt.emit(value, ...args)
        },
        saveSettings(page) {
            if (page != -1) this.switchPage(page);
            if ('alt' in window) {
                alt.emit('saveSettings', {
                    vr: this.enableVR,
                    sizeMap: this.sizeMap,
                    quickWeapon: this.quickWeapon,
                })
            }
        },
        switchPage(newPage, newSubPage = -1) {
            if (this.subPage === -2) return;

            console.log(`switchPage: ${newPage}; ${this.page}`)
            if (newPage === 0 && this.page === 2) {
                menu.emit('cCar:setCarPreview', false)
                this.cars[this.carsPointer].color = {
                    r: this.oldColor[0],
                    g: this.oldColor[1],
                    b: this.oldColor[2]
                }
            }
            // if(('alt' in window) && (newPage > 1 || newSubPage > 1)) return;
            if (newSubPage != -1) {
                // if(newPage == 0) return this.subPage = newSubPage;
                this.page = newPage;
                if (newSubPage != -1) {
                    this.subPage = -2;
                    setTimeout(() => {
                        this.subPage = newSubPage;
                    }, 350)
                }
            } else {
                // console.log('switchPage: ' + newPage); 
                if (this.coolDown) return;
                this.coolDown = true;
                const container = document.getElementById('body');
                // const container2 = document.getElementById('hrLong');
                let i, intervalID;
                promise = new Promise(function (resolve) {
                    i = 1.0;
                    intervalID = setInterval(() => {
                        i -= 0.01;
                        container.style.opacity = i;
                        if (i < 0.1) {
                            console.log(`switchPage: ${newPage}; ${this.page}`)
                            resolve('result');
                            container.style.opacity = 0.0;
                            clearInterval(intervalID);
                        }
                    }, 1);
                });
                promise.then(async () => {
                    this.page = newPage;

                    setTimeout(() => {
                        i = 0.0;
                        intervalID = setInterval(() => {
                            i += 0.01;
                            container.style.opacity = i;
                            if (i > 0.9) {
                                this.coolDown = false;
                                container.style.opacity = 1.0;
                                clearInterval(intervalID);
                            }
                        }, 1);
                    }, 10);
                });
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
            if(this.page !== 0) //Если игрок не на главной странице
            {
                this.emitToClient('notifyI18n', 3, 'menu', 'inviteToLobby', 3000)
            }
            else this.switchPage(0, 4);

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
        fInviteOrProfile(ava)
        {
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
        loadRus() {
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
                small: 'Маленькая',
                normal: 'Средняя',
                big: 'Большая',
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
            }
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
        previewCar(plus) {
            // if(!this.fCoolDown()) return;
            let valueFalse = this.carsPointer,
                valueTrue;
            if (plus) this.carsPointer === this.cars.length - 1 ? valueTrue = this.cars.length - 1 : valueTrue = this.carsPointer + 1;
            else this.carsPointer === 0 ? valueTrue = 0 : valueTrue = this.carsPointer - 1

            // console.log(this.cars[this.carsPointer].model) 
            if (valueFalse === valueTrue) return;
            if (!this.cars[valueTrue].color) this.cars[valueTrue].color = {
                r: 255,
                g: 255,
                b: 255
            }
            this.waitEmitToServer(50, 'carsPointer', valueTrue, valueFalse, 'sCar:preview', {
                model: this.cars[valueTrue].model,
                color: this.cars[valueTrue].color
            });
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
        changeCamRotation: function () {
            // console.log(this.camRotation)  
            this.emit('cCar:rotation', this.camRotation);
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
    });
    alt.on('getShow', () => alt.emit('keyOpenPressed', menu.show));
    alt.on('bMenu:switchPage', (page = 0, subPage = 0) => menu.switchPage(page, subPage)) 
    alt.on('changeStatusGame', toggle => menu.statusGame = toggle);
    alt.on('update', (textMatch, countWarmUp) => {
        menu.textMatch = textMatch;
        menu.countWarmUp = countWarmUp;
    });

    alt.on('loadMenu', data => {
        menu.enableVR = data.vr;
        menu.sizeMap = data.sizeMap;
    })

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

    alt.on('bMenu:fUpdateLobby', async (data) => menu.fUpdateLobby(data));
    alt.on('bMenu:updateWinScreen', (data) => {
        menu.wsWin = data.wsWin;
        menu.place = data.place;
        menu.placeAll = data.placeAll;
        menu.killsInMatch = data.kills;
        if(menu.killsInMatch < 0) menu.killsInMatch = 0.
        menu.plusMoney = data.plusMoney;
        menu.lifeTime = data.lifeTime;
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

    alt.on('bMenu:updateCash', (cash) => menu.money = cash);

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
        }]
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
        }])
        // menu.fUpdateLobby([{name: "Player-1", ava: 1}, {name: "Player-2", ava: 2}, {name: "DarkLegend", ava: 1}]) // Если хочешь пригласить чтобы кнопка появилась
        menu.switchPage(0, 1)
        // menu.fInviteToLobby(1, [{name: "Player", ready: 0}, {name: "Resce", ready: 0}, {name: "DarkLegend", ready: 1}])
        // menu.statusGame = true;
    }, 100)
    document.getElementById('body').style.backgroundImage = "url(./img/fon.png)"
    document.body.style.cursor = "default"
    menu.placeAll = 3;
    menu.place = 2;
    //     setTimeout(() => {
    //     initColor();
    //     ColorPicker(); 
    // }, 500)
}
menu.loadRus()
// window.addEventListener('resize', function(){
//     console.log('resize')
//   }); 