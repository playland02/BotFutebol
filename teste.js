const data_odd = await fetch(`https://api.sokkerpro.net/fixture/19128958/${createStringRandom(16)}`).then((res) => {
    return res.json()
})

if (data_odd.data && data_odd.data.stats && data_odd.data.stats.length > 1 &&
    data_odd.data.odds && data_odd.data.odds.half_odd
) {

    
    const away_favorite = data_odd.data.odds.half_odd[1].markets[0].data[0].value

    /*filter((odd) => {
        return odd.title == "1x2 Market"
    })[0].markets[0].data[2].value/*.filter((odd)=>{
        return odd.id == 1
    })[0].data[0].value /100*/

    console.log(data_odd.data.id)
}



function createStringRandom(length) {
    var stringRandom = '';
    var caract = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        stringRandom += caract.charAt(Math.floor(Math.random() * caract.length));
    }
    return stringRandom;
}


