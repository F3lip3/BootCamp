import React from 'react';
import './App.css';

import Menu from './components/Menu';
import Timeline from './components/Timeline';

function App() {
    return (
        <div className="wrapper">
            <Menu />
            <Timeline />
        </div>
    );
}

export default App;
