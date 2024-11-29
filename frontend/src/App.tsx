import { useEffect, useState } from 'react';
import { axios } from './lib/axios';

import './App.css';

const App = () => {
    const [message, setMessage] = useState('');

    const fetchTestData = async () => {
        try {
            await axios.get('/').then((res) => setMessage(res.data));
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchTestData();
    }, []);

    return <div className="text-center p-10">{message}</div>;
};

export default App;
