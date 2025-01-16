import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Modal,
  Button,
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import styles from './styles';
import COLORS from '../../constants/colors';
import CustomButton from '../../components/buttons/customButton';
import SettingsTextInput from '../../components/input/settingsTextInput';
import CustomGestureUploader from '../../components/input/customGestureUploader';

const App = ({navigation}) => {
  const [description, setDescription] = useState('');
  const [counter, setCounter] = useState(0);
  const [imageStates, setImageStates] = useState({}); // State to store image URIs for each component
  const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image URI
  const [modalVisible, setModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const startUpload = () => {
    setModalVisible(true);
    simulateUpload();
  };

  const simulateUpload = () => {
    // Simulate the upload process
    let interval = setInterval(() => {
      setProgress(prevProgress => prevProgress + 0.1);
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(1);
      setTimeout(() => {
        setModalVisible(true);
        // navigation.navigate('NextScreen'); // Navigate to the next screen after 3 seconds
      }, 1000);
    }, 3000);
  };

  const handleImageChange = (index, uri) => {
    setImageStates(prevState => ({
      ...prevState,
      [index]: uri,
    }));
    // setCounter(preCounter => preCounter + 1);
    console.log('imageStates :  ' + Object.keys(imageStates).length);
    setCounter(Object.keys(imageStates).length);
  };
  const handleSelectImage = index => {
    setSelectedImage(imageStates[index]); // Set selectedImage to the URI at the given index
  };

  const uploadGesture = () => {
    // Check if description is empty
    if (description.trim() === '') {
      ToastAndroid.show('Description cannot be empty', ToastAndroid.SHORT);
      return;
    }

    // Check if imageStates length is not equal to 10
    if (Object.keys(imageStates).length !== 10) {
      ToastAndroid.show(
        'Images must be 10. Currently, you have ' +
          Object.keys(imageStates).length +
          ' images',
        ToastAndroid.SHORT,
      );
      return;
    }

    // Proceed with upload
    startUpload();
  };

  // Function to render 10 instances of CustomGestureUploader
  const renderCustomGestureUploaders = () => {
    const customGestureUploaders = [];
    for (let i = 0; i < 10; i++) {
      customGestureUploaders.push(
        <CustomGestureUploader
          key={i}
          defaultImage={require('../../assets/images/extra/capture.jpg')}
          onChange={uri => handleImageChange(i, uri)}
          number={i}
          onPress={handleSelectImage} // Pass the handleSelectImage function as onPress prop
        />,
      );
    }
    return customGestureUploaders;
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <ScrollView>
        <View style={styles.center}>
          <View>
            <Text style={{fontSize: 25, color: COLORS.blue1}}>
              Images: {counter}/10
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              For optimal recognition, we require a training set of ten images
              showcasing your custom gesture in diverse backgrounds.
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={
                selectedImage
                  ? {uri: selectedImage}
                  : require('../../assets/images/extra/magnify.jpg')
              }
              style={styles.image}
            />
          </View>
          <View style={styles.textInputContainer}>
            <SettingsTextInput
              title="Description"
              placeholder="Describe the Sign"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Render 10 instances of CustomGestureUploader */}
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.scrollViewContent}>
            {renderCustomGestureUploaders()}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <CustomButton
              onPress={uploadGesture}
              buttonBackgroundColor="#20A0F0"
              textColor="white"
              borderColor="#20A0F0"
              borderWidth={4}
              buttonText="Upload Gesture"
              buttonWidth="85%"
            />
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Images are being uploaded</Text>
                <ProgressBar progress={progress} width={200} />
                {progress === 1 && (
                  <>
                    <Text style={styles.uploadedText}>
                      Images uploaded successfully
                    </Text>
                    <Button title="OK" onPress={() => setModalVisible(false)} />
                  </>
                )}
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
