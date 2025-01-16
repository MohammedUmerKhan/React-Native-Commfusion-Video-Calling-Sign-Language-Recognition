import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';
import axios from '../../constants/axiosInstance';
import {useFocusEffect} from '@react-navigation/native';
import {getUserData} from '../../helpers/asyncHelpers';
import styles from './styles';
import COLORS from '../../constants/colors';
import CallListItem from '../../components/call/callListItem';
import {groupVideoCalls} from '../../helpers/utils';
import SkeletonLoader from '../../components/skeleton/skeletonLoader';

const App = ({navigation}) => {
  const [userId, setUserId] = useState(null);
  const [rawCalls, setRawCalls] = useState([]);
  const [calls, setCalls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true); // Show skeleton Loader
    try {
      const userData = await getUserData();
      const id = userData.Id;
      setUserId(id);

      if (id) {
        const response = await axios.get(`/videocallparticipants/${id}/calls`);
        setRawCalls(response.data);
        // console.log(JSON.stringify(response.data, null, 2));
        const videoCalls = response.data;
        const organizedVideoCalls = groupVideoCalls(videoCalls);
        //sort it in descending order
        organizedVideoCalls.sort((a, b) => b.id - a.id);
        setCalls(organizedVideoCalls);
        // console.log(JSON.stringify(organizedVideoCalls, null, 2));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // Hide skeleton Loader
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  const renderItem = ({item}) => (
    //
    <CallListItem
      key={item.id}
      callDetails={item.users}
      userId={userId}
      navigation={navigation}
    />
  );

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      <Text style={styles.heading}>Recent</Text>
      <FlatList
        data={calls}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          isLoading ? (
            <SkeletonLoader
              isLoading={isLoading}
              topBar={false}
              numItems={10}
            />
          ) : (
            <Text></Text>
          )
        }
      />
    </SafeAreaView>
  );
};

export default App;
