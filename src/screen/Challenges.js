import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {useStore} from '../store/context';
import Layout from '../components/Layout';

const Challenges = () => {
  const navigation = useNavigation();
  const {
    fetchFlightLog,
    flightLog,
    earnedBarrels,
    day,
    challenge,
    fetchDailyChallenge,
    setEarnedBarrels,
    challengePoints,
  } = useStore();
  const [isCompleted, setIsCompleted] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchFlightLog();
      fetchDailyChallenge();
    }, []),
  );

  useEffect(() => {
    if (flightLog.length > 0 && day === 1) {
      setIsCompleted(true), setEarnedBarrels(earnedBarrels + 2);
    } else if (flightLog.length > 0 && day === 2) {
      setIsCompleted(true), setEarnedBarrels(earnedBarrels + 2);
    } else if (challengePoints > 0 && day === 3) {
      setIsCompleted(true), setEarnedBarrels(earnedBarrels + 2);
    } else if (flightLog.length >= 2 && day === 4) {
      setIsCompleted(true), setEarnedBarrels(earnedBarrels + 2);
    } else if (challengePoints >= 3 && day === 5) {
      setIsCompleted(true), setEarnedBarrels(earnedBarrels + 2);
    }
  }, []);

  return (
    <Layout>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Image source={require('../assets/images/headPlane.png')} />
          </View>
          <View style={styles.barrelsContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.quantityText}>{earnedBarrels}</Text>
              <Image source={require('../assets/images/barrel.png')} />
            </View>
          </View>
        </View>

        <View style={{marginHorizontal: 16, marginTop: 25, marginBottom: 25}}>
          <View style={styles.backBtn}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}>
              <Image source={require('../assets/icons/back.png')} />
            </TouchableOpacity>

            <Text style={styles.title}>DAILY CHALLENGES</Text>
          </View>
          <LinearGradient
            colors={['#FFCCC8', '#666666']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradientBorderBtn}>
            <View>
              <View style={styles.gradientButton}>
                <Text style={styles.dayText}>Day:{day}</Text>
                <Image source={require('../assets/icons/underline.png')} />
                <Text style={styles.secondaryCardText}>{challenge}</Text>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 11}}>
                  <Text style={styles.rewardText}>REWARD:</Text>
                  <View style={styles.rewardContainer}>
                    <Text style={styles.rewardText}>2</Text>
                    <Image
                      source={require('../assets/images/barrel.png')}
                      style={{width: 23, height: 23}}
                    />
                  </View>
                </View>

                <View
                  style={[
                    styles.progressContainer,
                    isCompleted && {
                      backgroundColor: '#F12B1C',
                      shadowColor: '#F12B1C',
                      elevation: 30,
                    },
                  ]}>
                  {isCompleted ? (
                    <Text style={styles.progressText}>1/1</Text>
                  ) : (
                    <Text style={styles.progressText}>0/1</Text>
                  )}
                </View>
              </View>
            </View>
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
  gradientBorderBtn: {
    borderRadius: 25,
    padding: 1,
    width: '100%',
    marginBottom: 27,
  },
  gradientButton: {
    padding: 20,
    borderRadius: 24,
    backgroundColor: '#111111',
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
  quantityText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
  },
  dayText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 10,
  },
  rewardText: {
    fontSize: 16,
    fontWeight: '700',
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
  gradientBorderBtn: {
    borderRadius: 25,
    padding: 1,
    width: '100%',
    marginBottom: 27,
  },
  secondaryCardText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    marginVertical: 25,
  },
  rewardContainer: {
    width: 54,
    height: 38,
    borderWidth: 1,
    borderColor: '#F12B1C',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    marginTop: 23,
    width: '100%',
    height: 26,
    backgroundColor: '#F12B1C38',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
});

export default Challenges;
