import React, { Fragment } from 'react';

import './MoveDataTables.css';
import '../../utils.css';

export default function MoveDataTables({ groundMoves, aerialMoves, specialMoves, throws }) {
    return (
        <Fragment>
            <h1 className="text">Ground Attacks</h1>

            <table className="moves-data-table" id="ground-moves-table">
                <thead>
                    <th>Attack</th>
                    <th>Hitbox Active</th>
                    <th>Base Damage</th>
                    <th>Angle</th>
                    <th>Base Knockback/Set Knockback</th>
                    <th>Knockback Growth</th>
                    <th>Weight dependent</th>
                </thead>
                <tbody></tbody>
            </table>

            <h1 className="text">Aerial Attacks</h1>
            <table className="moves-data-table" id="aerial-moves-table">
                <thead>
                    <th>Attack</th>
                    <th>Hitbox Active</th>
                    <th>First Actionable Frame</th>
                    <th>Base Damage</th>
                    <th>Angle</th>
                    <th>Base Knockback/Set Knockback</th>
                    <th>Landing Lag</th>
                    <th>Weight dependent</th>
                </thead>
                <tbody></tbody>
            </table>
            <h1 className="text">Special Attacks</h1>
            <table className="moves-data-table" id="special-moves-table">
                <thead>
                    <th>Attack</th>
                    <th>Hitbox Active</th>
                    <th>First Active Frame</th>
                    <th>Base Damage</th>
                    <th>Angle</th>
                    <th>Base Knockback/Set Knockback</th>
                    <th>Knockback Growth</th>
                </thead>
                <tbody></tbody>
            </table>
            <h1 className="text">Throws</h1>

            <table className="moves-data-table" id="throw-moves-table">
                <thead>
                    <th>Attack</th>
                    <th>Base Damage</th>
                    <th>Angle</th>
                    <th>Base Knockback/Set Knockback</th>
                    <th>Knockback Growth</th>
                </thead>
                <tbody></tbody>
            </table>
        </Fragment>
    );
}
