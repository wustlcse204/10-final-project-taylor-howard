import React, { Fragment } from 'react';

import './CharacterCard.css';
import '../../utils.css';

export default function CharacterCard({
    characterName,
    imageURL,
    index,
    setDisplayState,
    currentCharacter,
}) {
    // foo()

    function cardClicked() {
        currentCharacter(index);
        setDisplayState(true);
    }

    // console.log(characterName + index);
    //Todo: display character name if not a universal character
    return (
        <div className="character-card-wrapper">
            <img
                className="character-image"
                src={imageURL}
                alt={characterName}
                onClick={cardClicked}
            />
            <h2 className="text character-card-title">{characterName}</h2>
        </div>
    );
}
