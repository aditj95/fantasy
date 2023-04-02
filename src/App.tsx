import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { MatchList, SeriesData } from './models/SeriesInfo';
import { FantasyInfo } from './models/Scorecard';
import { Squad, Player, SquadData } from './models/Squad';
import { computeScore, Points } from './heuristics/Heuristics';

const seriesInfo = async () => {
    const req = await axios.post<SeriesData>(
        'https://api.cricapi.com/v1/series_info?apikey=ede46d11-0d95-4ade-8bec-760bc8c4f842&offset=0&id=c75f8952-74d4-416f-b7b4-7da4b4e3ae6e'
    );
    return req.data;
};

const scorecard = async (id: string) => {
    const req = await axios.post<FantasyInfo>(
        `https://api.cricapi.com/v1/match_scorecard?apikey=ede46d11-0d95-4ade-8bec-760bc8c4f842&offset=0&id=${id}`
    );
    return req.data;
};

const squadCall = async (id: string) => {
    const req = await axios.post<Squad>(
        `https://api.cricapi.com/v1/match_squad?apikey=ede46d11-0d95-4ade-8bec-760bc8c4f842&offset=0&id=${id}`
    );
    return req.data;
};

interface ICurrentMatchProps {
    id: string;
}

function PlayerComponent({ player, point }: { player: Player; point: Points }) {
    const [addBonus, setAddBonus] = useState(false);
    const [bonus, setBonus] = useState(0);

    let total = point.batting + point.bowling + point.fielding;

    if (bonus) {
        total += bonus;
    }
    return (
        <tr>
            <td>{player.name}</td>
            <td>{point.batting}</td>
            <td>{point.bowling}</td>
            <td>{point.fielding}</td>
            <td>{bonus}</td>
            <td>
                {addBonus && (
                    <input
                        style={{ width: '4rem' }}
                        type="number"
                        placeholder="Bonus"
                        onChange={(e) => setBonus(parseInt(e.target.value))}
                    />
                )}
                <b onClick={() => setAddBonus((p) => !p)}>{total}</b>
            </td>
        </tr>
    );
}

const Table = ({ squad, playerPoints }: { squad: SquadData; playerPoints: Record<string, Points> }) => {
    const orderedSquad = squad.players.sort((a: Player, b: Player) => {
        const pointsA = playerPoints[a.id.toLowerCase()];
        const totalA = pointsA ? pointsA.bowling + pointsA.batting + pointsA.fielding : 0;

        const pointsB = playerPoints[b.id.toLowerCase()];
        const totalB = pointsB ? pointsB.bowling + pointsB.batting + pointsB.fielding : 0;

        return Math.abs(totalB) - Math.abs(totalA);
    });

    return (
        <div style={{ width: '50%' }}>
            <h3>{squad.teamName}</h3>
            <table style={{ borderCollapse: 'separate', width: '100%' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Batting</th>
                        <th>Bowling</th>
                        <th>Fielding</th>
                        <th>Bonus</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orderedSquad.map((player: Player) => (
                        <PlayerComponent
                            key={player.id}
                            player={player}
                            point={playerPoints[player.id.toLowerCase()] ?? { batting: 0, bowling: 0, fielding: 0 }}
                        ></PlayerComponent>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

function CurrentMatch({ id }: ICurrentMatchProps) {
    const [matchInfo, setMatchInfo] = useState<FantasyInfo | undefined>(undefined);
    const [squadData, setSquad] = useState<Squad | undefined>(undefined);

    useEffect(() => {
        scorecard(id).then((info) => {
            setMatchInfo(info);
            squadCall(info.data.id).then((squadInfo) => {
                setSquad(squadInfo);
            });
        });
    }, [id]);

    if (!matchInfo || !squadData) {
        return <>Loading...</>;
    }

    const playerPoints: Record<string, Points> = computeScore(matchInfo.data.scorecard);

    return (
        <div style={{ display: 'flex', gap: '72px', width: '100%' }}>
            <Table playerPoints={playerPoints} squad={squadData.data[0]} />
            <Table playerPoints={playerPoints} squad={squadData.data[1]} />
        </div>
    );
}

function App() {
    const [series, setSeries] = useState<SeriesData | undefined>(undefined);

    const [currentMatch, setCurrentMatch] = useState<string | undefined>(undefined);

    useEffect(() => {
        seriesInfo().then((data) => setSeries(data));
    }, []);

    const orderMatch =
        series &&
        series.data.matchList.sort(
            (a: MatchList, b: MatchList) => new Date(a.dateTimeGMT).getTime() - new Date(b.dateTimeGMT).getTime()
        );

    const notStarted = (match: MatchList) => !!(match.status.toLowerCase() == 'match not started');

    return (
        <div className="App" style={{ display: 'flex' }}>
            <div style={{ width: '240px', textAlign: 'left' }}>
                {orderMatch &&
                    orderMatch.map((match: MatchList) => (
                        <div key={match.id}>
                            <button
                                style={{ width: '200px' }}
                                disabled={notStarted(match)}
                                onClick={() => {
                                    setCurrentMatch(match.id);
                                }}
                            >
                                {match.name}
                            </button>
                        </div>
                    ))}
            </div>
            <div style={{ width: '100%', padding: '64px', maxWidth: '1400px' }}>
                {currentMatch && <CurrentMatch id={currentMatch}></CurrentMatch>}
            </div>
        </div>
    );
}

export default App;
