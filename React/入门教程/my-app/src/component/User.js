import React from 'react';

function element() {
  const user = {
    firstName: 'Harper',
    lastName: 'Perez'
  }
  
  return getGreeting(user);
  
  function getGreeting(user) {
    if (user) {
      return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Please sign up.</h1>;
  };
  
  function formatName (user){
    return user.firstName + ' ' + user.lastName;
  };
}

export default element;