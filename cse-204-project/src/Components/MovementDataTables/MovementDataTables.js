import React, { Fragment, useState, useEffect } from 'react';

import './MovementDataTables.css';
import '../../utils.css';

export default function MovementDataTables({ data }) {
    // const [attributeIndex, setAttributeIndex] = useState(0);

    return (
        <table>
            <thead>
                <th>Attribute</th>
                <th>Value</th>
            </thead>
            <tbody>
                {data.map((attribute, index) => (
                    <tr key={index}>
                        <td>{attribute.Name}</td>
                        <td>{attribute.Value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
