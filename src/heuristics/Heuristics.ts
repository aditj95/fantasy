import { Batting, Bowling, Catching, Scorecard } from '../models/Scorecard';

export interface Points {
    batting: number;
    bowling: number;
    fielding: number;
}

export const computeScore = (scorecardList: Scorecard[]) => {
    const playerPoints: Record<string, Points> = {};

    scorecardList.forEach((scorecard) => {
        scorecard.batting.forEach((batter) => {
            if (!playerPoints[batter.batsman.id.toLowerCase()]) {
                playerPoints[batter.batsman.id.toLowerCase()] = { batting: 0, bowling: 0, fielding: 0 };
            }
            playerPoints[batter.batsman.id.toLowerCase()].batting += computeBatter(batter);
        });

        scorecard.bowling.forEach((bowler) => {
            if (!playerPoints[bowler.bowler.id.toLowerCase()]) {
                playerPoints[bowler.bowler.id.toLowerCase()] = { batting: 0, bowling: 0, fielding: 0 };
            }
            playerPoints[bowler.bowler.id.toLowerCase()].bowling += computeBowler(bowler);
        });

        scorecard.catching.forEach((catcher) => {
            if (!playerPoints[catcher.catcher.id.toLowerCase()]) {
                playerPoints[catcher.catcher.id.toLowerCase()] = { batting: 0, bowling: 0, fielding: 0 };
            }
            playerPoints[catcher.catcher.id.toLowerCase()].fielding += computeCatcher(catcher);
        });
    });

    return playerPoints;
};

const computeBowler = (bowler: Bowling) => {
    let points = 0;

    //wicket
    points += bowler.w * 25;

    //maiden
    points += bowler.m * 30;

    //economy
    if (bowler.o >= 2) {
        if (bowler.eco < 4) {
            points += 50;
        }
        if (bowler.eco >= 4 && bowler.eco < 6) {
            points += 30;
        }
        if (bowler.eco >= 6 && bowler.eco < 7) {
            points += 15;
        }
        if (bowler.eco >= 8 && bowler.eco < 9) {
            points -= 10;
        }
        if (bowler.eco >= 9 && bowler.eco < 10) {
            points -= 15;
        }
        if (bowler.eco >= 10) {
            points -= 20;
        }
    }
    //milestone
    if (bowler.w == 2) {
        points += 10;
    }
    if (bowler.w == 3) {
        points += 20;
    }
    if (bowler.w == 4) {
        points += 30;
    }
    if (bowler.w >= 5) {
        points += 40;
    }
    return points;
};

const computeCatcher = (catcher: Catching) => {
    let points = 0;

    points += catcher.catch * 10;
    points += catcher.runout * 10;
    points += catcher.stumped * 25;

    return points;
};

const computeBatter = (batter: Batting) => {
    let points = 0;

    //runs
    points += batter.r;

    //4s
    points += batter['4s'] * 2;

    //6s
    points += batter['6s'] * 3;

    //duck
    if (batter.r == 0) {
        // check batter not out
        if (
            !(
                batter['dismissal-text'] == null ||
                batter['dismissal-text'].toLowerCase() == 'not out' ||
                batter['dismissal-text'].toLowerCase() == 'notout' ||
                batter.dismissal == null
            )
        ) {
            points -= 20;
        }
    }

    //sr
    if (batter.b >= 10) {
        if (batter.sr < 75) {
            points -= 30;
        }

        if (batter.sr >= 75 && batter.sr < 100) {
            points -= 15;
        }

        if (batter.sr >= 125 && batter.sr < 150) {
            points += 15;
        }

        if (batter.sr >= 150) {
            points += 20;
        }
    }

    //run bonus
    if (batter.r >= 25 && batter.r < 50) {
        points += 10;
    }

    if (batter.r >= 50 && batter.r < 75) {
        points += 20;
    }

    if (batter.r >= 75 && batter.r < 100) {
        points += 30;
    }

    if (batter.r >= 100) {
        points += 40;
    }

    return points;
};
