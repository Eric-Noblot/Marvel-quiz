import React from 'react';

const Quiz = ({userData}) => {

    console.log(userData)
    return (
        <div>
            <h2>Pseudo: {userData.pseudo}</h2>
        </div>
    );
};

export default Quiz;