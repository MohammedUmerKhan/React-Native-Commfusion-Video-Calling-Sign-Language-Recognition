import React, {useState} from 'react';
import {Text, SafeAreaView, StatusBar, FlatList} from 'react-native';
import axios from '../../constants/axiosInstance';
import styles from './styles';
import COLORS from '../../constants/colors';
import {useFocusEffect} from '@react-navigation/native';
import ContactListItem from '../../components/contact/contactListItem';
import {getUserData} from '../../helpers/asyncHelpers';
import instance from '../../constants/axiosInstance';
import SkeletonLoader from '../../components/skeleton/skeletonLoader';
const App = ({navigation}) => {
  const [userId, setUserId] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true); // Show skeleton Loader
    try {
      const userData = await getUserData();
      const id = userData.Id;
      setUserId(id);
      if (id) {
        const response = await axios.get(`/contacts/${id}/contacts`);
        setContacts(response.data);
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
    //for now not using account status
    <ContactListItem
      key={item.user_id}
      userId={item.user_id}
      fname={item.fname}
      lname={item.lname}
      disability_type={item.disability_type}
      profilePictureUri={
        item.profile_picture
          ? `${instance.defaults.baseURL}profile_pictures/${item.profile_picture}`
          : item.profile_picture
      }
      username={item.username}
      userStatus={item.bio_status}
      isOnline={item.online_status === 1}
      navigation={navigation}
    />
  );

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => item.user_id.toString()}
        ListEmptyComponent={
          isLoading ? (
            <SkeletonLoader
              isLoading={isLoading}
              topBar={false}
              numItems={11}
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
