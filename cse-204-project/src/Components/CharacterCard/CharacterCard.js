import React, { Fragment } from 'react';

import './CharacterCard.css';
import '../../utils.css';

export default function CharacterCard({
  characterName,
  imageURL,
  universalCharacter,
}) {
  //Todo: display character name if not a universal character
  return (
    <div className="character-card-wrapper">
      <img
        className="character-image"
        src={imageURL}
        alt={characterName}
      />
    </div>
  );
}
