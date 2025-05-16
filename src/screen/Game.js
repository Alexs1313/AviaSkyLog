import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../components/Layout';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {useStore} from '../store/context';
import {quiz} from '../data/quiz';

const Game = ({route}) => {
  const navigation = useNavigation();
  const {fetchFlightLog, flightLog, setChallengePoints} = useStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [points, setPoints] = useState(0);
  const secectedIdx = route.params;

  const filteredByCategory = quiz.filter(item => {
    if (secectedIdx === 0) {
      return item.category === 'Aviation';
    } else if (secectedIdx === 1) {
      return item.category === 'Airplanes';
    } else if (secectedIdx === 2) {
      return item.category === 'History of Aviation';
    }
  });

  useFocusEffect(
    useCallback(() => {
      fetchFlightLog();
    }, []),
  );

  const categories = ['Aviation', 'Airplanes', 'History of Aviation'];

  const handleOptionPress = pressedOption => {
    const isCorrectAnswer =
      filteredByCategory[currentQuestion].answer == pressedOption;
    if (isCorrectAnswer) {
      setPoints(points + 1);
      setChallengePoints(points);
    }
    if (currentQuestion === filteredByCategory.length - 1) {
      setTimeout(() => {
        navigation.navigate('GameResult', {secectedIdx, points});
      }, 1000);
    } else {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      }, 1000);
    }

    setSelectedOption(pressedOption);
    setIsCorrect(isCorrectAnswer);
  };

  return (
    <Layout>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Image source={require('../assets/images/headPlane.png')} />
          </View>
        </View>

        <View style={{marginVertical: 30}}>
          <Text style={styles.title}>
            {categories[secectedIdx].toUpperCase()}
          </Text>
        </View>

        <View style={{marginHorizontal: 16}}>
          <View style={styles.startQuizContainer}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.categoryTitle}>QUESTION</Text>
              <Image source={require('../assets/icons/lines.png')} />
              <Text style={styles.question}>
                {filteredByCategory[currentQuestion].question}
              </Text>
            </View>
            {filteredByCategory[currentQuestion].options.map(option => (
              <TouchableOpacity
                onPress={() => handleOptionPress(option)}
                activeOpacity={0.7}
                key={option}
                style={styles.optionContainer}>
                <LinearGradient
                  colors={
                    selectedOption === option
                      ? isCorrect
                        ? ['#0DFF00', '#0DFF00']
                        : ['#F12B1C', '#F12B1C']
                      : ['#FFCCC8', '#666666']
                  }
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradientBorderBtn}>
                  <View activeOpacity={0.7} onPress={() => imagePicker()}>
                    <View style={styles.gradientButton}>
                      <Text
                        style={[
                          styles.optionText,
                          isCorrect && {fontWeight: '900'},
                        ]}>
                        {option}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'InknutAntiqua-ExtraBold',
    fontSize: 20,
    color: '#F12B1C',
  },
  question: {
    fontWeight: '500',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 35,
  },
  categoryText: {fontSize: 14, fontWeight: '500', color: '#fff'},
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
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
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 30,
    backgroundColor: '#000000',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#F12B1C',
    marginBottom: 30,
    shadowColor: '#F12B1C',
    elevation: 15,
  },
  btnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  gradientBorderBtn: {
    borderRadius: 25,
    padding: 1,
    width: '100%',
    marginBottom: 10,
  },
  gradientButton: {
    padding: 20,
    borderRadius: 24,
    backgroundColor: '#111111',
  },
});

export default Game;
