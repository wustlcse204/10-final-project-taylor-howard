import './App.css';
import './utils.css';
import Navbar from './Components/Navbar/Navbar.js';
import Main from './Components/Main/Main.js';
import { Fragment } from 'react';

function App() {
    return (
        <Fragment>
            <Navbar />
            <Main />
        </Fragment>
    );
}

export default App;
