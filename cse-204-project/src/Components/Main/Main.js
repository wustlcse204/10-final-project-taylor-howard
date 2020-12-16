import './Main.css'
import '../../utils.css'

import React from 'react'
import CharacterGrid from '../CharacterGrid/CharacterGrid'

export default function Main() {
    return (
        <main id="main-section">
            <div className="content-wrapper" id="main-content-wrapper">
                <CharacterGrid />
            </div>
        </main>
    )
}
