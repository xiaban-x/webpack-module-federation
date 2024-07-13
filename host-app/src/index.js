import React,{Suspense} from 'react';
import {createRoot} from "react-dom/client";
const RemoteC = React.lazy(()=> import('remoteApp/Component'));
const config = {name:"小明",content:"你好"}
const App = () => (
    <div>
        <h1>Host Application</h1>

        <button onClick={()=>{
           let script= document.createElement('script');
           script.src='';
           script.onload=()=>{};
            document.head.appendChild(script);

        }}/>
        <Suspense fallback={<div>Loading...</div>}>
            <RemoteC {...config}/>
        </Suspense>
    </div>
);
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(    <App />)
