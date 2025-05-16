import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import {StoreProvider} from './src/store/context';
import {useEffect, useState} from 'react';
import Spiner from './src/components/Spiner';

const App = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 4000);
  }, []);
  return (
    <NavigationContainer>
      <StoreProvider>{loader ? <StackNavigation /> : <Spiner />}</StoreProvider>
    </NavigationContainer>
  );
};

export default App;
