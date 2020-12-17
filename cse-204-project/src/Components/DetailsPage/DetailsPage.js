import React, { useState, useEffect } from 'react';

import './DetailsPage.css';
import '../../utils.css';

export default function DetailsPage({ ownerid, characterName, image }) {
  const [game, setGame] = useState('smash4');

  //TODO: Make api request for data
  //TODO: show name if an ultimate character
  return (
    <div className="details-page-div">
      <img src={image} alt={characterName} />
    </div>
  );
}
