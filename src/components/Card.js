import {useState} from 'react';
import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LargeCard from './LargeCard';
import {useStore} from '../store/context';
import {useNavigation} from '@react-navigation/native';

const Card = ({log}) => {
  const [openMore, setOpenMore] = useState(false);
  const navigation = useNavigation();
  const {removeFlightLog} = useStore();

  const onShare = async () => {
    try {
      await Share.share({
        message: `Departure: ${log.departure} Destination: ${log.destination} Time: ${log.time} Date: ${log.date} Description : ${log.description},
`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View>
      {!openMore ? (
        <LinearGradient
          colors={['#FFCCC8', '#666666']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradientBorderBtn}>
          <View key={log.id} activeOpacity={0.7} onPress={() => imagePicker()}>
            <View style={styles.gradientButton}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 20,
                }}>
                <Image
                  source={{uri: log.image}}
                  style={{height: 97, width: '88%', borderRadius: 25}}
                />
                <View style={{gap: 13}}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => removeFlightLog(log.id)}>
                    <Image
                      source={require('../assets/icons/delete.png')}
                      tintColor={'#F12B1C'}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => onShare()}>
                    <Image
                      source={require('../assets/icons/share.png')}
                      tintColor={'#F12B1C'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('CreateLog', log)}>
                    <Image
                      source={require('../assets/icons/edit.png')}
                      tintColor={'#F12B1C'}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 55, marginTop: 22}}>
                  <View style={styles.destinationWrap}>
                    <Image source={require('../assets/icons/fill.png')} />
                    <Text style={styles.cardText}>{log.departure}</Text>
                  </View>
                  <View style={styles.destinationWrap}>
                    <Image source={require('../assets/icons/marker.png')} />
                    <Text style={styles.cardText}>{log.destination}</Text>
                  </View>
                </View>

                <View style={{gap: 30}}>
                  <View style={{flexDirection: 'row', gap: 17, marginTop: 22}}>
                    <Text style={styles.secondaryCardText}>{log.time}</Text>
                    <Text style={styles.secondaryCardText}>{log.date}</Text>
                  </View>
                  <LinearGradient
                    colors={['#FFCCC8', '#666666']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.gradientBorderMore}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setOpenMore(true)}>
                      <LinearGradient
                        colors={['#F12B1C', '#B50D00', '#F12B1C']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={styles.gradientButtonMore}>
                        <Text style={styles.btnText}>Open more</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      ) : (
        <LargeCard log={log} />
      )}
    </View>
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
    gap: 10,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 22,
    width: '100%',
    backgroundColor: '#111111',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontWeight: '500',
    color: '#fff',
  },
  emptyLogText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#484848',
  },
  gradientBorderBtn: {
    borderRadius: 25,
    padding: 1,
    width: '100%',
    marginBottom: 27,
  },
  gradientButton: {
    padding: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 24,
    backgroundColor: '#111111',
  },
  cardText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  descriptionText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#fff',
    marginBottom: 38,
  },
  secondaryCardText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#505050',
  },
  destinationWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  gradientButtonMore: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  btnText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  gradientBorderMore: {
    borderRadius: 50,
    padding: 1,
  },
});

export default Card;
