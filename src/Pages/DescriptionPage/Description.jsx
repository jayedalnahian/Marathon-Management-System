import React, { useEffect } from 'react';

const Description = () => {
    useEffect(() => {
        document.title = 'RUN | Description';
    }, []);
    return (
        <div>
            this is the description page
        </div>
    );
};

export default Description;