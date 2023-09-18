import React, { useState, useEffect } from 'react';

function Background({ author, children }) {
    const [backgroundImage, setBackgroundImage] = useState(null);



    useEffect(() => {
        const fetchBackgroundImage = (authorName) => {
            const UNSPLASH_API_URL = `https://api.unsplash.com/search/photos?query=${authorName}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`;

            return fetch(UNSPLASH_API_URL)
                .then(response => response.json())
                .then(data => {
                    if (data.results && data.results.length > 0) {
                        return data.results[0].urls.regular;
                    }
                    return null;
                });
        };

        if (author) {
            fetchBackgroundImage(author).then(imageUrl => {
                console.log("Fetched Image URL:", imageUrl);
                if (imageUrl) {
                    setBackgroundImage(imageUrl);
                }
            });
        }
    }, [author]);

    return (
        <div
            className="background fixed inset-0 flex items-center justify-center"  // This will make the div cover the entire viewport
            style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
            {children}
            <div className="absolute bottom-2 right-2 text-white text-xs bg-gray-800 bg-opacity-60 p-1 rounded">
                Photos by <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline">Unsplash</a>
            </div>
        </div>
    );
}

export default Background;