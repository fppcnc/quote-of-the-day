import React, { useState, useEffect } from 'react';
import QuoteDisplay from './QuoteDisplay';
import NewQuoteButton from './NewQuoteButton';
import Background from "./Background";

function Quote() {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchQuote = () => {
        setLoading(true);
        fetch('https://api.quotable.io/random')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setQuote(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    if (loading) return <div className="text-center py-8 text-lg text-blue-600">Loading...</div>;
    if (error) return <div className="text-center py-8 text-lg text-red-500">Error: {error.message}</div>;

    return (
        <Background author={quote.author}>
        <div className="p-8 bg-white bg-opacity-40 rounded-lg shadow-xl max-w-xl mx-auto">
            <QuoteDisplay quote={quote} />
            <NewQuoteButton fetchNewQuote={fetchQuote} />
        </div>
        </Background>
    );
}

export default Quote;