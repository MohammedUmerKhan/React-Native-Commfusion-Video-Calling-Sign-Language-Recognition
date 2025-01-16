import React, {useState} from 'react';
import {Text, View, SafeAreaView, StatusBar, FlatList} from 'react-native';
import axios from '../../constants/axiosInstance';
import instance from '../../constants/axiosInstance';
import {getUserData} from '../../helpers/asyncHelpers';
import SkeletonLoader from '../../components/skeleton/skeletonLoader';

import styles from './styles';
import COLORS from '../../constants/colors';
import {Searchbar, Snackbar, Dialog} from 'react-native-paper';
import SegmentedButtonWithSelectedCheck from '../../components/buttons/segmentedButtonWithSelectedCheck';
import AddContactItem from '../../components/contact/addContactItem';
import DialogWithLoadingIndicator from '../../components/modal/dialogWithLoadingIndicator ';

const App = ({navigation}) => {
  const [d1, setD1] = useState(false);
  const [d1Message, setD1Message] = useState('');
  const [dialogLoadingVisibility, setDialogLoadingVisibility] = useState(false);

  const hideDialog = () => setD1(false);

  const [value, setValue] = useState('');
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
        let response;
        if (value === 'email') {
          response = await axios.get('/user/search-by-email', {
            params: {
              user_id: id,
              search_email: searchQuery.searchBarMode,
            },
          });
        } else if (value === 'username') {
          response = await axios.get('/user/search-by-username', {
            params: {
              user_id: id,
              search_username: searchQuery.searchBarMode,
            },
          });
        }
        // console.log(JSON.stringify(response, null, 2));

        setContacts([response.data]);
        if (!response.data.is_friend) {
          setVisible(true);
          setMsg(
            'To add user to your contacts, simply press the Add Contact icon.',
          );
        } else {
          setVisible(true);
          setMsg('This user is already listed in your contacts.');
        }
        console.log(JSON.stringify([response.data], null, 2));
      }
    } catch (error) {
      // console.error('Error fetching data:', error.response);
      console.log(JSON.stringify(error.response.data, null, 2));
      // User not found
      setContacts([]); // Set contacts to an empty array to prevent FlatList from rendering
      setVisible(true);
      setMsg(error.response.data.detail); // Show the error message to the user
    } finally {
      setIsLoading(false); // Hide skeleton Loader
    }
  };

  const renderItem = ({item}) => (
    //for now not using account status
    <AddContactItem
      userId={userId}
      key={item.user_id}
      cId={item.user_id}
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
      isFriend={item.is_friend}
      setD1={setD1}
      setD1Message={setD1Message}
      setDialogLoadingVisibility={setDialogLoadingVisibility}
      navigation={navigation}
    />
  );

  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSearch = () => {
    if (value.trim() === '') {
      setVisible(true);
      setMsg('Please select a Filter for search');
    } else if (searchQuery.searchBarMode === '') {
      setVisible(true);
      setMsg('Please enter a query in Search ');
      console.log('Please enter a search query');
    } else {
      console.log(`Search query: ${searchQuery.searchBarMode}`);
      // Searching
      //Get data from database
      fetchData();
    }
  };
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={styles.container}>
          <View>
            <View>
              <View>
                <SegmentedButtonWithSelectedCheck
                  value={value}
                  setValue={setValue}
                  title={`Search Users by username or Email`}
                />
              </View>
              <View>
                <Searchbar
                  placeholder="Search"
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
          </View>
          <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={item => item.user_id.toString()}
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
        </View>

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
        <Dialog visible={d1} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text variant="bodyMedium">{d1Message}</Text>
          </Dialog.Content>
        </Dialog>

        <DialogWithLoadingIndicator
          visible={dialogLoadingVisibility} // Set to true to show the dialog, false to hide it
          title="Saving Contact" // Title of the dialog
          message="Saving the user to your contact list" // Message to display alongside the loading indicator
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
