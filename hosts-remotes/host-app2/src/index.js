import React, {Suspense} from 'react';
import {createRoot} from "react-dom/client";

const RemoteC1 = React.lazy(() => import('remoteApp/Component'));
const RemoteC2 = React.lazy(() => import('remoteApp2/Component'));
const config = {name: "小明", content: "你好"}
const App = () => (
    <div>
        <h1>Host Application</h1>
        <Suspense fallback={<div>Loading...</div>}>
            <RemoteC1 {...config}/>
            <RemoteC2 {...config}/>
        </Suspense>
    </div>
);
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<App/>)
