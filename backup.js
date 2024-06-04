/*if (params[i].property == "ball_possession") {
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
}*/