import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ButtonLinear = ({navigateTo, title, width}) => {
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
          <Text style={styles.btnText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientButton: {
    paddingVertical: 29,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: '100%',
  },
  btnText: {
    fontSize: 19,
    fontWeight: '900',
    color: '#fff',
  },
  gradientBorder: {
    borderRadius: 50,
    padding: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 50,
  },
});

export default ButtonLinear;
