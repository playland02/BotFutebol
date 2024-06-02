const data = await fetch("https://api.sokkerpro.net/liveApi/" + createStringRandom(16)).then((res) => {
    return res.json()
})

let new_data = []



function createStringRandom(length) {
    var stringRandom = '';
    var caract = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        stringRandom += caract.charAt(Math.floor(Math.random() * caract.length));
    }
    return stringRandom;
}


