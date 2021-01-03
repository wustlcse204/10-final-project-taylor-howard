import React, { useState, useEffect } from 'react';

import './MovementDetails.css';
import '../../utils.css';
import MovementDataTables from '../MovementDataTables/MovementDataTables';

export default function MovementDetails({ data, color }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // set loading based on whether or not the daa has loaded
        if (data === undefined || data.length === 0) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [data]);
    return (
        <div
            className={`${loading ? 'loading-wrapper' : 'movement-details-wrapper'}`}
            style={{ backgroundColor: color }}
        >
            {loading ? (
                <i class="fas fa-spinner loading-spinner"></i>
            ) : (
                // Load in the data table whenever the data loads
                <MovementDataTables data={data} />
            )}
        </div>
    );
}
