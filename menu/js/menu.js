var menu = new Vue({
    el: '#body',
    data: {
        show: false,
        page: 0, // 0 - главная, 1 - настройки 
        subPage: 0, // 

        //SETTINGS
        enableVR: false, //true, чтобы вр подрубить,
        sizeMap: 0,
        
        //Block Game 
        textMatch: 'В поиске', 
        countWarmUp: 0,
        statusGame: false,

        //Friend menu
        // friends: ['DarkLegend', 'Res1ce', 'Obliko', 'Vanya', '123', 'D2arkLegend', 'Res21ce', 'Obliko2', 'Van2ya', '1223', '12', '23', '33', '444', '55', '66']
        friends: ['DarkLegend', 'Res1ce', 'Obliko']
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
        switchPage(newPage, newSubPage = -1)
        {
            if(this.subPage === -2) return;

            if(('alt' in window) && newPage > 1) return;
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
    // menu.switchPage(0, 1) 
    // setTimeout(() => {
    //     menu.switchPage(0, 1) 
    // }, 2000)
    document.getElementById('body').style.backgroundImage = "url(./img/fon.png)" 
}