import React from 'react';

function NewQuoteButton({ fetchNewQuote }) {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={fetchNewQuote}
        >
            New Quote
        </button>
    );
}

export default NewQuoteButton;