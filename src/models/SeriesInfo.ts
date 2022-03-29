export interface Info {
    id: string;
    name: string;
    startdate: string;
    enddate: string;
    odi: number;
    t20: number;
    test: number;
    squads: number;
    matches: number;
}

export interface MatchList {
    id: string;
    name: string;
    matchType: string;
    status: string;
    venue: string;
    date: string;
    dateTimeGMT: string;
    teams: string[];
    fantasyEnabled: boolean;
    hasSquad: boolean;
}

export interface Data {
    info: Info;
    matchList: MatchList[];
}

export interface Info2 {
    hitsToday: number;
    hitsLimit: number;
    credits: number;
    server: number;
    queryTime: number;
}

export interface SeriesData {
    apikey: string;
    data: Data;
    status: string;
    info: Info2;
}