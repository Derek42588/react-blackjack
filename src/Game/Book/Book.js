export function check(player, dealer, playerScore, splittable) {
    let suggested = ""
    
    let playerAce = (player[0].number === "A" || (player[1].number === "A"))
    let doubleable = (player.length === 2);
    console.log(playerScore);

        if (dealer === 2 ) {
            switch (playerScore) {
                case 4:
                    if (splittable) {
                        suggested = "split"
                    } else {
                        suggested = "hit"
                    }
                    break;
                case 6:
                    if (splittable) {
                        suggested = "split"
                    } else {
                        suggested = "hit";
                    }
                    break;
                case 10:
                case 11:
                    if (doubleable) {
                        suggested = "double down"
                    } else {
                        suggested = "hit"
                    }
                    break;
                case 12:
                    if (splittable){
                        suggested = "split";
                    } else {
                        suggested = "hit";
                    }
                    break;
                case 13:
                    if (playerAce && doubleable) {
                        suggested = "hit";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 14:
                    if (playerAce && doubleable) {
                        suggested = "hit";
                    } else if (splittable) {
                        suggested = "split"
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 15:
                    if (playerAce && doubleable) {
                        suggested = "hit";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 16:
                    if (playerAce && doubleable) {
                        suggested = "hit";
                    } else if (splittable) {
                        suggested = "split";
                    } else {
                        suggested = "stand";
                    }
                break;
                case 17:
                    if (playerAce && doubleable) {
                        suggested = "hit";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 18:
                case 19:
                case 20:
                    suggested = "stand";
                    break;
                case 21:
                    suggested = "You have 21 ya fckn nerd";
                    break;
                default:
                    suggested = "hit"
                    break;
            
            }
        }
        if (dealer === 3) {
            switch (playerScore) {
                case 4:
                    if (splittable) {
                        suggested = "split"
                    } else {
                        suggested = "hit"
                    }
                    break;
                case 6:
                    if (splittable) {
                        suggested = "split"
                    } else {
                        suggested = "hit";
                    }
                    break;
                case 9:
                case 10:
                case 11:
                    if (doubleable) {
                        suggested = "double down"
                    } else {
                        suggested = "hit"
                    }
                    break;
                case 12:
                    if (splittable){
                        suggested = "split";
                    } else {
                        suggested = "hit";
                    }
                    break;
                case 13:
                    if (playerAce && doubleable) {
                        suggested = "hit";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 14:
                    if (playerAce && doubleable) {
                        suggested = "hit";
                    } else if (splittable) {
                        suggested = "split"
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 15:
                    if (playerAce && doubleable) {
                        suggested = "hit";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 16:
                    if (playerAce && doubleable) {
                        suggested = "hit";
                    } else if (splittable) {
                        suggested = "split";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 17:
                    if (playerAce && doubleable) {
                        suggested = "double down";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 18:
                    if (playerAce && doubleable) {
                        suggested = "double down";
                    } else if (splittable) {
                        suggested = "split";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 19:
                case 20:
                    suggested = "stand";
                    break;
                case 21:
                    suggested = "You have 21 ya fckn nerd";
                    break;
                default:
                    suggested = "hit"
                    break;
            
            }
        }
        if (dealer === 4) {
            switch (playerScore) {
                case 4:
                    if (splittable) {
                        suggested = "split"
                    } else {
                        suggested = "hit"
                    }
                    break;
                case 6:
                    if (splittable) {
                        suggested = "split"
                    } else {
                        suggested = "hit";
                    }
                    break;
                case 9:
                case 10:
                case 11:
                    if (doubleable) {
                        suggested = "double down"
                    } else {
                        suggested = "hit"
                    }
                    break;
                case 12:
                    if (splittable){
                        suggested = "split";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 13:
                    if (playerAce && doubleable) {
                        suggested = "hit";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 14:
                    if (playerAce && doubleable) {
                        suggested = "hit";
                    } else if (splittable) {
                        suggested = "split"
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 15:
                    if (playerAce && doubleable) {
                        suggested = "double down";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 16:
                    if (playerAce && doubleable) {
                        suggested = "double down";
                    } else if (splittable) {
                        suggested = "split";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 17:
                    if (playerAce && doubleable) {
                        suggested = "double down";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 18:
                    if (playerAce && doubleable) {
                        suggested = "double down";
                    } else if (splittable) {
                        suggested = "split";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 19:
                case 20:
                    suggested = "stand";
                    break;
                case 21:
                    suggested = "You have 21 ya fckn nerd";
                    break;
                default:
                    suggested = "hit"
                    break;
            
            }
        }
        if (dealer === 5) {
            switch (playerScore) {
                case 4:
                    if (splittable) {
                        suggested = "split"
                    } else {
                        suggested = "hit"
                    }
                    break;
                case 6:
                    if (splittable) {
                        suggested = "split"
                    } else {
                        suggested = "hit";
                    }
                    break;
                case 8: 
                    if (splittable) {
                        suggested = "split"
                    } else {
                        suggested = "hit"
                    }
                case 9:
                case 10:
                case 11:
                    if (doubleable) {
                        suggested = "double down"
                    } else {
                        suggested = "hit"
                    }
                    break;
                case 12:
                    if (splittable){
                        suggested = "split";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 13:
                    if (playerAce && doubleable) {
                        suggested = "double down";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 14:
                    if (playerAce && doubleable) {
                        suggested = "double down";
                    } else if (splittable) {
                        suggested = "split";
                    } else {
                        suggested = "stand"
                    }
                    break;
                case 15:
                    if (playerAce && doubleable) {
                        suggested = "double down";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 16:
                    if (playerAce && doubleable) {
                        suggested = "double down";
                    } else if (splittable) {
                        suggested = "split";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 17:
                    if (playerAce && doubleable) {
                        suggested = "double down";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 18:
                    if (playerAce && doubleable) {
                        suggested = "double down";
                    } else if (splittable) {
                        suggested = "split";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 19:
                case 20:
                    suggested = "stand";
                    break;
                case 21:
                    suggested = "You have 21 ya fckn nerd";
                    break;
                default:
                    suggested = "hit"
                    break;
            
            }
        }
        if (dealer === 6) {
            switch (playerScore) {
                case 4:
                    if (splittable) {
                        suggested = "split"
                    } else {
                        suggested = "hit"
                    }
                    break;
                case 6:
                    if (splittable) {
                        suggested = "split"
                    } else {
                        suggested = "hit";
                    }
                    break;
                case 9:
                case 10:
                case 11:
                    if (doubleable) {
                        suggested = "double down"
                    } else {
                        suggested = "hit"
                    }
                    break;
                case 12:
                    if (splittable){
                        suggested = "split";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 13:
                    if (playerAce && doubleable) {
                        suggested = "double down";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 14:
                    if (playerAce && doubleable) {
                        suggested = "double down";
                    } else if (splittable) {
                        suggested = "split";
                    } else {
                        suggested = "stand"
                    }
                    break;
                case 15:
                    if (playerAce && doubleable) {
                        suggested = "double down";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 16:
                    if (playerAce && doubleable) {
                        suggested = "double down";
                    } else if (splittable) {
                        suggested = "split";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 17:
                    if (playerAce && doubleable) {
                        suggested = "double down";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 18:
                    if (playerAce && doubleable) {
                        suggested = "double down";
                    } else if (splittable) {
                        suggested = "split";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 19:
                case 20:
                    suggested = "stand";
                    break;
                case 21:
                    suggested = "You have 21 ya fckn nerd";
                    break;
                default:
                    suggested = "hit"
                    break;
            
            }
        }
        if (dealer === 7) {
            switch (playerScore) {
                case 4:
                    if (splittable) {
                        suggested = "split"
                    } else {
                        suggested = "hit"
                    }
                    break;
                case 6:
                    if (splittable) {
                        suggested = "split"
                    } else {
                        suggested = "hit";
                    }
                    break;
                case 8: 
                case 9:
                    suggested = "hit";
                    break;
                case 10:
                case 11:
                    if (doubleable) {
                        suggested = "double down"
                    } else {
                        suggested = "hit"
                    }
                    break;
                case 12:
                    if (playerAce && splittable){
                        suggested = "split";
                    } else {
                        suggested = "hit";
                    }
                    break;
                case 14:
                    if (splittable) {
                        suggested = "split";
                    } else {
                        suggested = "hit"
                    }
                    break;
                case 16:
                    if (splittable) {
                        suggested = "split";
                    } else {
                        suggested = "hit";
                    }
                    break;
                case 17:
                    if (playerAce && doubleable) {
                        suggested = "hit";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 18:
                    if (splittable) {
                        suggested = "split";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 19:
                case 20:
                    suggested = "stand";
                    break;
                case 21:
                    suggested = "You have 21 ya fckn nerd";
                    break;
                default:
                    suggested = "hit"
                    break;
            
            }
        }
        if (dealer === 8) {
            switch (playerScore) {
                case 10:
                case 11:
                    if (doubleable) {
                        suggested = "double down"
                    } else {
                        suggested = "hit"
                    }
                    break;
                case 12:
                    if (playerAce && splittable){
                        suggested = "split";
                    } else {
                        suggested = "hit";
                    }
                    break;
                case 16:
                    if (splittable) {
                        suggested = "split";
                    } else {
                        suggested = "hit";
                    }
                    break;
                case 17:
                    if (playerAce && doubleable) {
                        suggested = "hit";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 18:
                    if (splittable) {
                        suggested = "split"
                    } else {
                        suggested = "stand"
                    }
                    break;
                case 19:
                case 20:
                    suggested = "stand";
                    break;
                case 21:
                    suggested = "You have 21 ya fckn nerd";
                    break;
                default:
                    suggested = "hit"
                    break;
            
            }
        }
        if (dealer === 9) {
            switch (playerScore) {
                case 10:
                case 11:
                    if (doubleable) {
                        suggested = "double down"
                    } else {
                        suggested = "hit"
                    }
                    break;
                case 12:
                    if (playerAce && splittable){
                        suggested = "split";
                    } else {
                        suggested = "hit";
                    }
                    break;
                case 16:
                    if (splittable) {
                        suggested = "split";
                    } else {
                        suggested = "hit";
                    }
                    break;
                case 17:
                    if (playerAce && doubleable) {
                        suggested = "hit";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 18:
                    if (playerAce && doubleable) {
                        suggested = "hit"
                    }
                    else if (splittable) {
                        suggested = "split"
                    } else {
                        suggested = "stand"
                    }
                    break;
                case 19:
                case 20:
                    suggested = "stand";
                    break;
                case 21:
                    suggested = "You have 21 ya fckn nerd";
                    break;
                default:
                    suggested = "hit"
                    break;
            
            }
        }
        if (dealer === 10) {
            switch (playerScore) {
                case 11:
                    if (doubleable) {
                        suggested = "double down"
                    } else {
                        suggested = "hit"
                    }
                    break;
                case 12:
                    if (playerAce && splittable){
                        suggested = "split";
                    } else {
                        suggested = "hit";
                    }
                    break;
                case 16:
                    if (splittable) {
                        suggested = "split";
                    } else {
                        suggested = "hit";
                    }
                    break;
                case 17:
                    if (playerAce && doubleable) {
                        suggested = "hit";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 18:
                    if (playerAce && doubleable) {
                        suggested = "hit"
                    } else {
                        suggested = "stand"
                    }
                    break;
                case 19:
                case 20:
                    suggested = "stand";
                    break;
                case 21:
                    suggested = "You have 21 ya fckn nerd";
                    break;
                default:
                    suggested = "hit"
                    break;
            
            }
        }
        if (dealer === 11) {
            switch (playerScore) {
                case 12:
                    if (playerAce && splittable){
                        suggested = "split";
                    } else {
                        suggested = "hit";
                    }
                    break;
                case 16:
                    if (splittable) {
                        suggested = "split";
                    } else {
                        suggested = "hit";
                    }
                    break;
                case 17:
                    if (playerAce && doubleable) {
                        suggested = "hit";
                    } else {
                        suggested = "stand";
                    }
                    break;
                case 18:
                    if (playerAce && doubleable) {
                        suggested = "hit"
                    } else {
                        suggested = "stand"
                    }
                    break;
                case 19:
                case 20:
                    suggested = "stand";
                    break;
                case 21:
                    suggested = "You have 21 ya fckn nerd";
                    break;
                default:
                    suggested = "hit"
                    break;
            
            }
        }
    return suggested;
}