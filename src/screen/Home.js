import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useEffect} from 'react';

import {useStore} from '../store/context';
import PopUp from '../components/PopUp';
import Layout from '../components/Layout';
import ButtonLinear from '../components/ButtonLinear';

const Home = () => {
  const {
    fetchDailyQuote,
    quote,
    day,
    earnedBarrels,
    isVisiblePopUp,
    handleSaveDiaryEntryHome,
    getUserName,
    userName,
  } = useStore();

  useEffect(() => {
    fetchDailyQuote();
    handleSaveDiaryEntryHome();
    getUserName();
  }, []);

  return (
    <Layout>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Image source={require('../assets/images/homePlane.png')} />
            <Text style={styles.headerText}>
              Avia <Text style={{color: '#fff'}}>Sky </Text>Log
            </Text>
          </View>
          <View style={styles.barrelsContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.quantityText}>{earnedBarrels}</Text>
              <Image source={require('../assets/images/barrel.png')} />
            </View>
          </View>
        </View>

        <View style={{marginHorizontal: 16, marginTop: 25, marginBottom: 25}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text style={styles.title}>HELLO, {userName} </Text>
            <Image source={require('../assets/icons/plane.png')} />
          </View>
          <View style={{alignItems: 'center'}}>
            <View style={styles.quoteContainer}>
              <View
                style={{flexDirection: 'row', gap: 24, alignItems: 'center'}}>
                <Text style={styles.dayText}>Day {day}</Text>
                <View style={styles.line} />
              </View>
              <Text style={styles.quoteText}>{quote}</Text>
            </View>
          </View>
        </View>

        <View style={{marginHorizontal: 60, gap: 12, marginBottom: 30}}>
          <ButtonLinear title={'Flight log'} navigateTo={'FlightLog'} />
          <ButtonLinear title={'Mini-quizzes'} navigateTo={'Quiz'} />
          <ButtonLinear title={'Daily challenges'} navigateTo={'Challenges'} />
          <ButtonLinear title={'About AviaLog'} navigateTo={'About'} />
        </View>
      </ScrollView>
      {isVisiblePopUp && (
        <PopUp>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: 140, gap: 10}}>
              <Text style={styles.popUpTitle}>WELCOME ABOARD!</Text>
              <Text style={styles.popUpSecondary}>
                For the first launch of AviaLog you received +10 barrels of
                fuel.
              </Text>
            </View>
            <View style={styles.popUpBarrel}>
              <Text style={[styles.btnText, {fontSize: 18}]}>+10</Text>
              <Image source={require('../assets/images/barrel.png')} />
            </View>
          </View>
        </PopUp>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 42,
    marginTop: 240,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 8,
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
  quoteContainer: {
    padding: 25,
    paddingRight: 40,
    paddingLeft: 20,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#F12B1C',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    gap: 24,

    shadowColor: '#F12B1C',
    elevation: 30,
  },
  dayText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  quoteText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#fff',
    width: '60%',
    lineHeight: 20,
  },
  line: {
    height: 40,
    width: 1,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  popUpBarrel: {
    width: 95,
    height: 95,
    borderRadius: 50,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  popUpTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#fff',
  },
  popUpSecondary: {
    fontSize: 10,
    fontWeight: '400',
    color: '#fff',
  },
  btnText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
});

export default Home;
