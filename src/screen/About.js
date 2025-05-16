import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../components/Layout';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const About = () => {
  const navigation = useNavigation();

  const onShare = async () => {
    try {
      await Share.share({
        message: `AviaLog is your personal flight log that saves every route, every photo “from the cockpit” and turns them into your own story in the sky.
  
  Here you earn fuel barrels for logging in, first records and achievements, spend them on three thematic quizzes: Aviation, Airplanes and Aviation History.
  
  Each entry is scored. No registrations and unnecessary movements - everything is stored in the device, from the start 
  “Start flight” to your next challenge “Today in the sky”.`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout>
      <ScrollView>
        <View style={styles.header}>
          <Image source={require('../assets/images/headPlane.png')} />
        </View>

        <View style={{marginHorizontal: 16, marginTop: 25, marginBottom: 57}}>
          <View style={styles.backBtn}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}>
              <Image source={require('../assets/icons/back.png')} />
            </TouchableOpacity>

            <Text style={styles.title}>ABOUT AVIALOG</Text>
          </View>
          <Image source={require('../assets/images/aboutPlane.png')} />
          <View>
            <Text style={styles.aboutText}>
              {`AviaLog is your personal flight log that saves every route, every photo “from the cockpit” and turns them into your own story in the sky.
  
  Here you earn fuel barrels for logging in, first records and achievements, spend them on three thematic quizzes: Aviation, Airplanes and Aviation History.
  
  Each entry is scored. No registrations and unnecessary movements - everything is stored in the device, from the start 
  “Start flight” to your next challenge “Today in the sky”.`}
            </Text>
          </View>

          <LinearGradient
            colors={['#FFCCC8', '#666666']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradientBorderBtn}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => onShare()}>
              <LinearGradient
                colors={['#F12B1C', '#B50D00', '#F12B1C']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={[styles.gradientButton, {padding: 18}]}>
                <View style={styles.shareBtnWrap}>
                  <Text style={styles.btnText}>SHARE</Text>
                  <Image
                    source={require('../assets/icons/share.png')}
                    tintColor={'#fff'}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
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
    gap: 10,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 22,
    width: '100%',
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareBtnWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  aboutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 25,
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
  },
  gradientButton: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  btnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  gradientBorderBtn: {
    borderRadius: 50,
    padding: 1,
    width: '50%',
    marginBottom: 27,
  },
});

export default About;
