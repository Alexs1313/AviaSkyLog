import {ImageBackground, StyleSheet} from 'react-native';

const Layout = ({children}) => {
  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={{flex: 1, backgroundColor: '#000'}}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Layout;
