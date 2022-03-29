export interface Player {
    id: string;
    name: string;
    role: string;
    battingStyle: string;
    bowlingStyle: string;
    country: string;
    playerImg: string;
}

export interface SquadData {
    teamName: string;
    players: Player[];
}

export interface Info {
    hitsToday: number;
    hitsLimit: number;
    credits: number;
    server: number;
    queryTime: number;
}

export interface Squad {
    apikey: string;
    data: SquadData[];
    status: string;
    info: Info;
}
