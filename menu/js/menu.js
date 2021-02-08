var menu = new Vue({
    el: '#body',
    data: {
        show: false,
        page: 0, //НЕ МЕНЯЙ ТУТ НИХУЯ, ИДИ ВНИЗ СТРАНИЦЫ
        subPage: 3, //
         
        //money
        money: 0,

        //SETTINGS
        enableVR: false, //true, чтобы вр подрубить,
        sizeMap: 0,
        
        //Block Game 
        textMatch: 'В поиске', 
        countWarmUp: 0,
        statusGame: false,
        
        //Lobby
        lobby: [{name: "Player", ava: 1, ready: -2}], /* -2 = без лобби, -1 = капитан, 0 = не готов, 1 = готов */
        myName: "Player",
        myAvatar: "",
        myID: 0,

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
        cars: [{name: 'None', model: 'none', price: -2}, {name: 'X-80 PROTO', model: 'prototipo', price: 1000}, {name: 'T-20', model: 't20', price: 2000}, 
                {name: 'Pfister-811', model: 'pfister811', price: 1500}, {name: 'Dubsta 6x6', model: 'dubsta3', price: 2000}],
        carsPointer: 0,  
        myCar: 'none',

        //Inventory

        //Misc
        miscInput: '',
        coolDown: false,

        //i18n
        i18n: {
            // balance: 'Balance',
            balance: 'BALANCE',
            personal: 'PRIVATE',
            managerCars: 'Manage your cars',
            transport: 'TRANSPORT',
            ready: 'READY',
            notready: 'NOT READY',
            topap: 'TOP UP',
            adminpanel: 'ADMIN-PANEL',
            control: 'MANAGE',
            start: 'START',
            game: 'GAME',
            status: 'Status',
            expectation: 'Players waiting',
            stop: 'STOP',
            clickready: 'Click for ready',
            clicknotready: 'Click if not ready',
            settings: 'SETTINGS',
            pack: 'PACK',
            noob: 'NOOB',
            left: 'Left',
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
            controlFriends: 'FRIEND MANAGEMENT',
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
            buy: 'BUY',
            select: 'SELECT',
            selected: 'SELECTED',
            none: 'NOT SELECTED',
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
        emitServer: function(...args)  
        {
            // console.log(...args)
            if ('alt' in window) alt.emit('emitToServer', ...args) 
        },
        emit: function(value, ...args)  
        { 
            console.log(`emit: ${value} -> ${args[0]}`)
            if ('alt' in window) alt.emit(value, ...args) 
        },
        saveSettings(page)
        {
            if(page != -1) this.switchPage(page);
            if ('alt' in window)  
            {
                alt.emit('saveSettings', {
                    vr: this.enableVR, 
                    sizeMap: this.sizeMap,  
                })
            } 
        },
        switchPage(newPage, newSubPage = -1)
        {
            if(this.subPage === -2) return;
             
            console.log(`switchPage: ${newPage}; ${this.page}`)
            if(newPage === 0 && this.page === 2) menu.emit('cCar:setCarPreview', false)
            // if(('alt' in window) && (newPage > 1 || newSubPage > 1)) return;
            if(newSubPage != -1)
            {
                // if(newPage == 0) return this.subPage = newSubPage;
                this.page = newPage;
                if(newSubPage != -1)
                {
                    this.subPage = -2;
                    setTimeout(() => {
                        this.subPage = newSubPage;
                    }, 350)
                } 
            }
            else {
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
        fUpdateLobby(data) 
        {
            if(data[0].name !== menu.myName)
            {
                let index = data.findIndex(el => el.name === menu.myName);
                if(index !== -1)
                {
                    let client = data.find(el => el.name === menu.myName);
                    data.splice(index, 1);
                    data.unshift(client)
                }
            }

            data.forEach(async (player, index) => {
                if(player.name === menu.myName) 
                {
                    myID = index;
                    return player.ava = menu.myAvatar; 
                } 
                else player.ava = await this.getPhoto(player.ava.toString()) 
            }) 

            if(data.length < 4)
            {
                data.push({name: "пригласить", ava: 0})
            }

            menu.lobby = data;
        },
        getPhoto(avatar)
        {
            if(avatar.length < 5) return `./img/avatars/${avatar}.jpg`; 
            const url = `https://cdn.discordapp.com/avatars/${avatar}.png`

            return fetch(url) 
            .then(response => (response.ok) ? response.blob() : Promise.reject())
            .then(result => Promise.resolve(URL.createObjectURL(result))) 
            .catch(() => Promise.resolve(`./img/avatars/${this.getRandomInt(13)}.jpg`))
        },
        getAvatar(firstCharNick)
        {
            if(firstCharNick) 
            {
                firstCharNick = firstCharNick[0].toUpperCase();
                return this.avatars[firstCharNick]
            }
            else return this.avatars['A']
        },
        getRandomInt: function (max) {
            return Math.floor(Math.random() * Math.floor(max));
        },
        getLevel: function() {
           if(this.elo < 800) this.level = '01';
           else if(this.elo < 950) this.level = '02';
           else if(this.elo < 1100) this.level = '03';
           else if(this.elo < 1250) this.level = '04';
           else if(this.elo < 1400) this.level = '05';
           else if(this.elo < 1550) this.level = '06';
           else if(this.elo < 1700) this.level = '07';
           else if(this.elo < 1850) this.level = '08';
           else if(this.elo < 2000) this.level = '09';
           else this.level = '10';
        },
        getKD: function()
        {
            let value = (+this.kills/+this.matches).toFixed(2);
            return value === 'NaN' ? '0.00' : value
        }, 
        showProfileDetails: function(name, value = null)
        {
            let el = document.getElementById(name);
            if(value == null) value = el.style.opacity;
            else value = 1;

            if(value <= 0.2)
            {
                el.style.opacity = 1;
                // el.style.position = 'static'
                el.style.transform = 'translateX(-2vw)'
            }
            else 
            {
                el.style.transform = 'translateX(2vw)'
                el.style.position = 'absolute'
                el.style.opacity = 0;
            }
            // if(value != null) el.style.opacity = value; 
            // else el.style.opacity = el.style.opacity <= 0.2 ? 1 : 0;
        },
        delFriend: function(name)
        {
            let el = document.getElementById(name);
            if(el.style.opacity <= 0.2) return;
            this.request(name, 'friends') 
        },
        getOnlineFriend: function()
        {
            return this.friends.filter(el => el.online)
        },
        updateOnline: function(allPlayers)
        {
            console.log(`allPlayers: ${allPlayers}`)
            let online = false;
            this.allPlayers = allPlayers;
            this.friends.forEach(el => {
                allPlayers.forEach(el2 => {
                    if(el.name === el2)
                    {
                        online = true;
                    }
                })
                 
                el.online = online;
                online = false;
            })
        },
        loadRus()
        {
            document.getElementById('inputAddFriend').placeholder = "Введите NickName"
            menu.i18n = {
                balance: 'Баланс',
                personal: 'ЛИЧНЫЙ',
                managerCars: 'Управляйте своими машинами',
                transport: 'ТРАНСПОРТ',
                ready: 'ГОТОВ',
                notready: 'НЕ ГОТОВ',
                topap: 'ПОПОЛНИТЬ',
                adminpanel: 'АДМИН-ПАНЕЛЬ',
                control: 'УПРАВЛЕНИЕ',
                start: 'НАЧАТЬ',
                game: 'ИГРУ',
                status: 'Статус',
                expectation: 'Игроков в ожидании',
                stop: 'ЗАКОНЧИТЬ',
                clickready: 'Нажмите для готовности',
                clicknotready: 'Нажмите, если не готовы',
                settings: 'НАСТРОЙКИ',
                pack: 'ПАК',
                noob: 'НОВИЧКА',
                left: 'Осталось',
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
                controlFriends: 'УПРАВЛЕНИЕ ДРУЗЬЯМИ',
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
            }
        }, 
        updateCar(list)
        {
            let carSelected = this.cars[this.carsPointer].model;
            this.cars.forEach((car, index) => {
                if(list.some((el) => el === car.model)) 
                { 
                    console.log(`${this.cars[index].model} === ${list[0]}`)
                    if(this.cars[index].model === list[0]) this.cars[index].price = -1;
                    else this.cars[index].price = 0;
                }
            })
 
            this.cars.sort((a, b) => a.price - b.price) 
            this.carsPointer = this.cars.findIndex(car => car.model === carSelected);
            if(this.page === 2) this.setPreviewCar(this.carsPointer); 
        },
        setPreviewCar(pointer = 1)
        {
            this.carsPointer = 1
            menu.emitServer('sCar:preview', this.cars[pointer].model); 
        },
        setCar(model)
        {
            // this.myCar = model; 
            this.cars.forEach(car => 
            {
                if(car.model === 'none') car.price = -2
                else car.price = 0
            })
            this.cars[this.carsPointer].price = -1; 
            this.emitServer('sCar:set', this.cars[this.carsPointer].model, true)
        },
        previewCar(plus)
        {
            if(!this.fCoolDown()) return;

            if(plus) this.carsPointer === this.cars.length-1 ? this.carsPointer = this.cars.length-1 : this.carsPointer++
            else this.carsPointer === 0 ? this.carsPointer = 0 : this.carsPointer--

            // console.log(this.cars[this.carsPointer].model) 
            menu.emitServer('sCar:preview', this.cars[this.carsPointer].model);
        },
        request(friend, type, event = 'sFriends:rejectRequest')
        { 
            if(type === 'friends') this[type] = this[type].filter(el => el.name !== friend)
            else this[type] = this[type].filter(el => el !== friend)
            this.emitServer(event, friend, type); 
        },
        fCoolDown()
        {
            if(this.coolDown)
            {
                this.emit('customNotify', 4, 'Прекратите флудить!') 
                return false;
            }
            this.coolDown = true; 
            setTimeout(() => {
                this.coolDown = false; 
            }, 500)
            return true;
        },
        findFriend()
        {
            console.log(`allPlayers: ${this.allPlayers}`)
            console.log(`requestsOut: ${this.requestsOut}`) 
            console.log(`myName: ${this.myName}`) 
            console.log(`this.friends: ${JSON.stringify(this.friends)}`) 
            return this.allPlayers.filter(el => { 
                let count = 0;
                for(let i = 0; i < this.miscInput.length; i++) 
                {
                   if(el[i].toLowerCase() === this.miscInput[i].toLowerCase()) count++;
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
        }
    },
}); 

if ('alt' in window)
{
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
    alt.on('bMenu:setMyName', async (name) =>
    {
        console.log(name)
        menu.myName = name; 
        menu.fUpdateLobby([{name: menu.myName, ava: menu.myAvatar, ready: -2}]);
    });
      
    alt.on('bMenu:setMyAvatar', async (avatar) => 
    {
        console.log(`bMenu:setMyAvatar: ${avatar}`)  
        menu.myAvatar = await menu.getPhoto(avatar)
        menu.fUpdateLobby([{name: menu.myName, ava: menu.myAvatar, ready: -2}]);
    });
     
    alt.on('bMenu:fUpdateLobby', async (data) => menu.fUpdateLobby(data));
    alt.on('bMenu:updateRank', (obj) => 
    {
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
        if(friends != null) JSON.parse(friends).forEach(el => menu.friends.push({name: el, online: false})); 
        console.log(`updateFriends: ${JSON.stringify(menu.friends)}`) 
        if(requestsIn != null) menu.requestsIn = JSON.parse(requestsIn);   
        if(requestsOut != null) menu.requestsOut = JSON.parse(requestsOut);  
        console.log(`menu.requestsOut: ${menu.requestsOut}`)
        // menu.updateOnline(allPlayers); 
    })

    alt.on('bFriends:remove', (variable, nickName) => {
        console.log(`bFriends:remove: ${variable}; ${nickName}`) 
        menu[variable] = menu[variable].filter(el => el !== nickName);
    });

    alt.on('bFriends:updateOnline', (allPlayers) => menu.updateOnline(allPlayers)) 
    alt.on('bMenu:updateCars', (list) => menu.updateCar(list))  
    alt.on('bMenu:setPreviewCar', () => menu.setPreviewCar())  
}
else 
{
    menu.show = true;  
    setTimeout(async () => {
        menu.myAvatar = await menu.getPhoto('287911323130396673/ff8e10f4425b81c3d5c4c7440e3fae35');
        menu.getLevel();
        menu.allPlayers = ['Dark', 'Dsrsa', 'Dakr', 'Daaa', 'Daq', 'Dav', 'Das', 'Dac']
        menu.friends = [{name: 'Dark', online: true}, {name: 'Vanya', online: false}]
        // menu.requestsIn = ['DarkLegend', 'Res1ce', 'Obliko', 'Vanya', 'ADS', 'D2arkLegend', 'Res21ce', 'Obliko2', 'Van2ya', 'AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG']
        // menu.requestsOut = ['DarkLegend', 'Res1ce', 'Obliko', 'Vanya', 'ADS', 'D2arkLegend', 'Res21ce', 'Obliko2', 'Van2ya', 'AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG']
        menu.requestsOut = ['DarkLegend']
        menu.fUpdateLobby([{name: "Player", ava: 3, ready: 1}, {name: "Resce", ava: 2, ready: 0}, {name: "DarkLegend", ava: 1, ready: 1}])
        // menu.fUpdateLobby([{name: "Player-1", ava: 1}, {name: "Player-2", ava: 2}, {name: "DarkLegend", ava: 1}]) // Если хочешь пригласить чтобы кнопка появилась
        menu.switchPage(2, 0)  
    }, 100)
    document.getElementById('body').style.backgroundImage = "url(./img/fon.png)" 
    document.body.style.cursor = "default" 
}

menu.loadRus()