import React, {useState} from 'react';
import socketContext from './socketContext';

const SocketState = props => {
  const [socket, setSocket] = useState(null);

  // ... other state and functions ...

  return (
    <socketContext.Provider value={{socket, setSocket}}>
      {props.children}
    </socketContext.Provider>
  );
};

export default SocketState;
