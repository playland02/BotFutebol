import { Telegraf } from "telegraf"
import { HttpsProxyAgent } from "https-proxy-agent"
import { json } from "sequelize"

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

    const req = await fetch('https://horizonte-rp.online/users').then((res) => {
        return res.json()
    })

    let user = req.filter((data) => {
        return data.token === ctx.payload
    })
    let isChatId = req.filter((data) => {
        return data.chat_id == ctx.message.chat.id
    })

    if (user.length == 0) {
        await ctx.reply('Token invalido. Tente novamente !')
    }

    if (user.length > 0 && user[0].chat_id != 0) {
        await ctx.reply('Eu ja estou vinculado a sua conta !. Se esta mensagem for um engano, contate meu criador.')
    }
    if (isChatId.length > 0) {
        await ctx.reply('Esse telegram ja esta vinculado a uma conta .')
    }

    if (user.length > 0 && user[0].chat_id == 0 && isChatId.length < 1) {
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

        await fetch(`https://horizonte-rp.online/user/${user[0]._id}`, config)

        await ctx.reply("Sua conta foi vinculada com sucesso , agora voce receberá todos alertas de seus bots !")

    }

})

bot.command('salvarOdds', async (ctx) => {
    if (ctx.chat.id == id_master && ctx.from.id == id_master) {
        ctx.reply('O bot esta salvando as odds das partidas ')
        let url = `https://api.sokkerpro.net/eventApi/2024-06-18/-1000/web_${createStringRandom(16)}`

        let options = {

            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0',
                'Content-Type': 'application/json'


            }
        }

        const data = await fetch(url, options)
            .then((res) => {
                if (!res.ok) {

                    throw new Error('Erro na requisição');
                } else {

                    return res.json()
                }
            }).catch((Error) => {
                console.log(Error)
            })


        let count = 0
        if (data?.data !== null || data?.data !== undefined) {

            data.data.forEach(async (game) => {
                url = `https://api.sokkerpro.net/fixture/${game.id}/web_${createStringRandom(16)}`

                const fixture = await fetch(url, options)
                    .then((res) => {
                        if (!res.ok) {

                            throw new Error('Erro na requisição');
                        } else {

                            return res.json()
                        }
                    }).catch((Error) => {
                        console.log(Error)
                    })

                if (fixture?.data?.odds !== null && fixture?.data?.odds !== undefined) {
                    url = `https://horizonte-rp.online/prematch`

                    let home_standing = fixture.data?.standing[0]?.standings?.data?.filter((i)=>{
                        return i.team_name == game.localTeam.name
                    })

                    let away_standing = fixture.data?.standing[0]?.standings?.data?.filter((i)=>{
                        return i.team_name == game.visitorTeam.name
                    })

                    options = {

                        method: 'POST',
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0',
                            'Content-Type': 'application/json',
                            'Accept': "*/*"
                        },
                        body: JSON.stringify({
                            id_game: game.id,
                            odds: JSON.stringify(fixture.data.odds),
                            standing :  JSON.stringify({home_standing,away_standing})
                            
                        })

                    }

                    const odd = await fetch(url, options)
                        .then((res) => {
                            if (!res.ok) {

                                throw new Error('Erro na requisição');
                            } else {
                                count += 1
                                return res.json()
                            }
                        }).catch((Error) => {
                            console.log(Error)
                        })
                }
               

            })

            await ctx.reply(` ${count} matches were added with odds added or updated database.`)

        } else {
            await ctx.reply(` Games not found ! `)
        }
    }
})


