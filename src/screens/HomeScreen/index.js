import React, {useContext, useEffect, useState} from 'react';
import {Text, SafeAreaView, StatusBar, FlatList} from 'react-native';
import axios from '../../constants/axiosInstance';
import styles from './styles';
import COLORS from '../../constants/colors';
import {FAB} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import ContactListItem from '../../components/contact/contactListItem';
import {getUserData} from '../../helpers/asyncHelpers';
import instance from '../../constants/axiosInstance';
import SkeletonLoader from '../../components/skeleton/skeletonLoader';
import {fetchUserSettings} from '../../helpers/apiHelper';
import {connectToSocketServer} from '../../helpers/socketManager';
import userDataContext from '../../context/user/userDataContext';
import socketContext from '../../context/socket/socketContext';
const App = ({navigation}) => {
  //Context
  const {userData, setUserData} = useContext(userDataContext);
  const {socket, setSocket} = useContext(socketContext);

  //states
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true); // Show skeleton Loader
    try {
      const userData = await getUserData();
      // set user context
      setUserData(userData);
      //
      const id = userData.Id;
      setUserId(id);
      if (id) {
        const response = await axios.get(`/contacts/${id}/online-contacts`);
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
  // For Ringing incoming call
  const handleRingingIncoming = data => {
    console.log('**************');
    console.log('Ringing event received:', data);
    let {calleeId, callerData} = data;

    navigation.navigate('Incoming Call', {calleeId, callerData});
  };
  //? For user settings
  useEffect(() => {
    const fetchData = async () => {
      // Call the fetchUserSettings function
      await fetchUserSettings();
    };
    fetchData();
    socket.on('ringing', handleRingingIncoming);
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => item.user_id.toString()}
        ListEmptyComponent={
          isLoading ? (
            // <ActivityIndicator
            //   style={styles.activityIndicator}
            //   size="large"
            //   color={COLORS.blue1}
            // />
            <SkeletonLoader isLoading={isLoading} topBar={true} numItems={9} />
          ) : (
            <Text></Text>
          )
        }
      />
      <FAB.Group
        fabStyle={{backgroundColor: '#c5d9ff'}}
        open={open}
        icon={open ? 'minus' : 'plus'}
        actions={[
          {
            icon: 'cog',
            label: 'Settings',
            onPress: () => {
              navigation.navigate('Settings');
            },
          },
          {
            icon: 'account-plus',
            label: 'Add Contact',
            onPress: () => {
              navigation.navigate('Add Contact');
            },
          },
          {
            icon: 'magnify',
            label: 'Search Contact',
            onPress: () => {
              navigation.navigate('Search Contacts');
            },
          },
          {
            icon: 'video',
            label: 'Contacts',
            onPress: () => {
              navigation.navigate('Contacts');
            },
          },
        ]}
        onStateChange={({open}) => setOpen(open)}
        style={styles.fab}
      />
    </SafeAreaView>
  );
};

export default App;
