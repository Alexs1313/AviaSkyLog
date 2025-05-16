import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import Layout from '../components/Layout';

const Welcome = () => {
  const [step, setStep] = useState(1);
  const navigation = useNavigation();

  return (
    <Layout>
      <ScrollView>
        <View style={styles.imageContainer}>
          {step === 1 && (
            <Image source={require('../assets/icons/welcome1.png')} />
          )}
          {step === 2 && (
            <Image source={require('../assets/icons/welcome2.png')} />
          )}
          {step === 3 && (
            <Image source={require('../assets/icons/welcome3.png')} />
          )}
        </View>
        <View style={{marginHorizontal: 40, alignItems: 'center'}}>
          {step === 1 && (
            <Text style={styles.text}>WELCOME TO THE HEAVEN!</Text>
          )}
          {step === 2 && <Text style={styles.text}>EARN BARRELS-LEVEL UP</Text>}
          {step === 3 && <Text style={styles.text}>OPEN AVIATION QUIZZES</Text>}

          {step === 1 && (
            <Text style={styles.title}>
              Experience the freedom of flight and start keeping your flight
              journal. Save routes, photos, and thoughts.
            </Text>
          )}
          {step === 2 && (
            <Text style={styles.title}>
              Every entry and photo in the cockpit are your barrels of fuel.
              Accumulate them and open up new opportunities.
            </Text>
          )}
          {step === 3 && (
            <Text style={styles.title}>
              You can activate the first quiz for 15 barrels, the second for 20,
              and the third for 25. Test your knowledge and take off smoothly
              into the future of aviation!
            </Text>
          )}
          <Image source={require('../assets/icons/lines.png')} />
          <LinearGradient
            colors={['#FFCCC8', '#666666']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[styles.gradientBorderBtn, {marginBottom: 30}]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (step === 3) {
                  navigation.navigate('Onboard');
                }
                setStep(step + 1);
              }}>
              <LinearGradient
                colors={['#F12B1C', '#B50D00', '#F12B1C']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientButton}>
                {step === 1 && <Text style={styles.btnText}>START FLIGHT</Text>}
                {step === 2 && <Text style={styles.btnText}>OF COURSE</Text>}
                {step === 3 && (
                  <Text style={styles.btnText}>TO THE QUIZZES</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 114,
    alignItems: 'center',
    marginBottom: 60,
  },
  text: {
    fontSize: 17,
    fontWeight: '900',
    color: '#F12B1C',
    textAlign: 'center',
    marginBottom: 14,
    textShadowColor: '#F12B1C',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#Fff',
    textAlign: 'center',
    marginBottom: 14,
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
    marginTop: 46,
  },
});

export default Welcome;
