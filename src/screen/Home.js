import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Layout from '../components/Layout';
import ButtonLinear from '../components/ButtonLinear';

const Home = () => {
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
              <Text style={styles.quantityText}>0</Text>
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
            <Text style={styles.title}>HELLO,Ivan </Text>
            <Image source={require('../assets/icons/plane.png')} />
          </View>
          <View style={styles.quoteContainer}>
            <View style={{flexDirection: 'row', gap: 24}}>
              <Text style={styles.dayText}>Day</Text>
              <View style={styles.line} />
            </View>
            <Text style={styles.quoteText}>quote</Text>
          </View>
        </View>

        <View style={{marginHorizontal: 60, gap: 12}}>
          <ButtonLinear title={'Flight log'} navigateTo={'FlightLog'} />
          <ButtonLinear title={'Mini-quizzes'} />
          <ButtonLinear title={'Daily challenges'} />
          <ButtonLinear title={'About AviaLog'} />
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
    borderRadius: 50,
    flexDirection: 'row',
    gap: 24,

    shadowColor: '#F12B1C',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 17,
    elevation: 20,
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
  },
  line: {
    height: 40,
    width: 1,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
});

export default Home;