bot.command('startbots', async (ctx) => {
    if (ctx.chat.id == id_master && ctx.from.id == id_master) {
        await ctx.telegram.sendMessage(id_master, `Todos bots foram ativado  !`)

        setInterval(async () => {
            
            const options = {

                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0',

                    'Accept': '*/*',
                    'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
                    'Accept-Encoding': 'gzip, deflate, br'


                }
            }
            const bots = await fetch('https://horizonte-rp.online/bots', options).then((res) => {
                if (!res.ok) {

                    throw new Error('Erro na requisição');
                } else {

                    return res.json()
                }
            }).catch((error) => console.log(error))

            const data = await fetch(`https://api.sokkerpro.net/liveApi/web_${createStringRandom(16)}`, options).then((res) => {
                if (!res.ok) {

                    throw new Error('Erro na requisição');
                } else {

                    return res.json()
                }
            }).catch((error) => console.log(error))


            if (data && data.data && bots && bots.length > 0) {
                await bots.forEach(async (bot) => {

                    try {

                        if (bot.on) {
                            console.log(bot.name)
                            const params = JSON.parse(bot.params)
                            let new_data = []
                            let tips = []



                            //nova data sem dados nulos
                            await data.data.forEach(async (game) => {

                                if (game.stats && game.stats.length > 1) {
                                    for (let i = 0; i < params.length; i++) {
                                        // goals
                                        if (Object.values(params[i]).includes('goals') &&
                                            game.scores && game.scores.localteam_score && game.scores.visitorteam_score
                                        ) {
                                            if (params[i].target == 'favorite') {
                                                try {


                                                    const data_odd = await fetch(`https://api.sokkerpro.net/fixture/${game.id}/` + createStringRandom(16)).then((res) => {
                                                        return res.json()
                                                    })

                                                    if (data_odd.data && data_odd.data.stats && data_odd.data.stats.length > 1 &&
                                                        data_odd.data.odds && data_odd.data.odds.full_odd && data_odd.data.odds.full_odd[0] &&
                                                        data_odd.data.odds.full_odd[0].markets && data_odd.data.odds.full_odd[0].markets[0].data[0] &&
                                                        data_odd.data.odds.full_odd[0].markets[0].data[2] && data_odd.data.odds.full_odd[0].markets[0].data[0].value &&
                                                        data_odd.data.odds.full_odd[0].markets[0].data[2].value && data_odd.data.odds.full_odd[0].markets[0].data[2].value != 0) {

                                                        const home_favorite = data_odd.data.odds.full_odd.filter((odd) => {
                                                            return odd.title == "1x2 Market"
                                                        })[0].markets[0].data[0].value


                                                        const away_favorite = data_odd.data.odds.full_odd.filter((odd) => {
                                                            return odd.title == "1x2 Market"
                                                        })[0].markets[0].data[2].value


                                                        if ((home_favorite <= 1.50 && home_favorite >= 1.01) || (away_favorite <= 1.50 && away_favorite >= 1.01)) {

                                                            tips.push(game)
                                                            continue
                                                        } else {
                                                            continue
                                                        }
                                                    }

                                                } catch (error) {

                                                }
                                            } else {
                                                continue
                                            }
                                        }


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
                                        if (Object.values(params[i]).includes('shots_total') &&
                                            game.stats.length > 1 &&
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


                            })

                            //analisa os parametros
                            if (new_data.length > 0) {


                                for (let i = 0; i < params.length; i++) {


                                    //goals params
                                    if (params[i].property == "goals") {

                                        if (params[i].target == "home" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.scores.localteam_score >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.scores.localteam_score >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.scores.visitorteam_score >= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.scores.visitorteam_score >= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "game" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return (game.scores.localteam_score + game.scores.visitorteam_score) >= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return (game.scores.localteam_score + game.scores.visitorteam_score) >= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        //
                                        if (params[i].target == "home" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.scores.localteam_score <= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.scores.localteam_score <= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.scores.visitorteam_score <= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.scores.visitorteam_score <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "game" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return (game.scores.localteam_score + game.scores.visitorteam_score) <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return (game.scores.localteam_score + game.scores.visitorteam_score) <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }

                                        //goals == 
                                        if (params[i].target == "home" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.scores.localteam_score == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.scores.localteam_score == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.scores.visitorteam_score == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.scores.visitorteam_score == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "game" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return (game.scores.localteam_score + game.scores.visitorteam_score) == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return (game.scores.localteam_score + game.scores.visitorteam_score) == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                    }

                                    //param minutes
                                    if ((params[i].property == "minutes")) {
                                        if (tips.length > 0) {

                                            let isFound = tips.filter((game) => {
                                                return parseInt(params[i].minute_from) <= game.time.minute && game.time.minute <= parseInt(params[i].minute_until)
                                            })

                                            if (isFound.length > 0) {
                                                tips = isFound
                                            } else {

                                                tips = []
                                                break
                                            }


                                        } else {
                                            let isFound = new_data.filter((game) => {

                                                return parseInt(params[i].minute_from) <= game.time.minute && game.time.minute <= parseInt(params[i].minute_until)
                                            })

                                            if (isFound.length > 0) {
                                                tips = isFound
                                            } else {

                                                tips = []
                                                break
                                            }

                                        }

                                        continue

                                    }
                                    //params pression
                                    if (params[i].property == "pression") {
                                        if (params[i].target == "home") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    let score_total = parseInt(game.home_score) + parseInt(game.away_score)
                                                    let score = Math.round((parseInt(game.home_score) / score_total) * 100)
                                                    return score >= parseFloat(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    let score_total = parseInt(game.home_score) + parseInt(game.away_score)
                                                    let score = Math.round((parseInt(game.home_score) / score_total) * 100)
                                                    return score >= parseFloat(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    let score_total = parseInt(game.home_score) + parseInt(game.away_score)
                                                    let score = Math.round((parseInt(game.away_score) / score_total) * 100)
                                                    return score >= parseFloat(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    let score_total = parseInt(game.home_score) + parseInt(game.away_score)
                                                    let score = Math.round((parseInt(game.away_score) / score_total) * 100)

                                                    return score >= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    let score_total = parseInt(game.home_score) + parseInt(game.away_score)
                                                    let score = Math.round((parseInt(game.home_score) / score_total) * 100)
                                                    let score_2 = Math.round((parseInt(game.away_score) / score_total) * 100)
                                                    return score >= parseFloat(params[i].value) || score_2 >= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    let score_total = parseInt(game.home_score) + parseInt(game.away_score)
                                                    let score = Math.round((parseInt(game.home_score) / score_total) * 100)
                                                    let score_2 = Math.round((parseInt(game.away_score) / score_total) * 100)

                                                    return score >= parseFloat(params[i].value) || score_2 >= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                    }
                                    ////params corners
                                    if (params[i].property == "corners") {
                                        if (params[i].target == "home" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].corners >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].corners >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].corners >= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].corners >= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].corners >= parseInt(params[i].value) || game.stats[1].corners >= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].corners >= parseInt(params[i].value) || game.stats[1].corners >= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        //
                                        if (params[i].target == "home" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].corners <= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].corners <= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].corners <= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].corners <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].corners <= parseInt(params[i].value) || game.stats[1].corners <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].corners <= parseInt(params[i].value) || game.stats[1].corners <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }

                                        //corners == 
                                        if (params[i].target == "home" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].corners == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].corners == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].corners == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].corners == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].corners == parseInt(params[i].value) || game.stats[1].corners == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].corners == parseInt(params[i].value) || game.stats[1].corners == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                    }
                                    //dangerous attacks
                                    if (params[i].property == "dangerous_attacks") {

                                        if (params[i].target == "home" && params[i].conditional == ">") {
                                            if (tips.length > 0) {


                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.dangerous_attacks >= parseInt(params[i].value)
                                                })


                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.dangerous_attacks >= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].attacks.dangerous_attacks >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].passes.attacks.dangerous_attacks >= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.dangerous_attacks >= parseInt(params[i].value) || game.stats[1].attacks.dangerous_attacks >= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.dangerous_attacks >= parseInt(params[i].value) || game.stats[1].attacks.dangerous_attacks >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        //
                                        if (params[i].target == "home" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.dangerous_attacks <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.dangerous_attacks <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].attacks.dangerous_attacks <= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].passes.attacks.dangerous_attacks <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.dangerous_attacks <= parseInt(params[i].value) || game.stats[1].attacks.dangerous_attacks <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.dangerous_attacks <= parseInt(params[i].value) || game.stats[1].attacks.dangerous_attacks <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }

                                        //attacks.dangerous_attacks == 
                                        if (params[i].target == "home" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.dangerous_attacks == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.dangerous_attacks == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].attacks.dangerous_attacks == parseInt(params[i].value)
                                                })

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].passes.attacks.dangerous_attacks == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.dangerous_attacks == parseInt(params[i].value) || game.stats[1].attacks.dangerous_attacks == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.dangerous_attacks == parseInt(params[i].value) || game.stats[1].attacks.dangerous_attacks == parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                    }
                                    //attacks > 
                                    if (params[i].property == "attacks") {
                                        if (params[i].target == "home" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.attacks >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.attacks >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].attacks.attacks >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].passes.attacks.attacks >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.attacks >= parseInt(params[i].value) || game.stats[1].attacks.attacks >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.attacks >= parseInt(params[i].value) || game.stats[1].attacks.attacks >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        //
                                        if (params[i].target == "home" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.attacks <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.attacks <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].attacks.attacks <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].passes.attacks.attacks <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.attacks <= parseInt(params[i].value) || game.stats[1].attacks.attacks <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.attacks <= parseInt(params[i].value) || game.stats[1].attacks.attacks <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }

                                        //attacks.attacks == 
                                        if (params[i].target == "home" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.attacks == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.attacks == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].attacks.attacks == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].passes.attacks.attacks == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.attacks == parseInt(params[i].value) || game.stats[1].attacks.attacks == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.attacks == parseInt(params[i].value) || game.stats[1].attacks.attacks == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                    }
                                    ////appm 
                                    if (params[i].property == "appm") {
                                        if (params[i].target == "home" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.avg_dangerous_attacks >= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.avg_dangerous_attacks >= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].attacks.avg_dangerous_attacks >= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].attacks.avg_dangerous_attacks >= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.avg_dangerous_attacks >= parseFloat(params[i].value) || game.stats[1].attacks.avg_dangerous_attacks >= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.avg_dangerous_attacks >= parseFloat(params[i].value) || game.stats[1].attacks.avg_dangerous_attacks >= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            }
                                            continue

                                        }
                                        //
                                        if (params[i].target == "home" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.avg_dangerous_attacks <= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.avg_dangerous_attacks <= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].attacks.avg_dangerous_attacks <= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].attacks.avg_dangerous_attacks <= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.avg_dangerous_attacks <= parseFloat(params[i].value) || game.stats[1].attacks.avg_dangerous_attacks <= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.avg_dangerous_attacks <= parseFloat(params[i].value) || game.stats[1].attacks.avg_dangerous_attacks <= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            }
                                            continue

                                        }

                                        //attacks.avg_dangerous_attacks == 
                                        if (params[i].target == "home" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.avg_dangerous_attacks == parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.avg_dangerous_attacks == parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].attacks.avg_dangerous_attacks == parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].attacks.avg_dangerous_attacks == parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.avg_dangerous_attacks == parseFloat(params[i].value) || game.stats[1].attacks.avg_dangerous_attacks == parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.avg_dangerous_attacks == parseFloat(params[i].value) || game.stats[1].attacks.avg_dangerous_attacks == parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            }
                                            continue

                                        }
                                    }
                                    //APM
                                    if (params[i].property == "apm") {
                                        if (params[i].target == "home" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.avg_attacks >= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.avg_attacks >= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].attacks.avg_attacks >= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].attacks.avg_attacks >= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.avg_attacks >= parseFloat(params[i].value) || game.stats[1].attacks.avg_attacks >= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.avg_attacks >= parseFloat(params[i].value) || game.stats[1].attacks.avg_attacks >= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        //
                                        if (params[i].target == "home" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.avg_attacks <= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.avg_attacks <= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].attacks.avg_attacks <= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].attacks.avg_attacks <= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.avg_attacks <= parseFloat(params[i].value) || game.stats[1].attacks.avg_attacks <= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.avg_attacks <= parseFloat(params[i].value) || game.stats[1].attacks.avg_attacks <= parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }

                                        //attacks.avg_attacks == 
                                        if (params[i].target == "home" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.avg_attacks == parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.avg_attacks == parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].attacks.avg_attacks == parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].attacks.avg_attacks == parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].attacks.avg_attacks == parseFloat(params[i].value) || game.stats[1].attacks.avg_attacks == parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].attacks.avg_attacks == parseFloat(params[i].value) || game.stats[1].attacks.avg_attacks == parseFloat(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                    }
                                    //shots total
                                    if (params[i].property == "shots_total") {
                                        if (params[i].target == "home" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.total >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.total >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].shots.total >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].shots.total >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.total >= parseInt(params[i].value) || game.stats[1].shots.total >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.total >= parseInt(params[i].value) || game.stats[1].shots.total >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        //
                                        if (params[i].target == "home" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.total <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.total <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].shots.total <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].shots.total <= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.total <= parseInt(params[i].value) || game.stats[1].shots.total <= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.total <= parseInt(params[i].value) || game.stats[1].shots.total <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }

                                        //shots.total == 
                                        if (params[i].target == "home" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.total == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.total == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].shots.total == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].shots.total == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.total == parseInt(params[i].value) || game.stats[1].shots.total == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.total == parseInt(params[i].value) || game.stats[1].shots.total == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                    }
                                    // shots ongoal
                                    if (params[i].property == "shots_ongoal") {
                                        if (params[i].target == "home" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.ongoal >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.ongoal >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].shots.ongoal >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].shots.ongoal >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.ongoal >= parseInt(params[i].value) || game.stats[1].shots.ongoal >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.ongoal >= parseInt(params[i].value) || game.stats[1].shots.ongoal >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        //
                                        if (params[i].target == "home" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.ongoal <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.ongoal <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].shots.ongoal <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].shots.ongoal <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.ongoal <= parseInt(params[i].value) || game.stats[1].shots.ongoal <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.ongoal <= parseInt(params[i].value) || game.stats[1].shots.ongoal <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }

                                        //shots.ongoal == 
                                        if (params[i].target == "home" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.ongoal == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.ongoal == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].shots.ongoal == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].shots.ongoal == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.ongoal == parseInt(params[i].value) || game.stats[1].shots.ongoal == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.ongoal == parseInt(params[i].value) || game.stats[1].shots.ongoal == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            }
                                            continue

                                        }
                                    }
                                    // shots offgoal
                                    if (params[i].property == "shots_offgoal") {
                                        if (params[i].target == "home" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.offgoal >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.offgoal >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].shots.offgoal >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].shots.offgoal >= parseInt(params[i].value)
                                                })

                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.offgoal >= parseInt(params[i].value) || game.stats[1].shots.offgoal >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.offgoal >= parseInt(params[i].value) || game.stats[1].shots.offgoal >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        //
                                        if (params[i].target == "home" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.offgoal <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.offgoal <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].shots.offgoal <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].shots.offgoal <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.offgoal <= parseInt(params[i].value) || game.stats[1].shots.offgoal <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.offgoal <= parseInt(params[i].value) || game.stats[1].shots.offgoal <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }

                                        //shots.offgoal == 
                                        if (params[i].target == "home" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.offgoal == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.offgoal == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].shots.offgoal == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].shots.offgoal == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.offgoal == parseInt(params[i].value) || game.stats[1].shots.offgoal == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.offgoal == parseInt(params[i].value) || game.stats[1].shots.offgoal == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                    }
                                    // shots blocked
                                    if (params[i].property == "shots_blocked") {
                                        if (params[i].target == "home" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.blocked >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.blocked >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].shots.blocked >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].shots.blocked >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.blocked >= parseInt(params[i].value) || game.stats[1].shots.blocked >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.blocked >= parseInt(params[i].value) || game.stats[1].shots.blocked >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        //
                                        if (params[i].target == "home" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.blocked <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.blocked <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].shots.blocked <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].shots.blocked <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.blocked <= parseInt(params[i].value) || game.stats[1].shots.blocked <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.blocked <= parseInt(params[i].value) || game.stats[1].shots.blocked <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }

                                        //shots.blocked == 
                                        if (params[i].target == "home" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.blocked == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.blocked == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].shots.blocked == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].shots.blocked == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.blocked == parseInt(params[i].value) || game.stats[1].shots.blocked == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.blocked == parseInt(params[i].value) || game.stats[1].shots.blocked == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                    }

                                    // shots insidebox
                                    if (params[i].property == "shots_insidebox") {
                                        if (params[i].target == "home" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.insidebox >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.insidebox >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].shots.insidebox >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }


                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].shots.insidebox >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {
                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.insidebox >= parseInt(params[i].value) || game.stats[1].shots.insidebox >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.insidebox >= parseInt(params[i].value) || game.stats[1].shots.insidebox >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            }
                                            continue

                                        }
                                        //
                                        if (params[i].target == "home" && params[i].conditional == "<") {
                                            if (tips.length > 0) {
                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.insidebox <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.insidebox <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {
                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].shots.insidebox <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].shots.insidebox <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.insidebox <= parseInt(params[i].value) || game.stats[1].shots.insidebox <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.insidebox <= parseInt(params[i].value) || game.stats[1].shots.insidebox <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            }
                                            continue

                                        }

                                        //shots.insidebox == 
                                        if (params[i].target == "home" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.insidebox == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.insidebox == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].shots.insidebox == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].shots.insidebox == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.insidebox == parseInt(params[i].value) || game.stats[1].shots.insidebox == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.insidebox == parseInt(params[i].value) || game.stats[1].shots.insidebox == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            }
                                            continue

                                        }
                                    }
                                    //// shots offside
                                    if (params[i].property == "shots_offside") {
                                        if (params[i].target == "home" && params[i].conditional == ">") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.outsidebox >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.outsidebox >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {
                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].shots.outsidebox >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].shots.outsidebox >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            }
                                            continue
                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == ">") {
                                            if (tips.length > 0) {
                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.outsidebox >= parseInt(params[i].value) || game.stats[1].shots.outsidebox >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.outsidebox >= parseInt(params[i].value) || game.stats[1].shots.outsidebox >= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            }
                                            continue
                                        }
                                        //
                                        if (params[i].target == "home" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.outsidebox <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.outsidebox <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].shots.outsidebox <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].shots.outsidebox <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "<") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.outsidebox <= parseInt(params[i].value) || game.stats[1].shots.outsidebox <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.outsidebox <= parseInt(params[i].value) || game.stats[1].shots.outsidebox <= parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }

                                        //shots.outsidebox == 
                                        if (params[i].target == "home" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.outsidebox == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.outsidebox == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            }
                                            continue

                                        }
                                        if (params[i].target == "away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[1].shots.outsidebox == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[1].shots.outsidebox == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }
                                            }
                                            continue

                                        }
                                        if (params[i].target == "home_or_away" && params[i].conditional == "=") {
                                            if (tips.length > 0) {

                                                let isFound = tips.filter(game => {
                                                    return game.stats[0].shots.outsidebox == parseInt(params[i].value) || game.stats[1].shots.outsidebox == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            } else {
                                                let isFound = new_data.filter(game => {
                                                    return game.stats[0].shots.outsidebox == parseInt(params[i].value) || game.stats[1].shots.outsidebox == parseInt(params[i].value)
                                                })
                                                if (isFound.length > 0) {
                                                    tips = isFound
                                                } else {

                                                    tips = []
                                                    break
                                                }

                                            }
                                            continue

                                        }
                                    }
                                }
                            }

                            //verifica se é uma entrada nova e manda 
                            try {
                                if (tips.length > 0) {

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
                                                country_name: tips[i].country_name,
                                                league_name: tips[i].league_name,
                                                home_name: tips[i].localTeam.name,
                                                away_name: tips[i].visitorTeam.name,
                                                created_in: Date.now(),
                                                result: "NR"

                                            })

                                        }

                                        const filter_games = await fetch('https://horizonte-rp.online/tip', config).then(async (res) => {
                                            return res.json()
                                        })

                                        if (!filter_games.error) {
                                            await ctx.telegram.sendMessage(bot.chat_id, messageTip(tips[i], bot))
                                            break;
                                        }
                                    }
                                }
                            } catch (error) {
                                console.log(error)
                            }

                            tips = []
                            new_data = []
                        }
                    } catch (error) {
                        console.log(error)
                    }

                })
            }
        }, 60000)
    }
})

