import React, { useState, useEffect } from 'react';

import './DetailsPage.css';
import '../../utils.css';
import MoveDetails from '../MoveDetails/MoveDetails';
import MovementDetails from '../MovementDetails/MovementDetails';

export default function DetailsPage({
    ownerid,
    characterName,
    image,
    hasUltimateData,
    has4Data,
    color,
}) {
    const [game, setGame] = useState('smash4');
    const [hasDetails, setHasDetails] = useState(true);
    const [infoType, setInfoType] = useState('moves');
    const [moveData, setMoveData] = useState();
    const [movementsData, setMovementsData] = useState();

    //TODO: update we dont have this data message and styling

    //use effect to setgame
    useEffect(() => {
        //clear data when character changes
        setMoveData([]);
        setMovementsData([]);
        if (hasUltimateData) {
            setGame('ultimate');
        } else {
            setGame('smash4');
        }
    }, [characterName]);

    //use effect to set has details
    useEffect(() => {
        if (game === 'smash4') {
            if (has4Data) {
                setHasDetails(true);
            } else {
                setHasDetails(false);
            }
        } else if (game === 'ultimate') {
            if (hasUltimateData) {
                setHasDetails(true);
            } else {
                setHasDetails(false);
            }
        }
    }, [game]);

    useEffect(() => {
        if (infoType === 'moves') {
            const xhttpMovesData = new XMLHttpRequest();
            xhttpMovesData.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    setMoveData(JSON.parse(this.responseText));
                }
            };

            xhttpMovesData.open(
                'GET',
                `https://api.kuroganehammer.com/api/characters/${ownerid}/moves?game=${game}`,
                true,
            );
            xhttpMovesData.send();
        } else if (infoType === 'movements') {
            const xhttpMovementsData = new XMLHttpRequest();
            xhttpMovementsData.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    setMovementsData(JSON.parse(this.responseText));
                }
            };

            xhttpMovementsData.open(
                'GET',
                `https://api.kuroganehammer.com/api/characters/${ownerid}/movements?game=${game}`,
                true,
            );
            xhttpMovementsData.send();
        }
    }, [infoType, game, characterName]);

    return (
        <div className="details-page-div">
            <div className="detail-page-header" style={{ backgroundColor: color }}>
                <img src={image} alt={characterName} className="detail-header-photo" />
                <h2 className="text detail-page-character-title">{characterName}</h2>
            </div>
            <div className="detail-page-content">
                <ul className="games-list">
                    <li
                        className={`game-list-item text ${
                            game === 'smash4' ? 'selected' : 'unselected'
                        }`}
                        onClick={() => setGame('smash4')}
                    >
                        Smash 4
                    </li>
                    <li
                        className={`game-list-item text ${
                            game === 'ultimate' ? 'selected' : 'unselected'
                        }`}
                        onClick={() => setGame('ultimate')}
                    >
                        Ultimate
                    </li>
                </ul>
                <div className="details-container">
                    <ul className="detail-list">
                        <li
                            className={`detail-category text ${
                                infoType === 'moves' ? 'selected' : 'unselected'
                            }`}
                            onClick={() => setInfoType('moves')}
                        >
                            Moves
                        </li>
                        <li
                            className={`detail-category text ${
                                infoType === 'movements' ? 'selected' : 'unselected'
                            }`}
                            onClick={() => setInfoType('movements')}
                        >
                            Movement Attributes
                        </li>
                    </ul>
                    {hasDetails === false && (
                        <h1>We do not have this characters data for this game</h1>
                    )}

                    {hasDetails && infoType === 'moves' && (
                        <MoveDetails data={moveData} color={color} />
                    )}

                    {hasDetails && infoType === 'movements' && (
                        <MovementDetails data={movementsData} color={color} />
                    )}
                </div>
            </div>
        </div>
    );
}
