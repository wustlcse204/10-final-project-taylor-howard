import React, { Fragment, useEffect, useState } from 'react';

import './CharacterGrid.css';
import '../../utils.css';
import CharacterCard from '../CharacterCard/CharacterCard';
import DetailsPage from '../DetailsPage/DetailsPage.js';

export default function CharacterGrid() {
    //state arrays of characters.ids
    //characters from boht games
    const [universalCharacters, setUniversalCharacters] = useState([]);
    //characters in ultimate 
    const [ultimateCharacters, setUltimateCharacters] = useState([]);
    //charcters in ultimte but not 4
    const [newCharacters, setNewCharacters] = useState([]);
    //ids of characters in ltimate
    const [ultimateOwnerIds, setUltimateOwnerIds] = useState([]);
    //all characters
    const [allCharacters, setAllCharacters] = useState([]);
    //the currently displayed characters
    const [displayedCharacters, setDisplayedCharacters] = useState([]);
    //the currently displayed characters sorted
    const [sortedCharacters, setSortedCharacters] = useState([]);

    //the currenty selected character
    const [currentlySelectedCharacter, setSelectedCharacter] = useState(0);
    //whether ornot detail are displayed
    const [displayDetailScreen, setDisplayDetailscreen] = useState(false);
    //sort method
    const [sortBy, setSortedBy] = useState('ida');
    //filter method
    const [filter, setFilter] = useState('all');

    //get characters with smash 4 data
    useEffect(() => {
        //because of some limitations on the api, not all characters have info for the newest game (smash ultimate)
        //characters without data for ultimate do not appear in the character list for the ultimate endpoint even though they are in the game
        //I'm solving this on the character list screen by getting all characters from smahs 4, and then appending the addiontal characters present in ultimate that werent in 4 (this works because all characters in 4 re also in ultimate)
        //This will allow us to show at least a thumbnail for all characters in ultimate even if we can't show more in depth data
        const smash4xhttp = new XMLHttpRequest();

        const smash4url = 'https://api.kuroganehammer.com/api/characters';
        // data from kuroganehammer api: https://github.com/Frannsoft/FrannHammer/wiki

        smash4xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const universalCharacterResponse = JSON.parse(this.responseText);
                setUniversalCharacters(universalCharacterResponse);
            }
        };

        smash4xhttp.open('Get', smash4url, true);
        smash4xhttp.send();

        setDisplayedCharacters(allCharacters);
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

        let newInUltimate = [];
        //chek tht character is new to ultimate, ids under 59 are in both games
        for (const character of ultimateCharacters) {
            if (character.OwnerId >= 59) {
                newInUltimate.push(character);
            }
        }
        setNewCharacters(newInUltimate);
    }, [ultimateCharacters]);

    //set displayed characters when the charcters load in or the filter is changed
    useEffect(() => {
        setSelectedCharacter(0);
        if (filter === 'all') {
            setDisplayedCharacters(allCharacters);
        } else if (filter === 'smash4') {
            setDisplayedCharacters(universalCharacters);
        } else if (filter === 'ultimate') {
            setDisplayedCharacters(ultimateCharacters);
        } else if (filter === 'new') {
            setDisplayedCharacters(newCharacters);
        }
    }, [allCharacters, ultimateCharacters, universalCharacters, filter]);


    useEffect(() => {
        //update the order of characters when sort by or displayed characters changes
        if (sortBy === 'ida') {
            const sorted = [...displayedCharacters].sort((a, b) => {
                return a.OwnerId > b.OwnerId;
            });
            setSortedCharacters(sorted);
        } else if (sortBy === 'idd') {
            const sorted = [...displayedCharacters].sort((a, b) => {
                return a.OwnerId < b.OwnerId;
            });
            setSortedCharacters(sorted);
        } else if (sortBy === 'A-Z') {
            const sorted = [...displayedCharacters].sort((a, b) => {
                return a.Name.toLowerCase().localeCompare(b.Name.toLowerCase());
            });
            setSortedCharacters(sorted);
        } else if (sortBy === 'Z-A') {
            const sorted = [...displayedCharacters]
                .sort((a, b) => {
                    return a.Name.toLowerCase().localeCompare(b.Name.toLowerCase());
                })
                .reverse();
            setSortedCharacters(sorted);
        }
    }, [sortBy, displayedCharacters]);

    function hideDetailScreen() {
        setDisplayDetailscreen(false);
    }

    //cycle through the characters displayed by the dtails page
    function nextCharacter() {
        if (currentlySelectedCharacter < sortedCharacters.length - 1) {
            setSelectedCharacter(currentlySelectedCharacter + 1);
        } else {
            setSelectedCharacter(0);
        }
    }
    //cycle through the characters displayed by the dtails page
    function lastCharacter() {
        if (currentlySelectedCharacter > 0) {
            setSelectedCharacter(currentlySelectedCharacter - 1);
        } else {
            setSelectedCharacter(sortedCharacters.length - 1);
        }
    }

    //update the filer
    const changeFilter = (e) => {
        setFilter(e.target.value);
    };

    //update the sort method
    const changeSort = (e) => {
        setSortedBy(e.target.value);
    };

    return (
        <Fragment>
            <div className="character-filter-sort-div">
                <select
                    name="filter"
                    id="filter-input"
                    className="text dropdown"
                    onChange={changeFilter}
                >
                    <option className="filter-choice" value="all">
                        All
                    </option>
                    <option className="filter-choice" value="smash4">
                        Smash4
                    </option>
                    <option className="filter-choice" value="new">
                        New in Ultimate
                    </option>
                    <option className="filter-choice" value="ultimate">
                        Have Ultimate data
                    </option>
                </select>

                <select
                    name="sort-by"
                    id="sort-input"
                    className="text dropdown"
                    onChange={changeSort}
                >
                    <option className="sort-choice" value="ida">
                        ID Ascending
                    </option>
                    <option className="sort-choice" value="idd">
                        ID Descending
                    </option>
                    <option className="sort-choice" value="A-Z">
                        A-Z
                    </option>
                    <option className="sort-choice" value="Z-A">
                        Z-A
                    </option>
                </select>
            </div>
            <div
            // populate the charater grid based on the sorted characters arry
                className={`${
                    sortedCharacters.length > 0 ? 'character-grid-container' : 'loading-wrapper'
                }`}
            >
                {sortedCharacters.length > 0 ? (
                    sortedCharacters.map((character, index) => (
                        <CharacterCard
                            key={character.OwnerId}
                            characterName={character.DisplayName}
                            imageURL={character.ThumbnailUrl}
                            index={index}
                            setDisplayState={setDisplayDetailscreen}
                            currentCharacter={setSelectedCharacter}
                        />
                    ))
                ) : (
                    <i class="fas fa-spinner loading-spinner"></i>
                )}
            </div>
            {}
            <div
            // Chagne class base don whether or not the detaisl shoudl be showing
                className={`character-detail-page-container${
                    displayDetailScreen ? '-showing' : '-hidden'
                }`}
            >
                <i className="fas fa-times" id="exit-button" onClick={hideDetailScreen}></i>
                <div className="slideshow" id="character-slideshow-wrapper">
                    <i
                        className="fas fa-chevron-left arrow-buttons"
                        id="back-slide-button"
                        onClick={lastCharacter}
                    ></i>
                    {/* create a detail page for each character */}
                    {sortedCharacters.length > 0 && (
                        <DetailsPage
                            ownerid={sortedCharacters[currentlySelectedCharacter].OwnerId}
                            characterName={sortedCharacters[currentlySelectedCharacter].DisplayName}
                            image={sortedCharacters[currentlySelectedCharacter].ThumbnailUrl}
                            color={sortedCharacters[currentlySelectedCharacter].ColorTheme}
                            hasUltimateData={
                                ultimateOwnerIds.includes(
                                    sortedCharacters[currentlySelectedCharacter].OwnerId,
                                )
                                    ? true
                                    : false
                            }
                            has4Data={
                                sortedCharacters[currentlySelectedCharacter].OwnerId < 59
                                    ? true
                                    : false
                            }
                        />
                    )}
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
