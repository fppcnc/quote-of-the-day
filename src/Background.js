import React, {useState, useEffect} from 'react';

function Background({author, children}) {
    const [backgroundImage, setBackgroundImage] = useState(null);


    useEffect(() => {
        const fetchBackgroundImage = async (authorName) => {
            const UNSPLASH_API_URL = `https://api.unsplash.com/search/photos?query=${authorName}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`;

            let data = await fetch(UNSPLASH_API_URL).then(response => response.json());

            if (data.results && data.results.length > 0) {
                return {
                    url: data.results[0].urls.regular,
                    username: data.results[0].user.username,
                    name: data.results[0].user.name
                };
            } else {
                // try fetching with "nature" if no results are found
                data = await fetch(UNSPLASH_API_URL.replace(authorName, "nature")).then(response => response.json());

                if (data.results && data.results.length > 0) {
                    return {
                        url: data.results[0].urls.regular,
                        username: data.results[0].user.username,
                        name: data.results[0].user.name
                    };
                }
            }

            return null;
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
            className="background fixed inset-0 flex items-center justify-center"
            style={backgroundImage ? {
                backgroundImage: `url(${backgroundImage.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            } : {}}
        >
            {children}
            {backgroundImage && (
                <div className="absolute bottom-2 right-2 text-white text-xs bg-gray-800 bg-opacity-60 p-1 rounded">
                    Photo by <a
                    href={`https://unsplash.com/@${backgroundImage.username}?utm_source=quote-of-the-day&utm_medium=referral`}
                    target="_blank" rel="noopener noreferrer" className="underline">{backgroundImage.name}</a> on <a
                    href="https://unsplash.com/?utm_source=quote-of-the-day&utm_medium=referral" target="_blank"
                    rel="noopener noreferrer" className="underline">Unsplash</a>
                </div>
            )}
        </div>
    );
}

export default Background;