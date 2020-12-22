import React, { useState, useEffect } from 'react';

import './CharacterCard.css';
import '../../utils.css';

import fallbackImage from '../../user-solid.svg';

export default function CharacterCard({
    characterName,
    imageURL,
    index,
    setDisplayState,
    currentCharacter,
}) {
    const [url, setURL] = useState(imageURL);

    function cardClicked() {
        //selects the character that was clicked and displays their detail page
        //these functionsa come from teh character grid component
        currentCharacter(index);
        setDisplayState(true);
    }

    return (
        <div className="character-card-wrapper">
            {/*  haacter image, sets url to fallback image when it fails to load */}
            <img
                className="character-image"
                src={url}
                alt={characterName}
                onClick={cardClicked}
                onError={() => setURL(fallbackImage)}
                style={{ objectFit: url === fallbackImage ? 'fill' : 'cover' }}
            />
            {/* Character name */}
            <h2 className="text character-card-title">{characterName}</h2>
        </div>
    );
}
