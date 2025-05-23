import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import Layout from '../components/Layout';
import {useStore} from '../store/context';

const CreateLog = ({route}) => {
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [timePickerVisible, setTimePickerVisibility] = useState(false);
  const [changePhoto, setChangePhoto] = useState(false);
  const {saveFlightLog, handleSaveDiaryEntry, flightLog} = useStore();
  const editLog = route.params;
  const [state, setState] = useState({
    id: Date.now(),
    date: '',
    time: '',
    departure: '',
    destination: '',
    image: '',
    description: '',
  });

  let options = {
    storageOptions: {
      path: 'image',
      maxHeight: 700,
      maxWidth: 700,
    },
  };

  const imagePicker = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) return;

      setState(prev => ({...prev, image: response.assets[0].uri}));
      setChangePhoto(true);
    });
  };

  const hideDatePicker = () => {
    setTimePickerVisibility(false);
  };

  const hideTimePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = date => {
    setState(prev => ({
      ...prev,
      date: date.toLocaleDateString('en-GB'),
    }));
    hideDatePicker();
  };

  const handleConfirmTime = time => {
    setState(prev => ({
      ...prev,
      time: time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    }));
    hideTimePicker();
  };

  const handleSaveLog = () => {
    saveFlightLog(state, editLog);

    setTimeout(() => {
      navigation.goBack();
      if (flightLog.length === 0) {
        handleSaveDiaryEntry();
      }
    }, 500);
  };

  const {date, time, departure, destination, description, image} = state;

  const isDisabled =
    !date || !time || !departure || !destination || !description || !image;

  return (
    <Layout>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.backBtn}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}>
              <Image source={require('../assets/icons/back.png')} />
            </TouchableOpacity>

            <Text style={styles.title}>
              {editLog ? 'EDIT' : 'CREATE FLIGHT LOG'}
            </Text>
          </View>
        </View>

        <View style={styles.mainWrap}>
          <Text style={styles.sectionTitle}>DATE/TIME:</Text>
          <View style={styles.timeWrap}>
            <LinearGradient
              colors={['#FFCCC8', '#666666']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradientBorder}>
              <View style={styles.innerContainer}>
                <TextInput
                  style={[styles.textInput, {paddingRight: 40}]}
                  value={editLog ? editLog.date : state.date}
                  placeholder="DD.MM.YY"
                  placeholderTextColor="#fff"
                  onFocus={() => setDatePickerVisibility(true)}
                />
              </View>
              <Image
                source={require('../assets/icons/date.png')}
                style={styles.inputIcon}
              />
            </LinearGradient>

            <LinearGradient
              colors={['#FFCCC8', '#666666']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradientBorder}>
              <View style={styles.innerContainer}>
                <TextInput
                  style={styles.textInput}
                  value={editLog ? editLog.time : state.time}
                  placeholder="00:00"
                  placeholderTextColor="#fff"
                  onFocus={() => setTimePickerVisibility(true)}
                />
              </View>
              <Image
                source={require('../assets/icons/time.png')}
                style={styles.inputIcon}
              />
            </LinearGradient>
          </View>
          <Text style={styles.sectionTitle}>ROUTE:</Text>
          <View style={{gap: 37, marginHorizontal: 55}}>
            <View style={styles.sectionWrap}>
              {!departure ? (
                <Image source={require('../assets/icons/circle.png')} />
              ) : (
                <Image source={require('../assets/icons/fill.png')} />
              )}
              <LinearGradient
                colors={['#FFCCC8', '#666666']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={[styles.gradientBorder, {width: '100%'}]}>
                <View style={styles.innerContainer}>
                  <TextInput
                    style={[
                      styles.textInput,
                      {paddingLeft: 20, paddingRight: 20},
                    ]}
                    value={editLog ? editLog.departure : state.departure}
                    placeholder="Departure point"
                    placeholderTextColor="#484848"
                    onChangeText={value =>
                      setState(prev => ({...prev, departure: value}))
                    }
                  />
                </View>
              </LinearGradient>
              <View style={styles.markerContainer}>
                <Image source={require('../assets/icons/marker.png')} />
              </View>
            </View>
            <Image
              source={require('../assets/icons/line.png')}
              style={{position: 'absolute', left: -36, top: 56}}
            />
            <View style={styles.sectionWrap}>
              <Image source={require('../assets/icons/marker.png')} />
              <LinearGradient
                colors={['#FFCCC8', '#666666']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={[styles.gradientBorder, {width: '100%'}]}>
                <View style={styles.innerContainer}>
                  <TextInput
                    style={[
                      styles.textInput,
                      {paddingLeft: 20, paddingRight: 20},
                    ]}
                    value={editLog ? editLog.destination : state.destination}
                    placeholder="Destination"
                    placeholderTextColor="#484848"
                    onChangeText={value =>
                      setState(prev => ({...prev, destination: value}))
                    }
                  />
                </View>
              </LinearGradient>
              <View style={styles.markerContainer}>
                <Image source={require('../assets/icons/marker.png')} />
              </View>
            </View>

            <Text style={styles.sectionTitle}>PHOTO:</Text>
          </View>
          <View>
            {changePhoto ? (
              <LinearGradient
                colors={['#FFCCC8', '#666666']} // Gradient colors
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientBorderBtn}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => imagePicker()}>
                  <Image
                    source={{uri: state.image}}
                    style={{width: '100%', height: 113, borderRadius: 25}}
                  />
                </TouchableOpacity>
              </LinearGradient>
            ) : (
              <LinearGradient
                colors={['#FFCCC8', '#666666']} // Gradient colors
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientBorderBtn}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => imagePicker()}>
                  <LinearGradient
                    colors={['#111111', '#111111']} // Gradient colors
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.gradientButton}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                      }}>
                      <Text style={styles.btnText}>Add</Text>
                      <Image
                        source={require('../assets/icons/add.png')}
                        tintColor={'#F12B1C'}
                      />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            )}
          </View>
          <Text style={styles.sectionTitle}>DESCRIPTION:</Text>
          <LinearGradient
            colors={['#FFCCC8', '#666666']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[styles.gradientBorder, {width: '100%', height: 78}]}>
            <View style={styles.innerContainer}>
              <TextInput
                style={[
                  styles.textInput,
                  {paddingLeft: 30, paddingRight: 20, paddingTop: 18},
                ]}
                value={editLog ? editLog.description : state.description}
                textAlignVertical="top"
                placeholder="Write your impressions of the flight"
                placeholderTextColor="#484848"
                onChangeText={value =>
                  setState(prev => ({...prev, description: value}))
                }
              />
            </View>
          </LinearGradient>
        </View>
        <View style={{alignItems: 'center', marginBottom: 30}}>
          <LinearGradient
            colors={['#FFCCC8', '#666666']} // Gradient colors
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradientBorderSave}>
            <TouchableOpacity
              disabled={isDisabled}
              activeOpacity={0.7}
              onPress={() => handleSaveLog()}>
              <LinearGradient
                colors={['#F12B1C', '#B50D00', '#F12B1C']} // Gradient colors
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientButtonSave}>
                <Text style={styles.btnTextSave}>Save</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          display="calendar"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
        <DateTimePickerModal
          isVisible={timePickerVisible}
          mode="time"
          display="spinner"
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}
          is24Hour={true}
        />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 42,
    marginTop: 240,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 15,
  },
  header: {
    paddingTop: 74,
    paddingHorizontal: 22,
    width: '100%',
    backgroundColor: '#111111',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainWrap: {marginHorizontal: 16, marginTop: 25, marginBottom: 25},
  sectionWrap: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  headerText: {
    fontFamily: 'InknutAntiqua-ExtraBold',
    fontSize: 20,
    color: '#F12B1C',
  },
  quantityText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
  },
  barrelsContainer: {
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#F12B1C',
    paddingLeft: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 15,
  },
  emptyLogText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#484848',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 50,
  },
  textInput: {
    flex: 1,
    paddingLeft: 60,
    paddingRight: 70,
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  gradientBorder: {
    height: 61,
    borderRadius: 50,
    padding: 1,
    width: '48%',
  },
  markerContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
  },
  inputIcon: {position: 'absolute', top: 18, left: 18},
  gradientButton: {
    paddingVertical: 47,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  btnText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#F12B1C',
  },
  gradientBorderBtn: {
    borderRadius: 25,
    padding: 1,
    width: '100%',
    marginBottom: 27,
  },
  gradientButtonSave: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  btnTextSave: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  gradientBorderSave: {
    borderRadius: 50,
    padding: 1,
    width: '50%',
  },
});

export default CreateLog;
