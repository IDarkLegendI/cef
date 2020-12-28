var hud = new Vue({
    el: '#body',
    data: {
        //observer
        obs: {
            show: false,
            nick: "",
        },

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
        
        helpJetPack: false,  
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
            }, 6500);  
        }, 
        fupdateWarmUP(text, pulse)
        {
            if(hud.intervalWUP != null) clearTimeout(hud.intervalWUP); 
            hud.showWUP = true;
            hud.textWUP = text;
            hud.pulseWUP = pulse; 

            hud.intervalWUP = setTimeout(() => {
                hud.showWUP = false;
                hud.intervalWUP = null;  
            }, 1500); 
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
            this.killFeed.push(text);
            if(this.killFeed[3]) this.killFeed.splice(0, 1); 
            let htmlEl = document.getElementById('killfeed');
            htmlEl.style.opacity = 1;    

            if(this.killFeedInterval != null) clearInterval(this.killFeedInterval);
            this.killFeedInterval = setInterval(() => {
                if(htmlEl.style.opacity <= 0.2)
                {  
                    htmlEl.style.opacity = 0;
                    clearInterval(this.killFeedInterval);
                    this.killFeed = [];
                }
                htmlEl.style.opacity = htmlEl.style.opacity - 0.02; 
                // console.log(htmlEl.style.opacity)
            }, 500);    
        }
    },
})

if ('alt' in window) {
    alt.on('customNotify', (notifyType, text, time) => {
        notify(notifyType, 9, text, time);
        // console.log(`${notifyType}, 9, ${text}, ${time}`);
    });

    alt.on('toggleHud', (toggle, players = 0) => {
        hud.showHUD = toggle;

        hud.kills = 0;
        hud.killsBar = false;
        hud.killsBarShow = false;
        if(this.killsHandle != null) clearTimeout(this.killsHandle);
        
        hud.startPlayers = players; 
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

    alt.on('obServer', data => hud.obs = data) 

    alt.on('fTimeUpdate', hud.fTimeUpdate) 
    alt.on('updateKillFeed', hud.fKillFeedUpdate)   

    alt.on('updateJetPack', toggle => hud.helpJetPack = toggle)   
} 
else 
{ 
    // hud.obs.show = true;
    hud.obs.nick = 'DarkLegend'
    hud.showHUD = true;
    hud.helpJetPack = true;
    // hud.showLogo = true;
    hud.fUpdateKills("OBLIKO", 100)
    setTimeout(() => hud.fupdateWarmUP('123333333333333', true), 1000)
    setTimeout(() => hud.fupdateWarmUP('123333333333333', true), 1900) 
    setTimeout(() => hud.fKillFeedUpdate("DOLBAEB KILL DOLBAEBA2 из M4A1"), 1000)
    setTimeout(() => hud.fKillFeedUpdate("DOLBAEB KILL DOLBAEBA2 из M4A1"), 1000)
    setTimeout(() => hud.fKillFeedUpdate("DOLBAEB KILL DOLBAEBA2 из M4A1"), 1000)
}
