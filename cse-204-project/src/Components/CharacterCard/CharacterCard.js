import React, {useState, useEffect} from 'react';

import './CharacterCard.css';
import '../../utils.css';

import fallbackImage from '../../user-solid.svg'

export default function CharacterCard({
    characterName,
    imageURL,
    index,
    setDisplayState,
    currentCharacter,
}) {
    // foo()
    const [url, setURL] = useState(imageURL)

    function cardClicked() {
        currentCharacter(index);
        setDisplayState(true);
    }

    // console.log(characterName + index);
    return (
        <div className="character-card-wrapper">
            <img
                className="character-image"
                src={url}
                alt={characterName}
                onClick={cardClicked}
                onError={() => setURL(fallbackImage)}
                style={{objectFit: url === fallbackImage ? "fill" : "cover"}}
            />
            <h2 className="text character-card-title">{characterName}</h2>
        </div>
    );
}
