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
            {/* TODO: add a footer */}
        </Fragment>
        // <div className="App">
        //   <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <p>
        //       Edit <code>src/App.js</code> and save to reload.
        //     </p>
        //     <a
        //       className="App-link"
        //       href="https://reactjs.org"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       Learn React
        //     </a>
        //   </header>
        // </div>
    );
}

export default App;
