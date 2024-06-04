const data_odd = await fetch(`https://api.sokkerpro.net/fixture/19085837/${createStringRandom(16)}`).then((res) => {
    return res.json()
})

if (data_odd.data && data_odd.data.stats && data_odd.data.stats.length > 1 &&
    data_odd.data.odds && data_odd.data.odds.half_odd
) {

    console.log(data_odd.data)
    const game_market = data_odd.data.odds.half_odd.filter((odd) => {
        return odd.title == "Goals Market"
    })[0].markets.filter((odd) => {
        return odd.id = 975903
    })[0].data[0].value / 100

    console.log(game_market)
}


function createStringRandom(length) {
    var stringRandom = '';
    var caract = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        stringRandom += caract.charAt(Math.floor(Math.random() * caract.length));
    }
    return stringRandom;
}


