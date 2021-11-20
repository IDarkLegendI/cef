'use strict';
let avatars =  {
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
}

function getAvatar(nick) { 
    // console.log(`nick[0]: ${JSON.stringify(nick)}`)
    if (nick) {
        return avatars[nick[0].toUpperCase()]
    } else return avatars['A']
}

function getPhoto(avatar, name) {
    // console.log(`getPhoto: ${name}; avatar: ${avatar}`)
    if (avatar === null) return Promise.resolve(`../shared/img/avatars/${getAvatar(name)}.jpg`)
    // if(avatar.length < 5) return `./img/avatars/${avatar}.jpg`; 
    const url = `https://cdn.discordapp.com/avatars/${avatar}.png`

    return fetch(url)
        .then(response => (response.ok) ? response.blob() : Promise.reject())
        .then(result => Promise.resolve(URL.createObjectURL(result)))
        .catch(() => Promise.resolve(`../shared/img/avatars/${getAvatar(name)}.jpg`))
}