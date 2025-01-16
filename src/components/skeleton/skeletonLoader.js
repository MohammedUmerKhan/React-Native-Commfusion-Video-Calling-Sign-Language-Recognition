import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonLoader = ({isLoading, topBar, numItems}) => {
  // Function to render a single contact item
  const renderContactItem = () => (
    <View style={styles.contactItem}>
      <View style={styles.contactAvatar} />
      <View style={styles.contactDetails}>
        <View style={styles.textSkeleton2} />
        <View style={styles.textSkeleton2} />
      </View>
      <View style={styles.videoIconSkeleton} />
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <SkeletonPlaceholder>
          {topBar && (
            <View style={styles.navBar}>
              <View style={styles.navItem}>
                <View style={styles.icon} />
                <View style={styles.textSkeleton} />
              </View>
              <View style={styles.navItem}>
                <View style={styles.icon} />
                <View style={styles.textSkeleton} />
              </View>
              <View style={styles.navItem}>
                <View style={styles.icon} />
                <View style={styles.textSkeleton} />
              </View>
            </View>
          )}
          {/* Render the specified number of contact items */}
          {Array.from({length: numItems}).map((_, index) => (
            <React.Fragment key={index}>{renderContactItem()}</React.Fragment>
          ))}
        </SkeletonPlaceholder>
      ) : (
        // Actual content after loading
        <View>{/* Your actual content goes here */}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#CCCCCC',
    marginBottom: 5,
  },
  textSkeleton: {
    width: 50,
    height: 10,
    backgroundColor: '#CCCCCC',
    marginTop: 5,
  },
  textSkeleton2: {
    width: 250,
    height: 10,
    backgroundColor: '#CCCCCC',
    marginTop: 5,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    width: '100%',
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#CCCCCC',
    marginRight: 10,
  },
  contactDetails: {
    flex: 1,
  },
  videoIconSkeleton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#CCCCCC',
  },
});

export default SkeletonLoader;
