import {useNavigation} from '@react-navigation/native';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AddBtn = ({navigateTo, title, width}) => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#FFCCC8', '#666666']} // Gradient colors
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.gradientBorder}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate(navigateTo)}>
        <LinearGradient
          colors={['#F12B1C', '#B50D00', '#F12B1C']} // Gradient colors
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradientButton}>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Text style={styles.btnText}>{title}</Text>
            <Image source={require('../assets/icons/add.png')} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientButton: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  btnText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  gradientBorder: {
    borderRadius: 50,
    padding: 1,
    width: '50%',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 50,
  },
});

export default AddBtn;
