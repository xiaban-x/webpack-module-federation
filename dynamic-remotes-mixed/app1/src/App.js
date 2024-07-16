import React, { useState, useEffect, Suspense } from 'react';
import { init, loadRemote } from '@module-federation/runtime';


const useDynamicImport = ({ module, scope }) => {
    const [component, setComponent] = useState(null);

    useEffect(() => {
        if (!module || !scope) return;

        const loadComponent = async () => {
            try {
                const { default: Component } = await loadRemote(`${scope}/${module}`);
                setComponent(() => Component);
            } catch (error) {
                console.error(`加载失败 ${scope}/${module}:`, error);
            }
        };

        loadComponent();
    }, [module, scope]);

    return component;
}

function App() {
    const [{ module, scope }, setSystem] = useState({});
    const [remotes,setRemotes] = useState([
        {
            name: 'app3',
            entry: 'http://localhost:3003/remoteEntry.js',
        },
    ]);
    useEffect(() => {
        init({
            name: 'app1',
            remotes: remotes,
        });
    }, [remotes]);
    const setApp2 = () => {
        setSystem({
            scope: 'app2',
            module: 'Widget',
        });
    };

    const setApp3 = () => {
        setSystem({
            scope: 'app3',
            module: 'Widget',
        });
    };

    const setApp3_2 = () => {
        setSystem({
            scope: 'app3',
            module: 'Other',
        });
    };
    const registerAPP2 = () => {
        setRemotes([
            {
                name: 'app2',
                entry: 'http://localhost:3002/remoteEntry.js',
            },

        ])
    }
    const Component = useDynamicImport({ module, scope });

    return (
        <div>
            <button onClick={registerAPP2}>注册APP2</button>
            <h1>宿主机</h1>
            <div>这是一个宿主机</div>
            <button onClick={setApp2}>加载App2的Widget</button>
            <button onClick={setApp3}>加载App3的Widget</button>
            <button onClick={setApp3_2}>加载App3的Other</button>
            <div style={{ marginTop: '2em' }}>
                <Suspense fallback="加载中">{Component ? <Component /> : null}</Suspense>
            </div>
        </div>
    );
}

export default App;
