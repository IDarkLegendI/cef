var menu = new Vue({
    el: '#body',
    data: {
        show: false,
        page: 0, // 0 - главная, 1 - настройки
        enableVR: true, //true, чтобы вр подрубить,
        
        //Block Game
        textMatch: 'В поиске',
        countWarmUp: 0,
        statusGame: false,
    },
    methods: {
        emit: function(value) 
        { 
            alt.emit('emitToServer', value) 
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
}
else 
{
    menu.show = true;
}