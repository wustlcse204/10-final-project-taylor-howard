import React, { Fragment, useEffect, useState } from 'react';

import './CharacterGrid.css';
import '../../utils.css';
import CharacterCard from '../CharacterCard/CharacterCard';
import DetailsPage from '../DetailsPage/DetailsPage.js';

export default function CharacterGrid() {
    const [universalCharacters, setUniversalCharacters] = useState([]);
    const [ultimateCharacters, setUltimateCharacters] = useState([]);
    const [ultimateOwnerIds, setUltimateOwnerIds] = useState([]);

    const [allCharacters, setAllCharacters] = useState([]);

    const [currentlySelectedCharacter, setSelectedCharacter] = useState(0);
    const [displayDetailScreen, setDisplayDetailscreen] = useState(false);
    // const [sortBy, setSortedBy] = sortBy("id")

    //get characters with smash 4 data
    useEffect(() => {
        //TODO: update this
        //because of some limitations on the api, not all characters have info for the newest game (smash ultimate)
        //characters without data for ultimate do not appear in the character list for the ultimate endpoint even though they are in the game
        //I'm solving this on the character list screen by getting all characters from smahs 4, and then appending the addiontal characters present in ultimate that werent in 4 (this works because all characters in 4 re also in ultimate)
        //This will allow us to show at least a thumbnail for all characters in ultimate even if we can't show more in depth data
        const smash4xhttp = new XMLHttpRequest();

        const smash4url = 'https://api.kuroganehammer.com/api/characters';

        smash4xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const universalCharacterResponse = JSON.parse(this.responseText);
                // characterList = characterResponse
                //Todo: request the characters from ultimate
                setUniversalCharacters(universalCharacterResponse);
            }
        };

        smash4xhttp.open('Get', smash4url, true);
        smash4xhttp.send();
    }, []);

    //get characters with ultimate data
    useEffect(() => {
        const ultimatexhttp = new XMLHttpRequest();
        const ultimateURL = 'https://api.kuroganehammer.com/api/characters?game=ultimate';

        ultimatexhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const ultimateCharacterResponse = JSON.parse(this.responseText);
                setUltimateCharacters(ultimateCharacterResponse);
            }
        };

        ultimatexhttp.open('Get', ultimateURL, true);
        ultimatexhttp.send();
    }, []);

    //create a list of all characters without overlap
    useEffect(() => {
        setAllCharacters([]);
        let characterList = [...universalCharacters];

        for (const character of ultimateCharacters) {
            //This value is hard coded because the api is out of order. Every character with an id of 58 or higher is onlyh on teh ultimate list
            if (character.OwnerId >= 59) {
                characterList.push(character);
            }
        }
        setAllCharacters(characterList);
    }, [ultimateCharacters, universalCharacters]);

    //create an array of the ownerids with ultimate data
    useEffect(() => {
        setUltimateOwnerIds(ultimateCharacters.map((character) => character.OwnerId));
    }, [ultimateCharacters]);

    function hideDetailScreen() {
        setDisplayDetailscreen(false);
    }

    function nextCharacter() {
        if (currentlySelectedCharacter < allCharacters.length - 1) {
            setSelectedCharacter(currentlySelectedCharacter + 1);
        } else {
            setSelectedCharacter(0);
        }
    }

    function lastCharacter() {
        if (currentlySelectedCharacter > 0) {
            setSelectedCharacter(currentlySelectedCharacter - 1);
        } else {
            setSelectedCharacter(allCharacters.length - 1);
        }
    }

    return (
        //TODO: add sort options
        //TODO: add filtering
        //TODO: add details pop option
        //TODO: add backup image
        <Fragment>
            <div className="character-grid-container">
                {allCharacters.map((character, index) => (
                    // <p key={character.OwnerId}>{character.Name}</p>
                    <CharacterCard
                        key={character.OwnerId}
                        characterName={character.Name}
                        imageURL={character.ThumbnailUrl}
                        // universalCharacter={true}
                        index={index}
                        setDisplayState={setDisplayDetailscreen}
                        currentCharacter={setSelectedCharacter}
                    />
                ))}
            </div>
            {
                //TODO: show loading spinner
                //TODO: only divide with certain sorting methods
            }
            {/* {allCharacters.length > 0 ? <h1 className="text">New in Smash Ultimate!</h1> : <p>loading</p>}
      <div className="character-grid-container">
        {ultimateCharacters.map((character, index) => {
          if (character.OwnerId > universalCharacters.length) {
            return (
              <CharacterCard
                key={character.OwnerId}
                characterName={character.Name}
                imageURL={character.ThumbnailUrl}
                universalCharacter={false}
                // This value is the number of characters in the smash list - the number of characters in both lists
                index={index + 35}
                setDisplayState={setDisplayDetailscreen}
                currentCharacter={setSelectedCharacter}
              />
            );
          }
        })}
      </div> */}

            <div
                className={`character-detail-page-container${
                    displayDetailScreen ? '-showing' : '-hidden'
                }`}
            >
                <i className="fas fa-times" id="exit-button" onClick={hideDetailScreen}></i>
                <div className="slideshow" id="character-slideshow-wrapper">
                    {
                        //TODO: replace arrows with image of previous/next character
                    }
                    <i
                        className="fas fa-chevron-left arrow-buttons"
                        id="back-slide-button"
                        onClick={lastCharacter}
                    ></i>
                    {allCharacters.length > 0 ? (
                        <DetailsPage
                            ownerid={allCharacters[currentlySelectedCharacter].OwnerId}
                            characterName={allCharacters[currentlySelectedCharacter].DisplayName}
                            image={allCharacters[currentlySelectedCharacter].ThumbnailUrl}
                            color={allCharacters[currentlySelectedCharacter].ColorTheme}
                            hasUltimateData={
                                ultimateOwnerIds.includes(
                                    allCharacters[currentlySelectedCharacter].OwnerId,
                                )
                                    ? true
                                    : false
                            }
                            has4Data={
                                allCharacters[currentlySelectedCharacter].OwnerId < 59
                                    ? true
                                    : false
                            }
                        />
                    ) : // <img src={allCharacters[currentlySelectedCharacter].ThumbnailUrl} />
                    null}
                    <i
                        className="fas fa-chevron-right arrow-buttons"
                        id="forward-slide-button"
                        onClick={nextCharacter}
                    ></i>
                </div>
            </div>
        </Fragment>
    );
}
