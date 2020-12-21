import React, { Fragment } from 'react';

import './MovementDataTables.css';
import '../../utils.css';

export default function MovementDataTables() {
    return (
        <Fragment>
            <h1 className="text">Movement Attributes</h1>
            <table>
                <thead>
                    <th>Attribute</th>
                    <th>Value</th>
                </thead>
                <tbody></tbody>
            </table>
        </Fragment>
    );
}
