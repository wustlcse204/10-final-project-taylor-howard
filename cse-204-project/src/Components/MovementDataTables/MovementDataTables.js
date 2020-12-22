import React from 'react';

import './MovementDataTables.css';
import '../../utils.css';

export default function MovementDataTables({ data }) {
    // const [attributeIndex, setAttributeIndex] = useState(0);

    return (
        <table>
            <thead>
                <tr>
                    <th>Attribute</th>
                    <th>Value</th>
                </tr>   
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
