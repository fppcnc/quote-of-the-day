import React from 'react';

function QuoteDisplay({ quote }) {
    return (
        <div>
            <p className="text-2xl font-semibold mb-6">{quote.content}</p>
            <p className="text-right text-xl text-black-600/75 mb-6">- {quote.author}</p>
        </div>
    );
}

export default QuoteDisplay;