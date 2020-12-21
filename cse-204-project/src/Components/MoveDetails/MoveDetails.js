import React, { useState, useEffect } from 'react';

import './MoveDetails.css';
import '../../utils.css';
import MoveDataTables from '../MoveDataTables/MoveDataTables';

export default function MoveDetails({ data, color }) {
    const [loading, setLoading] = useState(true);

    const [groundMoves, setGroundMoves] = useState([]);
    const [aerialMoves, setAerialMoves] = useState([]);
    const [specialMoves, setSpecialMoves] = useState([]);
    const [throwMoves, setThrowMoves] = useState([]);

    useEffect(() => {
        if (data === undefined || data.length === 0) {
            setLoading(true);
        } else {
            const ground = data.filter((move) => move.MoveType === 'ground');
            const aerial = data.filter((move) => move.MoveType === 'aerial');
            const special = data.filter((move) => move.MoveType === 'special');
            const throws = data.filter((move) => move.MoveType === 'throw');
            setGroundMoves(ground);
            setAerialMoves(aerial);
            setSpecialMoves(special);
            setThrowMoves(throws);
            setLoading(false);
        }
    }, [data]);

    console.log('start');
    console.log(groundMoves);
    console.log(aerialMoves);
    console.log(specialMoves);
    console.log(throwMoves);
    //TODO: add a loading spinner
    return (
        <div className="move-details-wrapper" style={{ backgroundColor: color }}>
            {loading === true ? (
                <p>loading</p>
            ) : (
                <MoveDataTables
                    groundMoves={groundMoves}
                    aerialMoves={aerialMoves}
                    specialMoves={specialMoves}
                    throws={throwMoves}
                />
                // <p>done</p>
            )}
        </div>
    );
}
