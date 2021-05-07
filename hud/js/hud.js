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
        helpMainMenu: false,
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
        fUpdateKills(name, dist)
        {
            this.kills += 1;
            this.killsBar = [name, dist];
            if(this.killsHandle != null) clearTimeout(this.killsHandle);

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
        fKillFeedUpdate(text)
        {  
            if(this.killFeed[2]) 
            {
                console.log(`${this.killFeed[2]}; ${this.killFeed.splice(0, 1)}`)
                return setTimeout(() => this.fKillFeedUpdate(text), 50) 
            }
            this.killFeed.push(text);
            let htmlEl = document.getElementById('killfeed');
            if(htmlEl == null) return;
             
            htmlEl.style.opacity = 1;    

            if(this.killFeedInterval != null) clearInterval(this.killFeedInterval);
            this.killFeedInterval = setInterval(() => {
                if(htmlEl.style.opacity <= 0.4) 
                {
                    this.killFeed.splice(0, this.killFeed.length)
                }
                if(htmlEl.style.opacity <= 0.3) 
                {  
                    htmlEl.style.opacity = 0;
                    clearInterval(this.killFeedInterval);
                    this.killFeedInterval = null;
                    this.killFeed = [];
                }
                htmlEl.style.opacity = htmlEl.style.opacity - 0.02; 
                // console.log(htmlEl.style.opacity)
            }, 500);    
        },
        fPlayAudio(name, volume = 0.1) 
        {
            let audio = new Audio(`./audio/${name}.mp3`);

            audio.volume = volume;   
            audio.play(); 
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
            // console.log(`changeVar: ${JSON.stringify(...args)}`)
            args.forEach(el => { 
                // console.log(`changeVar(0): ${JSON.stringify(el)}`) 
                // console.log(`changeVar(1): hud.${el[0]} = ${el[1]}`) 
                hud[el[0]] = el[1]; 
                // console.log(`changeVar: ${hud[el[0]]}`)  
            })  
        },
    },
})

if ('alt' in window) {
    alt.on('customNotify', (notifyType, text, time) => {
        notify(notifyType, 9, text, time);
        // console.log(`${notifyType}, 9, ${text}, ${time}`);
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
    alt.on('giveKill', hud.fUpdateKills)

    alt.on('toggleLoad', toggle => hud.showLogo = toggle)
 
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
}  
else  
{ 
    hud.obs.show = true;
    hud.obs.nick = 'DarkLegend'
    hud.showHUD = true; 
    // hud.showLogo = true;
    hud.help = 1;
    // hud.showLogo = true; 
    // hud.fUpdateKills("OBLIKO", 100)
    // setTimeout(() => hud.fKillFeedUpdate("DOLBAEB KILL DOLBAEBA2 из M4A11"), 1000)
    // setTimeout(() => hud.fKillFeedUpdate("DOLBAEB KILL DOLBAEBA2 из M4A12"), 2000)
    // setTimeout(() => hud.fKillFeedUpdate("DOLBAEB KILL DOLBAEBA2 из M4A13"), 3000)
    let index = 0;
    hud.kills = 1;
    hud.lobby = {0: {name: 'DanilaImortal', color: '#00FF00', hp: 99}, 1: {name: 'DarkLegend', color: '#FF0000', hp: -1}}
    setInterval(() => {
        // hud.fUpdateKills("OBLIKO", 45)
        // hud.fupdateWarmUP('123333333333333', true) 
        // hud.fKillFeedUpdate(`DOLBAEB KILL DOLBAEBA2 из M4A1-${index++}`) 
    }, 1100) 
    // setInterval(() => hud.fupdateWarmUP('123333333333333', true), 1500)  
    // setTimeout(() => hud.fKillFeedUpdate("DOLBAEB KILL DOLBAEBA2 из M4A1"), 1000)
    // setTimeout(() => hud.fKillFeedUpdate("DOLBAEB KILL DOLBAEBA2 из M4A1"), 1000)
    // setTimeout(() => hud.fKillFeedUpdate("DOLBAEB KILL DOLBAEBA2 из M4A1"), 1000)
}
