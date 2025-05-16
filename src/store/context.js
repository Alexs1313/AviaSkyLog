import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {quotes} from '../data/quotes';
import {challenges} from '../data/challenges';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({children}) => {
  const [flightLog, setFlightLog] = useState([]);
  const [quote, setQuote] = useState('');
  const [challenge, setChallenge] = useState('');
  const [day, setDay] = useState(0);
  const [earnedBarrels, setEarnedBarrels] = useState(0);
  const [diaryEntry, setDiaryEntry] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isVisiblePopUp, setIsVisiblePopUp] = useState(false);
  const [challengePoints, setChallengePoints] = useState(null);
  const [userName, setUserName] = useState(null);

  // onboard

  const saveUserName = async data => {
    try {
      await AsyncStorage.setItem('username', JSON.stringify(data));
      console.log('saved');
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getUserName = async () => {
    try {
      const savedData = await AsyncStorage.getItem('username');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setUserName(parsed.toUpperCase());
      }
    } catch (error) {
      console.log(error);
    }
  };

  // flightLog

  const saveFlightLog = async (data, editLog) => {
    try {
      const storedLog = await AsyncStorage.getItem('flightLog');
      let flightLog = storedLog !== null ? JSON.parse(storedLog) : [];

      let updatedFlightLog;

      console.log('editLog', editLog);

      if (editLog?.id) {
        updatedFlightLog = flightLog.map(log =>
          log.id === editLog.id ? data : log,
        );
      } else {
        updatedFlightLog = [...flightLog, data];
      }

      await AsyncStorage.setItem('flightLog', JSON.stringify(updatedFlightLog));
      console.log('saved');
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const fetchFlightLog = async () => {
    try {
      const savedData = await AsyncStorage.getItem('flightLog');
      const parsed = JSON.parse(savedData);
      console.log('parsed', parsed);
      if (parsed != null) {
        setFlightLog(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFlightLog = async selectedId => {
    const storedLog = await AsyncStorage.getItem('flightLog');
    let data = storedLog != null ? JSON.parse(storedLog) : [];
    const filtered = data.filter(item => item.id !== selectedId);

    setFlightLog(filtered);
    await AsyncStorage.setItem('flightLog', JSON.stringify(filtered));

    console.log('remove');
  };

  // daily quote

  const fetchDailyQuote = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const storedDate = await AsyncStorage.getItem('quoteDate');
      const storedQuote = await AsyncStorage.getItem('dailyQuote');

      if (storedDate !== today) {
        setDay(day + 1);
        if (day === 5) {
          setDay(1);
        }
      } else {
        setDay(1);
      }

      if (storedDate === today && storedQuote) {
        setQuote(storedQuote);
      } else {
        const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(newQuote);
        await AsyncStorage.setItem('quoteDate', today);
        await AsyncStorage.setItem('dailyQuote', newQuote);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  // daily challenge

  const fetchDailyChallenge = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const storedData = await AsyncStorage.getItem('Challenge');

      if (storedData) {
        const {lastDate, challengeIndex} = JSON.parse(storedData);

        if (lastDate === today) {
          setChallenge(challenges[challengeIndex]);
          return;
        }
      }

      const nextChallengeIndex = storedData
        ? (JSON.parse(storedData).challengeIndex + 1) % challenges.length
        : 0;

      setChallenge(challenges[nextChallengeIndex]);

      await AsyncStorage.setItem(
        'Challenge',
        JSON.stringify({
          lastDate: today,
          challengeIndex: nextChallengeIndex,
        }),
      );
    } catch (error) {
      console.log('e', error);
    }
  };

  // popUp

  const handleSaveDiaryEntry = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const lastEntryDate = await AsyncStorage.getItem('lastEntryDate');

      if (lastEntryDate !== today) {
        setEarnedBarrels(earnedBarrels + 20);

        await AsyncStorage.setItem('lastEntryDate', today);
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      } else {
        console.log('s');
      }
    } catch (error) {
      console.error('Error saving diary entry:', error);
    }
  };

  const handleSaveDiaryEntryHome = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const lastEntryHome = await AsyncStorage.getItem('lastEntryHome');

      if (lastEntryHome !== today) {
        setEarnedBarrels(earnedBarrels + 10);

        await AsyncStorage.setItem('lastEntryHome', today);
        setIsVisiblePopUp(true);
        setTimeout(() => {
          setIsVisiblePopUp(false);
        }, 3000);
      } else {
        console.log('s');
      }
    } catch (error) {
      console.error('Error saving diary entry:', error);
    }
  };

  const value = {
    saveFlightLog,
    fetchFlightLog,
    removeFlightLog,
    flightLog,
    fetchDailyQuote,
    day,
    quote,
    earnedBarrels,
    setEarnedBarrels,
    handleSaveDiaryEntry,
    isVisible,
    isVisiblePopUp,
    setIsVisiblePopUp,
    handleSaveDiaryEntryHome,
    fetchDailyChallenge,
    challenge,
    setChallengePoints,
    challengePoints,
    saveUserName,
    getUserName,
    userName,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
