var menu = new Vue({
    el: '#body',
    data: {
        show: false,
        page: 0, // 0 - главная, 1 - настройки 

        //SETTINGS
        enableVR: true, //true, чтобы вр подрубить,
        sizeMap: 0,
        
        //Block Game 
        textMatch: 'В поиске', 
        countWarmUp: 0,
        statusGame: false,

        //Friend menu
        friendh1: 2,
    },
    methods: {
        emit: function(value)  
        { 
            if ('alt' in window) alt.emit('emitToServer', value) 
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
        switchPage(newPage)
        {
            this.page = newPage;
            // setTimeout(() => 
            // { 
            //     for(let i = 0; i < 3; i++)
            //     {
            //         if(this.mapMode === i) 
            //         {
            //             // document.getElementById(`map-${i}`).checked = 'true'; 
            //             document.getElementById(`map-${i}`).click(); 
            //             setTimeout(() => { 
            //                 document.getElementById(`map-${i}`).click(); 
            //             }, 10)
            //             // document.getElementById(`map-${i}`).click(); 
            //         }
            //         else document.getElementById(`map-${i}`).checked = ''; 
            //     }
            // }, 10);
        }
    } 
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
}
else 
{
    menu.show = true;
}