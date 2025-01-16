import React, {useState, useEffect} from 'react';
import userDataContext from './userDataContext';

const UserState = props => {
  const [userData, setUserData] = useState(null);
  return (
    <userDataContext.Provider value={{userData, setUserData}}>
      {props.children}
    </userDataContext.Provider>
  );
};

export default UserState;
