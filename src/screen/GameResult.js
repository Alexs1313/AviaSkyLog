import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect} from 'react';

import Layout from '../components/Layout';
import {useStore} from '../store/context';

const GameResult = ({route}) => {
  const navigation = useNavigation();
  const selectedIdx = route.params;
  const {setEarnedBarrels, earnedBarrels} = useStore();

  useEffect(() => {
    setEarnedBarrels(earnedBarrels + 15);
  }, []);

  const onShare = async () => {
    try {
      await Share.share({
        message: `Points earned: ${selectedIdx.points} Barrels earned: ${'15'}  
  `,
      });
    } catch (error) {
      alert(error.message);
    }
  };

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

        <View style={{marginHorizontal: 16}}>
          <View style={styles.quizContainer}>
            <View>
              <Text style={styles.categoryTitle}>
                {categories[selectedIdx.secectedIdx].toUpperCase()}
              </Text>
              <Text style={styles.secondaryText}>Quiz completed!</Text>
            </View>
            <Image source={require('../assets/images/res.png')} />
          </View>
          <View
            style={{
              marginHorizontal: 48,
              marginTop: 20,
            }}>
            <View style={styles.resultContainer}>
              <View
                style={{flexDirection: 'row', gap: 50, alignItems: 'center'}}>
                <Text style={styles.btnText}>POINTS EARNED:</Text>
                <Text style={[styles.btnText, {fontSize: 24}]}>
                  {selectedIdx.points}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.btnText}>BARRELS EARNED:</Text>
                <Text style={[styles.btnText, {fontSize: 24, marginLeft: 40}]}>
                  15
                </Text>
                <Image
                  source={require('../assets/images/barrel.png')}
                  style={{}}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              gap: 12,
              marginTop: 28,
            }}>
            <LinearGradient
              colors={['#FFCCC8', '#666666']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradientBorderBtn}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('Game', selectedIdx.secectedIdx)
                }>
                <LinearGradient
                  colors={['#F12B1C', '#B50D00', '#F12B1C']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradientButton}>
                  <Text style={styles.btnText}>TRY AGAIN</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>

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

            <LinearGradient
              colors={['#FFCCC8', '#666666']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[styles.gradientBorderBtn, {marginBottom: 30}]}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Home')}>
                <LinearGradient
                  colors={['#F12B1C', '#B50D00', '#F12B1C']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradientButton}>
                  <Text style={styles.btnText}>BACK HOME</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
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
  secondaryText: {fontSize: 11, fontWeight: '500', color: '#fff'},
  barrelsContainer: {
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#F12B1C',
    paddingLeft: 28,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 6,
    color: '#fff',
  },
  quizContainer: {
    marginTop: 33,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingLeft: 30,
    backgroundColor: '#000000',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#F12B1C',
    shadowColor: '#F12B1C',
    elevation: 30,
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
  },
  resultContainer: {
    paddingVertical: 32,
    paddingLeft: 30,
    backgroundColor: '#111111',
    borderRadius: 25,
  },
  shareBtnWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});

export default GameResult;
