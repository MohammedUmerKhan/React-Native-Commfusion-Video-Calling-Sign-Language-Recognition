import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
  Text,
} from 'react-native';
import {Searchbar, Snackbar} from 'react-native-paper';
import styles from './styles';
import COLORS from '../../constants/colors';
import axios from '../../constants/axiosInstance';
import instance from '../../constants/axiosInstance';
import {getUserData} from '../../helpers/asyncHelpers';
import SkeletonLoader from '../../components/skeleton/skeletonLoader';
import ContactListItem from '../../components/contact/contactListItem';

const App = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState({
    searchBarMode: '',
  });
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
        const response = await axios.get('/contacts/search', {
          params: {
            user_id: id,
            search_string: searchQuery.searchBarMode,
          },
        });
        setContacts(response.data);
        console.log(JSON.stringify(response.data, null, 2));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // Hide skeleton Loader
    }
  };

  const renderItem = ({item}) => (
    //for now not using account status
    <ContactListItem
      key={item.Id}
      userId={item.Id}
      fname={item.fname}
      lname={item.lname}
      disability_type={item.DisabilityType}
      profilePictureUri={
        item.ProfilePicture
          ? `${instance.defaults.baseURL}profile_pictures/${item.ProfilePicture}`
          : item.ProfilePicture
      }
      username={item.username}
      userStatus={item.BioStatus}
      isOnline={item.OnlineStatus === 1}
      navigation={navigation}
    />
  );

  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const handleSearch = () => {
    if (searchQuery.searchBarMode === '') {
      setVisible(true);
      setMsg('Please enter a query in Search ');
      console.log('Please enter a search query');
    } else {
      console.log(`Search query: ${searchQuery.searchBarMode}`);
      // Get the Data
      fetchData();
    }
  };
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={styles.container}>
          <View>
            <Searchbar
              placeholder="Search Contact"
              onChangeText={query =>
                setSearchQuery({...searchQuery, searchBarMode: query})
              }
              value={searchQuery.searchBarMode}
              style={styles.searchbar}
              mode="bar"
              onSubmitEditing={handleSearch} // Call handleSearch when search button is pressed
            />
          </View>
        </View>
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={item => item.Id.toString()}
          ListEmptyComponent={
            isLoading ? (
              <SkeletonLoader
                isLoading={isLoading}
                topBar={false}
                numItems={1}
              />
            ) : (
              <Text></Text>
            )
          }
        />
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          action={{
            label: 'OK',
            onPress: () => {
              // Do something
              setVisible(false);
            },
          }}
          duration={Snackbar.DURATION_MEDIUM}>
          {msg}
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};

export default App;
