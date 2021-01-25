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
        friends: ['DarkLegend', 'Res1ce', 'Obliko'],
        requestsIn: [],
        requestsOut: [],

        //Ranks
        elo: 2000,
        kills: 0,
        matches: 0, 
        lastMatch: 25,
        wins: 0,
        hours: 0,
        level: '01',

        //i18n
        i18n: {
            // balance: 'Balance',
            balance: 'Баланс',
            personal: 'ЛИЧНЫЙ',
            managerCars: 'Управляйте своими машинами',
            transport: 'ТРАНСПОРТ',
        }
    },
    methods: {
        emitServer: function(value)  
        { 
            if ('alt' in window) alt.emit('emitToServer', value) 
        },
        emit: function(value, ...args)  
        { 
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

            if(('alt' in window) && (newPage > 1 || newSubPage > 1)) return;
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
            console.log(name)
        },
        loadRus()
        {
            menu.i18n = {
                balance: 'БАЛАНС',
                personal: 'ЛИЧНЫЙ',
                managerCars: 'Управляйте своими машинами',
            }
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
        menu.friends = JSON.parse(friends);
        menu.requestsIn = JSON.parse(requestsIn); 
        menu.requestsOut = JSON.parse(requestsOut);
    })
}
else 
{
    menu.show = true; 
    // menu.switchPage(0, 1) 
    setTimeout(async () => {
        menu.myAvatar = await menu.getPhoto('287911323130396673/ff8e10f4425b81c3d5c4c7440e3fae35');
        menu.getLevel();
        menu.fUpdateLobby([{name: "Player", ava: 3, ready: -2}, {name: "Resce", ava: 2, ready: 0}, {name: "DarkLegend", ava: 1, ready: 1}])
        // menu.fUpdateLobby([{name: "Player-1", ava: 1}, {name: "Player-2", ava: 2}, {name: "DarkLegend", ava: 1}]) // Если хочешь пригласить чтобы кнопка появилась
        menu.switchPage(0, 3)  
    }, 50)
    document.getElementById('body').style.backgroundImage = "url(./img/fon.png)" 
    document.body.style.cursor = "default" 
}