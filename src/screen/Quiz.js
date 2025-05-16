import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {useStore} from '../store/context';
import Layout from '../components/Layout';

const Quiz = () => {
  const navigation = useNavigation();
  const {fetchFlightLog, flightLog, earnedBarrels} = useStore();
  const [selectedCategory, setSelectedCategory] = useState(0);

  useFocusEffect(
    useCallback(() => {
      fetchFlightLog();
    }, []),
  );

  const categories = ['Aviation', 'Airplanes', 'History of Aviation'];

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

        <View style={{marginHorizontal: 16, marginTop: 25, marginBottom: 57}}>
          <View style={styles.backBtn}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}>
              <Image source={require('../assets/icons/back.png')} />
            </TouchableOpacity>

            <Text style={styles.title}>MINI-QUIZZES</Text>
          </View>
        </View>

        <View style={{marginHorizontal: 16, flexDirection: 'row', gap: 39}}>
          {categories.map((category, idx) => (
            <TouchableOpacity
              onPress={() => setSelectedCategory(idx)}
              key={idx}
              activeOpacity={0.7}
              style={[
                styles.categoryContainer,
                selectedCategory === idx && {borderBottomColor: '#F12B1C'},
              ]}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{marginHorizontal: 16}}>
          <View style={styles.startQuizContainer}>
            <Image source={require('../assets/images/quiz.png')} />
            <Text style={styles.categoryTitle}>
              {categories[selectedCategory].toUpperCase()}
            </Text>
            <Text
              style={[
                styles.categoryText,
                {fontSize: 12, textAlign: 'center'},
              ]}>
              This quiz will test your understanding of why a plane doesn't
              fall, how clouds affect the course, and what secret lies behind
              each air current.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 28,
              }}>
              <LinearGradient
                colors={['#FFCCC8', '#666666']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientBorderBtn}>
                <TouchableOpacity
                  disabled={earnedBarrels < 10}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Game', selectedCategory)}>
                  <LinearGradient
                    colors={['#F12B1C', '#B50D00', '#F12B1C']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.gradientButton}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                      }}>
                      <Text style={styles.btnText}>Start with +10 barrels</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
              <Image source={require('../assets/images/barrel.png')} />
            </View>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
  },
  categoryText: {fontSize: 14, fontWeight: '500', color: '#fff'},
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
  categoryTitle: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 16,
    color: '#fff',
  },
  categoryContainer: {
    borderBottomWidth: 3,
    borderBottomColor: null,
    paddingBottom: 9,
  },
  startQuizContainer: {
    marginTop: 33,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 30,
    backgroundColor: '#000000',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#F12B1C',
    marginBottom: 40,
    shadowColor: '#F12B1C',
    elevation: 10,
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

export default Quiz;
