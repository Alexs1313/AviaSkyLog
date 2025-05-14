import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../components/Layout';
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const Onboard = () => {
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

  return (
    <Layout>
      <View style={styles.container}>
        <View style={{width: 310}}>
          <Text style={styles.title}>Let's get to know each other?</Text>
        </View>
        <View style={{width: 230}}>
          <Text style={styles.secondaryText}>
            We do not collect user information, everything is stored only on
            your device
          </Text>
        </View>
        <View style={{marginBottom: 20}}>
          <LinearGradient
            colors={['#FFCCC8', '#666666']} // Gradient colors
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradientBorder}>
            <View style={styles.innerContainer}>
              <TextInput
                style={styles.textInput}
                value={userName}
                onChangeText={setUserName}
                placeholder="Enter text"
                placeholderTextColor="#888"
              />
            </View>
          </LinearGradient>
        </View>

        {userName !== '' && (
          <LinearGradient
            colors={['#FFCCC8', '#666666']} // Gradient colors
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradientBorderButton}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Home')}>
              <LinearGradient
                colors={['#F12B1C', '#B50D00', '#F12B1C']} // Gradient colors
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientButton}>
                <Text style={styles.btnText}>Continue</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 42,
    marginTop: 240,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 10,
  },
  secondaryText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#484848',
    marginBottom: 25,
  },
  gradientBorder: {
    height: 61,
    borderRadius: 50,
    padding: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 50,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 30,
    fontSize: 16,
    color: '#fff',
  },
  gradientButton: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: '100%',
  },
  btnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  gradientBorderButton: {
    borderRadius: 50,
    padding: 1,
    width: '50%',
  },
});

export default Onboard;
