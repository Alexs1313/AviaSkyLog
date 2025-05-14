import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screen/Home';
import Onboard from '../screen/Onboard';
import FlightLog from '../screen/FlightLog';
import CreateLog from '../screen/CreateLog';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Onboard" component={Onboard} /> */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FlightLog" component={FlightLog} />
      <Stack.Screen name="CreateLog" component={CreateLog} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
