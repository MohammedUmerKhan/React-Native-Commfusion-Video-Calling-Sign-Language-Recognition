import React, {useState} from 'react';
import {Text, View, SafeAreaView, StatusBar, FlatList} from 'react-native';
import styles from './styles';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GroupAvatar2 from '../../components/call/groupAvatar2';
import ContactListItem from '../../components/contact/contactListItem';
import instance from '../../constants/axiosInstance';

const App = ({navigation, route}) => {
  const {userId, callMade, filteredData, profilePictures, formattedTime} =
    route.params;

  const renderItem = ({item}) => (
    <ContactListItem
      key={item.Id}
      userId={item.Id}
      fname={item.Fname}
      lname={item.Lname}
      disability_type={item.DisabilityType}
      profilePictureUri={
        item.ProfilePicture
          ? `${instance.defaults.baseURL}profile_pictures/${item.ProfilePicture}`
          : item.ProfilePicture
      }
      username={item.Username}
      userStatus={item.BioStatus}
      isOnline={item.OnlineStatus === 1}
      navigation={navigation}
    />
  );
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View
            style={{
              borderBottomWidth: 2,
              borderColor: '#dcdcdc',
              flexDirection: 'row',
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}>
            <View style={{flex: 1}}>
              <GroupAvatar2 profilePictures={profilePictures} />
            </View>
            <View style={{flex: 4, paddingLeft: 4}}>
              <View
                style={{flexDirection: 'row', alignItems: 'flex-end', flex: 1}}>
                <View>
                  <Text style={{fontSize: 23, color: 'black'}}>
                    {callMade ? 'Outgoing' : 'Incoming'}
                  </Text>
                </View>
                <View>
                  {callMade ? (
                    <Icon
                      name="phone-outgoing"
                      style={[styles.statusIndicator, {color: COLORS.outgoing}]}
                    />
                  ) : (
                    <Icon
                      name="phone-incoming"
                      style={[styles.statusIndicator, {color: COLORS.blue1}]}
                    />
                  )}
                </View>
              </View>
              <View style={{justifyContent: 'center', flex: 1}}>
                <Text style={{fontSize: 16}}>{formattedTime}</Text>
              </View>
            </View>
          </View>
          <View></View>
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={item => item.Id.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
