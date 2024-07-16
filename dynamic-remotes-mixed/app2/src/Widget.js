import React, {useEffect, useState} from 'react';
import {Button} from 'antd';

export default () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://composition.metaiot.cn/trigger/VlZCVVQwTk1UMVZF/172110046954310709', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        a: 1,
                    }),
                });
                const result = await response.json();
                setData(result.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <div>
            被调用的App2的Widget
            <br/>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <Button type="primary">App2的按钮</Button>
        </div>
    );
}
