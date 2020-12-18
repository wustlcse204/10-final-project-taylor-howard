import React, { useState, useEffect } from 'react';

import './DetailsPage.css';
import '../../utils.css';

export default function DetailsPage({ ownerid, characterName, image, hasUltimateData, color }) {
  const [game, setGame] = useState('smash4');

  //TODO: Make api request for data
  //TODO: show name if an ultimate character[]
  //TODO: compare owner id to 59 to see if smash4 data exists
  return (
    <div className="details-page-div">
      <div className="detail-page-header" style={{ backgroundColor: color }}>
        <img src={image} alt={characterName} className="detail-header-photo" />
      </div>
      <div className="detail-page-content"></div>
    </div>
  );
}
