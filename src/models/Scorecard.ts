export interface Score {
    r: number;
    w: number;
    o: number;
    inning: string;
}

export interface Player {
    id: string;
    name: string;
}

export interface Batting {
    batsman: Player;
    dismissal: string;
    bowler: Player;
    catcher: Player;
    "dismissal-text": string;
    "r": number;
    "b": number;
    "4s": number;
    "6s": number;
    sr: number;
}

export interface Bowling {
    bowler: Player;
    o: number;
    m: number;
    r: number;
    w: number;
    nb: number;
    wd: number;
    eco: number;
}

export interface Catching {
    stumped: number;
    runout: number;
    catch: number;
    catcher: Player;
}

export interface Extras {
    r: number;
    b: number;
    lb: number;
    w: number;
    nb: number;
    p: number;
}

export interface Totals {
    R: number;
    O: number;
    W: number;
    RR: number;
}

export interface Scorecard {
    batting: Batting[];
    bowling: Bowling[];
    catching: Catching[];
    extras: Extras;
    totals: Totals;
    innings: number;
    team: number;
}

export interface Data {
    id: string;
    name: string;
    matchType: string;
    status: string;
    venue: string;
    date: string;
    dateTimeGMT: Date;
    teams: string[];
    score: Score[];
    tossWinner: string;
    tossChoice: string;
    matchWinner: string;
    series_id: string;
    scorecard: Scorecard[];
}

export interface Info {
    hitsToday: number;
    hitsLimit: number;
    credits: number;
    server: number;
    queryTime: number;
}

export interface FantasyInfo {
    apikey: string;
    data: Data;
    status: string;
    info: Info;
}