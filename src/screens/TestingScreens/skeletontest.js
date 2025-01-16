import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
// import SkeletonLoader from './skeletonLoader';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return <SkeletonLoader isLoading={isLoading} topBar={true} />;
};

export default App;
