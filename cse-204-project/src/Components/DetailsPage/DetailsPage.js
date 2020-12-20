import React, { useState, useEffect } from 'react';

import './DetailsPage.css';
import '../../utils.css';

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

    //TODO: Make api request for data
    //TODO: show name if an ultimate character[]
    //TODO: compare owner id to 59 to see if smash4 data exists

    //use effect to setgame
    useEffect(() => {
        if (hasUltimateData) {
            setGame('ultimate');
        } else {
            setGame('smash4');
        }
        console.log('here');
    }, [characterName]);

    //use effect to set has details
    useEffect(() => {
        if (game == 'smash4') {
            if (has4Data) {
                setHasDetails(true);
            } else {
                setHasDetails(false);
            }
        } else if (game == 'ultimate') {
            if (hasUltimateData) {
                setHasDetails(true);
            } else {
                setHasDetails(false);
            }
        }
    }, [game]);

    return (
        <div className="details-page-div">
            <div className="detail-page-header" style={{ backgroundColor: color }}>
                <img src={image} alt={characterName} className="detail-header-photo" />
            </div>
            <div className="detail-page-content">
                <ul className="games-list">
                    {/* TODO: add a class for selected/not selected */}
                    <li
                        className={`game-list-item text ${
                            game == 'smash4' ? 'selected' : 'unselected'
                        }`}
                        onClick={() => setGame('smash4')}
                    >
                        Smash 4
                    </li>
                    <li
                        className={`game-list-item text ${
                            game == 'ultimate' ? 'selected' : 'unselected'
                        }`}
                        onClick={() => setGame('ultimate')}
                    >
                        Ultimate
                    </li>
                </ul>
                <div className="details-container">
                    {/* TODO: dont show this if the data is unavailable */}
                    <ul className="detail-list">
                        <li
                            className={`detail-category text ${
                                infoType == 'moves' ? 'selected' : 'unselected'
                            }`}
                            onClick={() => setInfoType('moves')}
                        >
                            Moves
                        </li>
                        <li
                            className={`detail-category text ${
                                infoType == 'movements' ? 'selected' : 'unselected'
                            }`}
                            onClick={() => setInfoType('movements')}
                        >
                            Movements
                        </li>
                        <li
                            className={`detail-category text ${
                                infoType == 'attributes' ? 'selected' : 'unselected'
                            }`}
                            onClick={() => setInfoType('attributes')}
                        >
                            Attributes
                        </li>
                    </ul>
                    {/* TODO: create a table component, show it conditionally based on hasDetails */}
                </div>
            </div>
        </div>
    );
}
