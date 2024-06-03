import { Telegraf } from "telegraf"


const token = '7012699522:AAG1EgPUxaLFjcSdsirvjhZ3FZfIQC_9BpM'
const bot = new Telegraf(token)


let id_master = 6590096090
let chatbotgolFT = -1002174036774
let chatbotgolHT = -1002154786299


let tipsGolFT = []
let tipsScore20HT = []


function createStringRandom(length) {
    var stringRandom = '';
    var caract = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        stringRandom += caract.charAt(Math.floor(Math.random() * caract.length));
    }
    return stringRandom;
}

bot.command('start', async (ctx) => {
    ctx.reply("Olá como posso te ajudar?")
})

bot.command('token', async (ctx) => {

    const req = await fetch('http://191.252.195.184:3000/users').then((res) => {
        return res.json()
    })

    let user = req.filter((data) => {
        return data.token === ctx.payload
    })


    if (user.length == 0) {
        await ctx.reply('Token invalido. Tente novamente !')
    }

    if (user.length > 0 && user[0].chat_id != 0) {
        await ctx.reply('Eu ja estou vinculado a sua conta !. Se esta mensagem for um engano, contate meu criador.')
    }

    if (user.length > 0 && user[0].chat_id == 0) {
        const config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                chat_id: ctx.from.id
            })

        }

        await fetch(`http://191.252.195.184:3000/user/${user[0]._id}`, config)

        await ctx.reply("Sua conta foi vinculada com sucesso , agora voce receberá todos alertas de seus bots !")

    }

})


/*

    await ctx.telegram.sendMessage(id_master,`Bot foi ativado !`)

    await ctx.telegram.sendMessage(chatbotgolFT,`Bot de gols FT iniciado ! `)

    await ctx.telegram.sendMessage(chatbotgolHT,`Bot de gols HT iniciado ...`)
    */

