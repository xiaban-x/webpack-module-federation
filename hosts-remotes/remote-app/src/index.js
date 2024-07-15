import React from 'react';
import {createRoot} from "react-dom/client";
const App = () => (
    <div>
        <h1>远程App1</h1>
    </div>
);
createRoot(document.getElementById('root')).render(<App/>)
