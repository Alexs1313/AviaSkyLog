import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCallback} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useStore} from '../store/context';

import AddBtn from '../components/AddBtn';
import Layout from '../components/Layout';
import Card from '../components/Card';
import PopUp from '../components/PopUp';

const FlightLog = () => {
  const navigation = useNavigation();
  const {fetchFlightLog, flightLog, isVisible, earnedBarrels} = useStore();

  useFocusEffect(
    useCallback(() => {
      fetchFlightLog();
    }, []),
  );

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

            <Text style={styles.title}>Flight log</Text>
          </View>
          {flightLog.length === 0 && (
            <View>
              <View style={{width: 230, marginTop: 74, marginBottom: 20}}>
                <Text style={styles.emptyLogText}>
                  There are no entries, would you like to add one?
                </Text>
              </View>
              <AddBtn title={'ADD'} navigateTo={'CreateLog'} />
            </View>
          )}
        </View>

        <View style={{marginHorizontal: 16}}>
          {flightLog.map(log => (
            <View key={log.id}>
              <Card log={log} />
            </View>
          ))}
        </View>
        {flightLog.length !== 0 && (
          <View
            style={{marginTop: 150, marginHorizontal: 16, marginBottom: 40}}>
            <AddBtn title={'ADD NEW'} navigateTo={'CreateLog'} />
          </View>
        )}
      </ScrollView>
      {isVisible && (
        <PopUp>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: 140, gap: 10}}>
              <Text style={styles.popUpTitle}>YOU ARE THE QUIZ MASTER!</Text>
              <Text style={styles.popUpSecondary}>
                For completing three quizzes — +10 barrels of fuel.
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
    fontWeight: '900',
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
});

export default FlightLog;
