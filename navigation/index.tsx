/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CarShopping from '../screens/Car-shopping';
import ResetPassword from '../screens/ResetPassword'
import NotFoundScreen from '../screens/NotFoundScreen';
import Main from '../screens/Main';
import Order from '../screens/Order';
import Adress from '../screens/Adress';
import DetailOrder from '../screens/DetailOrder';
import User from '../screens/User';
import Login from "../screens/Login"
import DetailProduct from "../screens/DatailProduct"
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
      <Stack.Screen name="Adress" component={Adress} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="CarShopping" component={CarShopping} options={{headerShown: false,title: 'Carrinho'}} />
      <Stack.Screen name="DetailProduct" component={DetailProduct} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={Login} options={{
       headerShown: false
      }} />
      <Stack.Screen name="DetailOrder" component={DetailOrder} options={{
        headerLeft: () => (<Feather
          name="chevron-left"
          size={30}
          style={{ marginRight: 15 }}
        />)
      }} />

    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabMain"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabMain"
        component={Main}
        options={({ navigation }: RootTabScreenProps<'TabMain'>) => ({
          headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
        })}
      />
      <BottomTab.Screen
        name="TabOrder"
        component={Order}
        options={{
          title: '',
          headerTitle: 'Pedidos',
          headerStyle: {  elevation:5},
          tabBarActiveTintColor: '#397764',
          tabBarIcon: ({ color }) => <TabBarIcon name="bookmark" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabUser"
        component={User}
        options={{
          title: '',
          headerTitle: 'Perfil',
          tabBarActiveTintColor: '#397764',
          headerStyle: {   elevation:5 },
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}

      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={30} style={{ marginBottom: -3 }} {...props} />;
}