function messageTip(tip, bot) {
    let string = `${bot.name}\n
    \nCountry: ${tip.country_name}
    \nLeague: ${tip.league_name}
    \nMatch: ${tip.localTeam.name} x ${tip.visitorTeam.name}
    \nScores: ${tip.scores.localteam_score} x ${tip.scores.visitorteam_score}
    \nMinutes: ${tip.time.minute}
    \n\nLIVE STATISTIC\n
    `



    string += `\nCorners: ${tip?.stats[0]?.corners ? (tip.stats[0].corners) : ('0')} x ${tip?.stats[1]?.corners ? (tip.stats[1].corners) : ('0')}`


    string += `\nShots total: ${tip?.stats[0]?.shots?.total ? (tip?.stats[0]?.shots?.total) : ('0')} x ${tip?.stats[1]?.shots?.total ? (tip?.stats[1]?.shots?.total) : ('0')}`


    string += `\nShots ongoal: ${tip?.stats[0]?.shots?.ongoal ? (tip?.stats[0]?.shots?.ongoal) : ('0')} x ${tip?.stats[1]?.shots?.ongoal ? (tip?.stats[1]?.shots?.ongoal) : ('0')}`


    string += `\nShots offgoal: ${tip?.stats[0]?.shots?.offgoal ? (tip?.stats[0]?.shots?.offgoal) : ('0')} x ${tip?.stats[1]?.shots?.offgoal ? (tip?.stats[1]?.shots?.offgoal) : ('0')}`


    string += `\nAPM: ${tip?.stats[0]?.atttacks?.avg_attacks ? (tip.stats[0].atttacks.avg_attacks) : ('0')} x ${tip?.stats[1]?.atttacks?.avg_attacks ? (tip.stats[1].atttacks.avg_attacks) : ('0')}`


    string += `\nAPPM: ${tip?.stats[0]?.atttacks?.avg_dangerous_attacks ? (tip.stats[0].atttacks.avg_dangerous_attacks) : ('0')} x ${tip?.stats[1]?.atttacks?.avg_dangerous_attacks ? (tip.stats[1].atttacks.avg_dangerous_attacks) : ('0')}`


    string += `\nYellow cards: ${tip?.stats[0]?.yellowcards ? (tip?.stats[0]?.yellowcards) : ('0')} x ${tip?.stats[1]?.yellowcards ? (tip?.stats[1]?.yellowcards) : ('0')}`


    string += `\nRed cards: ${tip?.stats[0]?.redcards ? (tip?.stats[0]?.redcards) : ('0')} x ${tip?.stats[1]?.redcards ? (tip?.stats[1]?.redcards) : ('0')}`



    string += '\n\nPRE - LIVE\n'


    string += `\nOVER 0.5 HT: ${tip?.goals05ht ? (tip.goals05ht) : ('0')}% `


    string += `\nOVER 1.5 HT: ${tip?.goals15ht ? (tip.goals15ht) : ('0')}% `


    string += `\nOVER 1.5 FT: ${tip?.goals15ft ? (tip.goals15ft) : ('0')}% `


    string += `\nOVER 2.5 FT: ${tip?.goals25ft ? (tip.goals25ft) : ('0')}% `


    string += `\nOVER 3.5 FT: ${tip?.goals35ft ? (tip.goals35ft) : ('0')}% `



    string += `\nCorners predict: ${tip?.cornerprediction ? (tip.cornerprediction) : ('0')}`



    string += `\nBTTS: ${tip?.bttsvalue ? (tip.bttsvalue) : ('0')}% `



    return string
}





bot.launch()








