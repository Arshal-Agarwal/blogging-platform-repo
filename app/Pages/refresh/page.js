import { useState, useEffect } from 'react';

export default function RefreshTokenPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get the access token from localStorage
                let accessToken = localStorage.getItem('accessToken');

                // Make the initial authenticated request
                const response = await fetch('/api/protected', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 401) {
                    // If access token has expired, try refreshing it
                    const newAccessToken = await refreshAccessToken();

                    if (newAccessToken) {
                        accessToken = newAccessToken;
                        // Retry the protected request with the new access token
                        const retryResponse = await fetch('/api/protected', {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${accessToken}`,
                            },
                        });
                        const retryData = await retryResponse.json();
                        setData(retryData);
                    } else {
                        setError('Failed to refresh token. Please log in again.');
                    }
                } else {
                    const result = await response.json();
                    setData(result);
                }
            } catch (err) {
                setError('Error fetching data.');
            }
        };

        fetchData();
    }, []);

    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');

        const res = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        const data = await res.json();

        if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
            return data.accessToken;
        }

        return null;
    };

    return (
        <div>
            <h1>Protected Data Page</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
        </div>
    );
}
