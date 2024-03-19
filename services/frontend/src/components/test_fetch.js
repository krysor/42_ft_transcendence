import React, { useEffect } from "react";

function Test() {
    useEffect(() => {
        fetch('http://localhost:8000/test/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <h1>Home</h1>
    );
}

export default Test;