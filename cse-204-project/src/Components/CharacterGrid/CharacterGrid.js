import React, { Fragment, useEffect, useState} from 'react'

import './CharacterGrid.css'
import '../../utils.css'
import CharacterCard from '../CharacterCard/CharacterCard'

export default function CharacterGrid() {

    //TODO: separate list for smash4 and ultimate characters
    const [universalCharacters, setUniversalCharacters] = useState([])
    const [ultimateCharacters, setUltimateCharacters] = useState([])
    // const [sortBy, setSortedBy] = sortBy("id")

    useEffect(() => {
        //because of some limitations on the api, not all characters have info for the newest game (smash ultimate)
        //characters without data for ultimate do not appear in the character list for the ultimate endpoint even though they are in the game
        //I'm solving this on the character list screen by getting all characters from smahs 4, and then appending the addiontal characters present in ultimate that werent in 4 (this works because all characters in 4 re also in ultimate)
        //This will allow us to show at least a thumbnail for all characters in ultimate even if we can't show more in depth data
        const smash4xhttp = new XMLHttpRequest()

        const smash4url = "https://api.kuroganehammer.com/api/characters"        

        let characterList = []
        smash4xhttp.onreadystatechange = function (){
            if(this.readyState === 4 && this.status === 200){
                const universalCharacterResponse = JSON.parse(this.responseText)
                // characterList = characterResponse
                //TODO: request the characters from ultimate
                setUniversalCharacters(universalCharacterResponse)
            }
        }

        smash4xhttp.open("Get", smash4url, true)
        smash4xhttp.send()
    }, [])

    useEffect(() => {
        const ultimatexhttp = new XMLHttpRequest()
        const ultimateURL = "https://api.kuroganehammer.com/api/characters?game=ultimate"

        ultimatexhttp.onreadystatechange = function(){
            if(this.readyState === 4 && this.status ===200) {
                const ultimateCharacterResponse = JSON.parse(this.responseText)

                // console.log(characterList)
                // // characterList = characterList.concat(ultimateCharacterResponse)
                // for (const character of ultimateCharacterResponse){
                //     // console.log(charact)
                //     if(character.OwnerId > characterList.length){
                //         characterList.push(character)
                //     }
                // }
                // setUniversalCharacters(characterList)
                // console.log(characterList)
                setUltimateCharacters(ultimateCharacterResponse)
            }
        }

        ultimatexhttp.open("Get", ultimateURL, true)
        ultimatexhttp.send()
    }, [])

    //TODO: Fetch character lists
    return (
        //TODO: add sort options
        //TODO: add details pop option
        <Fragment>
            <div className="character-grid-container">
                {
                    //TODO: make a separate list for smash 4 and ultimate characters
                    universalCharacters.map((character) => (
                        // <p key={character.OwnerId}>{character.Name}</p>
                        <CharacterCard characterName={character.Name} imageURL={character.ThumbnailUrl} universalCharacter={true} />
                    ))
                }
            </div>
            <h1 className="text">New in Smash Ultimate!</h1>
            <div className="character-grid-container">
            {
                    //TODO: make a separate list for smash 4 and ultimate characters
                    ultimateCharacters.map((character) => {
                        if(character.OwnerId > universalCharacters.length){
                            return (
                                <CharacterCard characterName={character.Name} imageURL={character.ThumbnailUrl} universalCharacter={false} />
                            )
                        }
                    })
                        // if(character.OwnerId < universalCharacters.length){
                        //     console.log(character)
                        // }
                        // (<CharacterCard characterName={character.Name} imageURL={character.ThumbnailUrl} />)
                    
                }
            </div>
        </Fragment>
        //TODO: make the slideshow 
    )
}
