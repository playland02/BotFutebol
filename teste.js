

const data = await fetch("https://api.sokkerpro.net/liveApi/" + createStringRandom(16)).then((res) => {
    return res.json()
})

data.data.forEach(async (game) => {
    const data_odd = await fetch(`https://api.sokkerpro.net/fixture/${game.id}/${createStringRandom(16)}`).then((res) => {
        return res.json()
    })

    if (data_odd.data && data_odd.data.stats && data_odd.data.stats.length > 1 &&
        data_odd.data.odds && data_odd.data.odds.half_odd && data_odd.data.odds.half_odd[1].markets &&
        data_odd.data.odds.half_odd[1].markets[0].data && data_odd.data.odds.half_odd[1].markets[0].data[0].value &&
        data_odd.data.odds.half_odd[1].markets[0].data[0].value != 0
    ) {

        

        if(game_market <= 1.35 ){
            console.log(`tip: ${game_market}`)
        }
    }


})



 /*//odd pre live 
 if (Object.values(params[i]).includes('over05ht')) {

    try {
        const data_odd = await fetch(`https://api.sokkerpro.net/fixture/${game.id}/` + createStringRandom(16)).then((res) => {
            return res.json()
        })



        if (data_odd.data && data_odd.data.stats && data_odd.data.stats.length > 1 &&
            data_odd.data.odds && data_odd.data.odds.half_odd && data_odd.data.odds.half_odd[1].markets &&
            data_odd.data.odds.half_odd[1].markets[0].data && data_odd.data.odds.half_odd[1].markets[0].data[0].value &&
            data_odd.data.odds.half_odd[1].markets[0].data[0].value != 0
        ) {

            const game_market = data_odd.data.odds.half_odd[1].markets[0].data[0].value / 100
           
            if (params[i].conditional == '>') {
                if (game_market >= parseFloat(params[i].odd_value)) {
                    new_data.push(game)
                    continue
                }
            }
            if (params[i].conditional == '<') {
                if (game_market <= parseFloat(params[i].odd_value)) {
                    console.log(parseFloat(params[i].odd_value))
                    new_data.push(game)
                    continue
                }
            }
            if (params[i].conditional == '=') {
                if (game_market == parseFloat(params[i].odd_value)) {
                    new_data.push(game)
                    continue
                }
            }

        }else{
            continue
        }
    } catch (error) {
        console.log(error)
    }
}*/


function createStringRandom(length) {
    var stringRandom = '';
    var caract = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        stringRandom += caract.charAt(Math.floor(Math.random() * caract.length));
    }
    return stringRandom;
}