bot.command('startbots', async (ctx) => {
    if (ctx.chat.id == id_master && ctx.from.id == id_master) {
        await ctx.telegram.sendMessage(id_master, `Todos bots foram ativado  !`)

        setInterval(async () => {
            const bots = await fetch('http://191.252.195.184:3000/bots').then((res) => {
                return res.json()
            })
            const data = await fetch("https://api.sokkerpro.net/liveApi/" + createStringRandom(16)).then((res) => {
                return res.json()
            })


            if (bots && data) {
                bots.forEach(async (bot) => {

                    const params = JSON.parse(bot.params)
                    let new_data = []
                    let tips = []
                    let tips_submit = []
                    let total_tips = 0

                    //nova data sem dados nulos
                    data.data.forEach((game) => {
                        try {

                            if (game.stats && game.stats.length > 1) {
                                for (let i = 0; i < params.length; i++) {


                                    //shots outsidebox
                                    if (game.stats.length > 1 &&
                                        Object.values(params[i]).includes('shots_outsidebox') &&
                                        game.stats[0].shots && game.stats[1].shots &&
                                        game.stats[0].shots.outsidebox && game.stats[1].shots.outsidebox
                                    ) {
                                        new_data.push(game)
                                        continue
                                    }


                                    //shots insidebox
                                    if (game.stats.length > 1 &&
                                        Object.values(params[i]).includes('shots_insidebox') &&
                                        game.stats[0].shots && game.stats[1].shots &&
                                        game.stats[0].shots.insidebox && game.stats[1].shots.insidebox
                                    ) {
                                        new_data.push(game)
                                        continue
                                    }

                                    //shots blocked
                                    if (game.stats.length > 1 &&
                                        Object.values(params[i]).includes('shots_blocked') &&
                                        game.stats[0].shots && game.stats[1].shots &&
                                        game.stats[0].shots.blocked && game.stats[1].shots.blocked
                                    ) {
                                        new_data.push(game)
                                        continue
                                    }


                                    //shots offgoal
                                    if (game.stats.length > 1 &&
                                        Object.values(params[i]).includes('shots_offgoal') &&
                                        game.stats[0].shots && game.stats[1].shots &&
                                        game.stats[0].shots.offgoal && game.stats[1].shots.offgoal
                                    ) {
                                        new_data.push(game)
                                        continue
                                    }


                                    //shots ongoal
                                    if (game.stats.length > 1 &&
                                        Object.values(params[i]).includes('shots_ongoal') &&
                                        game.stats[0].shots && game.stats[1].shots &&
                                        game.stats[0].shots.ongoal && game.stats[1].shots.ongoal
                                    ) {
                                        new_data.push(game)
                                        continue
                                    }

                                    //shots total
                                    if (game.stats.length > 1 &&
                                        Object.values(params[i]).includes('shots_total') &&
                                        game.stats[0].shots && game.stats[1].shots &&
                                        game.stats[0].shots.total && game.stats[1].shots.total
                                    ) {
                                        new_data.push(game)
                                        continue
                                    }



                                    //apm
                                    if (game.stats.length > 1 &&
                                        Object.values(params[i]).includes('apm') &&
                                        game.stats[0].attacks && game.stats[1].attacks &&
                                        game.stats[0].attacks.avg_attacks && game.stats[1].attacks.avg_attacks
                                    ) {
                                        new_data.push(game)
                                        continue
                                    }

                                    //appm
                                    if (Object.values(params[i]).includes('appm') &&
                                        game.stats.length > 1 &&
                                        game.stats[0].attacks && game.stats[1].attacks &&
                                        game.stats[0].attacks.avg_dangerous_attacks && game.stats[1].attacks.avg_dangerous_attacks
                                    ) {

                                        new_data.push(game)
                                        continue
                                    }

                                    //attacks
                                    if (game.stats.length > 1 &&
                                        Object.values(params[i]).includes('attacks') &&
                                        game.stats[0].attacks && game.stats[1].attacks &&
                                        game.stats[0].attacks.attacks && game.stats[1].attacks.attacks
                                    ) {
                                        new_data.push(game)
                                        continue
                                    }


                                    //dangerous_attacks
                                    if (Object.values(params[i]).includes('dangerous_attacks') &&
                                        game.stats &&
                                        game.stats.length > 1 &&
                                        game.stats[0].attacks && game.stats[1].attacks &&
                                        game.stats[0].attacks.dangerous_attacks && game.stats[1].attacks.dangerous_attacks
                                    ) {
                                        new_data.push(game)
                                        continue
                                    }

                                    //corners
                                    if (game.stats.length > 1 &&
                                        Object.values(params[i]).includes('corners') &&
                                        game.stats[0].corners && game.stats[1].corners

                                    ) {
                                        new_data.push(game)
                                        continue
                                    }


                                    //ball_possession
                                    if (game.stats.length > 1 &&
                                        Object.values(params[i]).includes('ball_possession') &&
                                        game.stats[0].passes && game.stats[1].passes &&
                                        game.stats[0].passes.percentage && game.stats[1].passes.percentage
                                    ) {
                                        new_data.push(game)
                                        continue
                                    }
                                    //pression
                                    if (Object.values(params[i]).includes('pression') &&
                                        game.home_score && game.away_score

                                    ) {
                                        new_data.push(game)
                                        continue
                                    }
                                    //minutes
                                    if (Object.values(params[i]).includes('minutes') &&
                                        game.time && game.time.minute

                                    ) {
                                        new_data.push(game)
                                        continue
                                    }

                                }
                            }
                        } catch (error) {
                            console.log(error)
                        }


                    })
                    //analisa os parametros
                    if (new_data.length > 0) {


                        for (let i = 0; i < params.length; i++) {
                            //param minutes
                            if ((params[i].property == "minutes")) {
                                if (tips.length > 0) {
                                    tips = tips.filter((game) => {
                                        return game.time.minute >= params[i].minute_from && game.time.minute <= params[i].minute_until
                                    })
                                } else {
                                    tips = new_data.filter((game) => {
                                        return game.time.minute >= params[i].minute_from && game.time.minute <= params[i].minute_until
                                    })
                                }
                                continue

                            }
                            //params pression
                            if (params[i].property == "pression") {
                                if (params[i].target == "home") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            let score_total = parseInt(game.home_score) + parseInt(game.away_score)
                                            let score = Math.round((parseInt(game.home_score) / score_total) * 100)
                                            return score >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            let score_total = parseInt(game.home_score) + parseInt(game.away_score)
                                            let score = Math.round((parseInt(game.home_score) / score_total) * 100)

                                            return score >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            let score_total = parseInt(game.home_score) + parseInt(game.away_score)
                                            let score = Math.round((parseInt(game.away_score) / score_total) * 100)
                                            return score >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            let score_total = parseInt(game.home_score) + parseInt(game.away_score)
                                            let score = Math.round((parseInt(game.away_score) / score_total) * 100)

                                            return score >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            let score_total = parseInt(game.home_score) + parseInt(game.away_score)
                                            let score = Math.round((parseInt(game.home_score) / score_total) * 100)
                                            let score_2 = Math.round((parseInt(game.away_score) / score_total) * 100)
                                            return score >= params[i].value || score_2 >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            let score_total = parseInt(game.home_score) + parseInt(game.away_score)
                                            let score = Math.round((parseInt(game.home_score) / score_total) * 100)
                                            let score_2 = Math.round((parseInt(game.away_score) / score_total) * 100)
                                            return score >= params[i].value || score_2 >= params[i].value
                                        })

                                    }
                                    continue

                                }
                            }

                            //params Ball possession 
                            if (params[i].property == "ball_possession") {
                                if (params[i].target == "home") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].passes.percentage >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].passes.percentage >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return (game.stats[1].passes.percentage != null) && (game.stats[1].passes.percentage >= params[i].value)
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return (game.stats[1].passes.percentage != null) && (game.stats[1].passes.percentage >= params[i].value)
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return (game.stats[0].passes.percentage != null) && (game.stats[1].passes.percentage != null) && (game.stats[0].passes.percentage >= params[i].value || game.stats[1].passes.percentage >= params[i].value)
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return (game.stats[0].passes.percentage != null) && (game.stats[1].passes.percentage != null) && (game.stats[0].passes.percentage >= params[i].value || game.stats[1].passes.percentage >= params[i].value)
                                        })

                                    }
                                    continue

                                }
                            }
                            //

                            //params corners
                            if (params[i].property == "corners") {
                                if (params[i].target == "home" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].corners >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].corners >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].corners >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.corners >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].corners >= params[i].value || game.stats[1].corners >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].corners >= params[i].value || game.stats[1].corners >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                //
                                if (params[i].target == "home" && params[i].conditional == "<") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].corners <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].corners <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].corners <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.corners <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].corners <= params[i].value || game.stats[1].corners <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].corners <= params[i].value || game.stats[1].corners <= params[i].value
                                        })

                                    }
                                    continue

                                }

                                //corners == 
                                if (params[i].target == "home" && params[i].conditional == "=") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].corners == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].corners == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].corners == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.corners == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].corners == params[i].value || game.stats[1].corners == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].corners == params[i].value || game.stats[1].corners == params[i].value
                                        })

                                    }
                                    continue

                                }
                            }

                            //dangerous attacks 
                            if (params[i].property == "dangerous_attacks") {

                                if (params[i].target == "home" && params[i].conditional == ">") {
                                    if (tips.length > 0) {


                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.dangerous_attacks >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.dangerous_attacks >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].attacks.dangerous_attacks >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.attacks.dangerous_attacks >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.dangerous_attacks >= params[i].value || game.stats[1].attacks.dangerous_attacks >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.dangerous_attacks >= params[i].value || game.stats[1].attacks.dangerous_attacks >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                //
                                if (params[i].target == "home" && params[i].conditional == "<") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.dangerous_attacks <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.dangerous_attacks <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == "<") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].attacks.dangerous_attacks <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.attacks.dangerous_attacks <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == "<") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.dangerous_attacks <= params[i].value || game.stats[1].attacks.dangerous_attacks <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.dangerous_attacks <= params[i].value || game.stats[1].attacks.dangerous_attacks <= params[i].value
                                        })

                                    }
                                    continue

                                }

                                //attacks.dangerous_attacks == 
                                if (params[i].target == "home" && params[i].conditional == "=") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.dangerous_attacks == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.dangerous_attacks == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == "=") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].attacks.dangerous_attacks == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.attacks.dangerous_attacks == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == "=") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.dangerous_attacks == params[i].value || game.stats[1].attacks.dangerous_attacks == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.dangerous_attacks == params[i].value || game.stats[1].attacks.dangerous_attacks == params[i].value
                                        })

                                    }
                                    continue

                                }
                            }

                            //attacks > 
                            if (params[i].property == "attacks") {
                                if (params[i].target == "home" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.attacks >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.attacks >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].attacks.attacks >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.attacks.attacks >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.attacks >= params[i].value || game.stats[1].attacks.attacks >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.attacks >= params[i].value || game.stats[1].attacks.attacks >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                //
                                if (params[i].target == "home" && params[i].conditional == "<") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.attacks <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.attacks <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].attacks.attacks <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.attacks.attacks <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.attacks <= params[i].value || game.stats[1].attacks.attacks <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.attacks <= params[i].value || game.stats[1].attacks.attacks <= params[i].value
                                        })

                                    }
                                    continue

                                }

                                //attacks.attacks == 
                                if (params[i].target == "home" && params[i].conditional == "=") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.attacks == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.attacks == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].attacks.attacks == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.attacks.attacks == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.attacks == params[i].value || game.stats[1].attacks.attacks == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.attacks == params[i].value || game.stats[1].attacks.attacks == params[i].value
                                        })

                                    }
                                    continue

                                }
                            }

                            //appm 
                            if (params[i].property == "appm") {
                                if (params[i].target == "home" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.avg_dangerous_attacks >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.avg_dangerous_attacks >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].attacks.avg_dangerous_attacks >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.attacks.avg_dangerous_attacks >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.avg_dangerous_attacks >= params[i].value || game.stats[1].attacks.avg_dangerous_attacks >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.avg_dangerous_attacks >= params[i].value || game.stats[1].attacks.avg_dangerous_attacks >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                //
                                if (params[i].target == "home" && params[i].conditional == "<") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.avg_dangerous_attacks <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.avg_dangerous_attacks <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].attacks.avg_dangerous_attacks <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.attacks.avg_dangerous_attacks <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.avg_dangerous_attacks <= params[i].value || game.stats[1].attacks.avg_dangerous_attacks <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.avg_dangerous_attacks <= params[i].value || game.stats[1].attacks.avg_dangerous_attacks <= params[i].value
                                        })

                                    }
                                    continue

                                }

                                //attacks.avg_dangerous_attacks == 
                                if (params[i].target == "home" && params[i].conditional == "=") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.avg_dangerous_attacks == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.avg_dangerous_attacks == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].attacks.avg_dangerous_attacks == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.attacks.avg_dangerous_attacks == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.avg_dangerous_attacks == params[i].value || game.stats[1].attacks.avg_dangerous_attacks == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.avg_dangerous_attacks == params[i].value || game.stats[1].attacks.avg_dangerous_attacks == params[i].value
                                        })

                                    }
                                    continue

                                }
                            }


                            //APM
                            if (params[i].property == "apm") {
                                if (params[i].target == "home" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.avg_attacks >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.avg_attacks >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].attacks.avg_attacks >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.attacks.avg_attacks >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.avg_attacks >= params[i].value || game.stats[1].attacks.avg_attacks >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.avg_attacks >= params[i].value || game.stats[1].attacks.avg_attacks >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                //
                                if (params[i].target == "home" && params[i].conditional == "<") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.avg_attacks <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.avg_attacks <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].attacks.avg_attacks <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.attacks.avg_attacks <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.avg_attacks <= params[i].value || game.stats[1].attacks.avg_attacks <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.avg_attacks <= params[i].value || game.stats[1].attacks.avg_attacks <= params[i].value
                                        })

                                    }
                                    continue

                                }

                                //attacks.avg_attacks == 
                                if (params[i].target == "home" && params[i].conditional == "=") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.avg_attacks == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.avg_attacks == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].attacks.avg_attacks == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.attacks.avg_attacks == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].attacks.avg_attacks == params[i].value || game.stats[1].attacks.avg_attacks == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].attacks.avg_attacks == params[i].value || game.stats[1].attacks.avg_attacks == params[i].value
                                        })

                                    }
                                    continue

                                }
                            }
                            //shots total
                            if (params[i].property == "shots_total") {
                                if (params[i].target == "home" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.total >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.total >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].shots.total >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.shots.total >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.total >= params[i].value || game.stats[1].shots.total >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.total >= params[i].value || game.stats[1].shots.total >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                //
                                if (params[i].target == "home" && params[i].conditional == "<") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.total <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.total <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].shots.total <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.shots.total <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.total <= params[i].value || game.stats[1].shots.total <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.total <= params[i].value || game.stats[1].shots.total <= params[i].value
                                        })

                                    }
                                    continue

                                }

                                //shots.total == 
                                if (params[i].target == "home" && params[i].conditional == "=") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.total == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.total == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].shots.total == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.shots.total == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.total == params[i].value || game.stats[1].shots.total == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.total == params[i].value || game.stats[1].shots.total == params[i].value
                                        })

                                    }
                                    continue

                                }
                            }
                            // shots ongoal
                            if (params[i].property == "shots_ongoal") {
                                if (params[i].target == "home" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.ongoal >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.ongoal >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].shots.ongoal >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.shots.ongoal >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.ongoal >= params[i].value || game.stats[1].shots.ongoal >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.ongoal >= params[i].value || game.stats[1].shots.ongoal >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                //
                                if (params[i].target == "home" && params[i].conditional == "<") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.ongoal <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.ongoal <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].shots.ongoal <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.shots.ongoal <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.ongoal <= params[i].value || game.stats[1].shots.ongoal <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.ongoal <= params[i].value || game.stats[1].shots.ongoal <= params[i].value
                                        })

                                    }
                                    continue

                                }

                                //shots.ongoal == 
                                if (params[i].target == "home" && params[i].conditional == "=") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.ongoal == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.ongoal == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].shots.ongoal == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.shots.ongoal == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.ongoal == params[i].value || game.stats[1].shots.ongoal == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.ongoal == params[i].value || game.stats[1].shots.ongoal == params[i].value
                                        })

                                    }
                                    continue

                                }
                            }
                            // shots offgoal
                            if (params[i].property == "shots_offgoal") {
                                if (params[i].target == "home" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.offgoal >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.offgoal >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].shots.offgoal >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.shots.offgoal >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.offgoal >= params[i].value || game.stats[1].shots.offgoal >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.offgoal >= params[i].value || game.stats[1].shots.offgoal >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                //
                                if (params[i].target == "home" && params[i].conditional == "<") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.offgoal <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.offgoal <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].shots.offgoal <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.shots.offgoal <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.offgoal <= params[i].value || game.stats[1].shots.offgoal <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.offgoal <= params[i].value || game.stats[1].shots.offgoal <= params[i].value
                                        })

                                    }
                                    continue

                                }

                                //shots.offgoal == 
                                if (params[i].target == "home" && params[i].conditional == "=") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.offgoal == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.offgoal == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].shots.offgoal == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.shots.offgoal == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.offgoal == params[i].value || game.stats[1].shots.offgoal == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.offgoal == params[i].value || game.stats[1].shots.offgoal == params[i].value
                                        })

                                    }
                                    continue

                                }
                            }
                            //
                            // shots blocked
                            if (params[i].property == "shots_blocked") {
                                if (params[i].target == "home" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.blocked >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.blocked >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].shots.blocked >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.shots.blocked >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.blocked >= params[i].value || game.stats[1].shots.blocked >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.blocked >= params[i].value || game.stats[1].shots.blocked >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                //
                                if (params[i].target == "home" && params[i].conditional == "<") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.blocked <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.blocked <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].shots.blocked <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.shots.blocked <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.blocked <= params[i].value || game.stats[1].shots.blocked <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.blocked <= params[i].value || game.stats[1].shots.blocked <= params[i].value
                                        })

                                    }
                                    continue

                                }

                                //shots.blocked == 
                                if (params[i].target == "home" && params[i].conditional == "=") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.blocked == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.blocked == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].shots.blocked == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.shots.blocked == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.blocked == params[i].value || game.stats[1].shots.blocked == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.blocked == params[i].value || game.stats[1].shots.blocked == params[i].value
                                        })

                                    }
                                    continue

                                }
                            }
                            //
                            // shots insidebox
                            if (params[i].property == "shots_insidebox") {
                                if (params[i].target == "home" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.insidebox >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.insidebox >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].shots.insidebox >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.shots.insidebox >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.insidebox >= params[i].value || game.stats[1].shots.insidebox >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.insidebox >= params[i].value || game.stats[1].shots.insidebox >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                //
                                if (params[i].target == "home" && params[i].conditional == "<") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.insidebox <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.insidebox <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].shots.insidebox <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.shots.insidebox <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.insidebox <= params[i].value || game.stats[1].shots.insidebox <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.insidebox <= params[i].value || game.stats[1].shots.insidebox <= params[i].value
                                        })

                                    }
                                    continue

                                }

                                //shots.insidebox == 
                                if (params[i].target == "home" && params[i].conditional == "=") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.insidebox == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.insidebox == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].shots.insidebox == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.shots.insidebox == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.insidebox == params[i].value || game.stats[1].shots.insidebox == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.insidebox == params[i].value || game.stats[1].shots.insidebox == params[i].value
                                        })

                                    }
                                    continue

                                }
                            }
                            //
                            // shots offside
                            if (params[i].property == "shots_offside") {
                                if (params[i].target == "home" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.outsidebox >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.outsidebox >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].shots.outsidebox >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.shots.outsidebox >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.outsidebox >= params[i].value || game.stats[1].shots.outsidebox >= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.outsidebox >= params[i].value || game.stats[1].shots.outsidebox >= params[i].value
                                        })

                                    }
                                    continue

                                }
                                //
                                if (params[i].target == "home" && params[i].conditional == "<") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.outsidebox <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.outsidebox <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].shots.outsidebox <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.shots.outsidebox <= params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.outsidebox <= params[i].value || game.stats[1].shots.outsidebox <= params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.outsidebox <= params[i].value || game.stats[1].shots.outsidebox <= params[i].value
                                        })

                                    }
                                    continue

                                }

                                //shots.outsidebox == 
                                if (params[i].target == "home" && params[i].conditional == "=") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.outsidebox == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.outsidebox == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[1].shots.outsidebox == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[1].passes.shots.outsidebox == params[i].value
                                        })

                                    }
                                    continue

                                }
                                if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                    if (tips.length > 0) {

                                        tips = tips.filter(game => {
                                            return game.stats[0].shots.outsidebox == params[i].value || game.stats[1].shots.outsidebox == params[i].value
                                        })

                                    } else {
                                        tips = new_data.filter(game => {
                                            return game.stats[0].shots.outsidebox == params[i].value || game.stats[1].shots.outsidebox == params[i].value
                                        })

                                    }
                                    continue

                                }
                            }
                            //

                        }
                    }
                    //verifica se é uma entrada nova e manda 
                    if (tips.length > 0) {
                        console.log(tips.length)
                        for (let i = 0; i < tips.length; i++) {

                            const config = {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': '*/*'
                                },
                                body: JSON.stringify({
                                    id_bot: bot._id,
                                    id_game: tips[i].id,
                                    result: "NR"

                                })

                            }

                            const filter_games = await fetch('http://191.252.195.184:3000/tip', config).then(async (res) => {
                                return res.json()
                            })

                            if (!filter_games.error) {
                                await ctx.telegram.sendMessage(bot.chat_id, `${bot.name}\n
                                    \nCountry: ${tips[i].country_name}
                                    \nLeague: ${tips[i].league_name}
                                    \nMatch: ${tips[i].localTeam.name} x ${tips[i].visitorTeam.name}
                                    \nScores: ${tips[i].scores.localteam_score} x ${tips[i].scores.visitorteam_score}`)
                                break;
                            }


                        }

                    }

                })
            }
        }, 30000)
    }
})







bot.launch()








