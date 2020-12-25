import React, { Fragment } from 'react';

import './MoveDataTables.css';
import '../../utils.css';

export default function MoveDataTables({ groundMoves, aerialMoves, specialMoves, throws }) {
    // create and populate tables with the data passed to this omponent as props
    return (
        <Fragment>
            <h1 className="move-title text">Ground Attacks</h1>

            <table className="moves-data-table" id="ground-moves-table">
                <thead>
                    <tr>
                        <th className="moves-th">Attack</th>
                        <th className="moves-th">Hitbox Active</th>
                        <th className="moves-th">Base Damage</th>
                        <th className="moves-th">Angle</th>
                        <th className="moves-th">Base Knockback/Set Knockback</th>
                        <th className="moves-th">Knockback Growth</th>
                    </tr>
                </thead>
                <tbody>
                    {groundMoves.map((move, index) => (
                        <tr key={index}>
                            <td className="moves-td">{move.Name}</td>
                            <td className="moves-td">{move.HitboxActive}</td>
                            <td className="moves-td">{move.BaseDamage}</td>
                            <td className="moves-td">{move.Angle}</td>
                            <td className="moves-td">{move.BaseKnockBackSetKnockback}</td>
                            <td className="moves-td">{move.KnockbackGrowth}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1 className="move-title text">Aerial Attacks</h1>
            <table className="moves-data-table" id="aerial-moves-table">
                <thead>
                    <tr>
                        <th className="moves-th">Attack</th>
                        <th className="moves-th">Hitbox Active</th>
                        <th className="moves-th">First Actionable Frame</th>
                        <th className="moves-th">Base Damage</th>
                        <th className="moves-th">Angle</th>
                        <th className="moves-th">Base Knockback/Set Knockback</th>
                        <th className="moves-th">Landing Lag</th>
                    </tr>
                </thead>
                <tbody>
                    {aerialMoves.map((move, index) => (
                        <tr key={index}>
                            <td className="moves-td">{move.Name}</td>
                            <td className="moves-td">{move.HitboxActive}</td>
                            <td className="moves-td">{move.FirstActionableFrame}</td>
                            <td className="moves-td">{move.BaseDamage}</td>
                            <td className="moves-td">{move.Angle}</td>
                            <td className="moves-td">{move.BaseKnockBackSetKnockback}</td>
                            <td className="moves-td">{move.LandingLag}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h1 className="move-title text">Special Attacks</h1>
            <table className="moves-data-table" id="special-moves-table">
                <thead>
                    <tr>
                        <th className="moves-th">Attack</th>
                        <th className="moves-th">Hitbox Active</th>
                        <th className="moves-th">First Active Frame</th>
                        <th className="moves-th">Base Damage</th>
                        <th className="moves-th">Angle</th>
                        <th className="moves-th">Base Knockback/Set Knockback</th>
                        <th className="moves-th">Knockback Growth</th>
                    </tr>
                </thead>
                <tbody>
                    {specialMoves.map((move, index) => (
                        <tr key={index}>
                            <td className="moves-td">{move.Name}</td>
                            <td className="moves-td">{move.HitboxActive}</td>
                            <td className="moves-td">{move.FirstActionableFrame}</td>
                            <td className="moves-td">{move.BaseDamage}</td>
                            <td className="moves-td">{move.Angle}</td>
                            <td className="moves-td">{move.BaseKnockBackSetKnockback}</td>
                            <td className="moves-td">{move.KnockbackGrowth}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h1 className="move-title text">Throws</h1>

            <table className="moves-data-table" id="throw-moves-table">
                <thead>
                    <tr>
                        <th className="moves-th">Attack</th>
                        <th className="moves-th">Base Damage</th>
                        <th className="moves-th">Angle</th>
                        <th className="moves-th">Base Knockback/Set Knockback</th>
                        <th className="moves-th">Knockback Growth</th>
                    </tr>
                </thead>
                <tbody>
                    {throws.map((move, index) => (
                        <tr key={index}>
                            <td className="moves-td">{move.Name}</td>
                            <td className="moves-td">{move.BaseDamage}</td>
                            <td className="moves-td">{move.Angle}</td>
                            <td className="moves-td">{move.BaseKnockBackSetKnockback}</td>
                            <td className="moves-td">{move.KnockbackGrowth}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}
