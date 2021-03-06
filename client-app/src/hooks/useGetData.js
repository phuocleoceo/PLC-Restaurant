import { useState, useEffect } from 'react';

export default function useGetData(AXIOS_GET)
{
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [forceReload, setForceReload] = useState(true);

    useEffect(() =>
    {
        const getData = async () =>
        {
            const response = await AXIOS_GET();
            if (response.status === 200)
            {
                setIsLoading(false);
                setData(response.data);
            }
        };
        getData();
    }, [AXIOS_GET, forceReload]);

    const handleForceReload = () => setForceReload(!forceReload);

    return {
        isLoading,
        data,
        handleForceReload
    };
};


