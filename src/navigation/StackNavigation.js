import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screen/Home';
import Onboard from '../screen/Onboard';
import FlightLog from '../screen/FlightLog';
import CreateLog from '../screen/CreateLog';
import Quiz from '../screen/Quiz';
import Game from '../screen/Game';
import GameResult from '../screen/GameResult';
import About from '../screen/About';
import Challenges from '../screen/Challenges';
import Welcome from '../screen/Welcome';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FlightLog" component={FlightLog} />
      <Stack.Screen name="CreateLog" component={CreateLog} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="GameResult" component={GameResult} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Challenges" component={Challenges} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
