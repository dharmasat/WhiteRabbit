/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator,createStackNavigator } from '@react-navigation/native-stack';
import EmpDashboard from './src/app/Modules/Employes/EmpDashboard';
import EmpDashboardDetail from './src/app/Modules/Employes/EmpDashboardDetail';


const App = () => {

  return (<MainStackNavigator/>
  );
};

const Stack = createNativeStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Dashboard' component={EmpDashboard} options={{  
         headerShown: false,  
       }} />
        <Stack.Screen name='DashboardDetail' component={EmpDashboardDetail} options={{ title: 'EmpDashboardDetail' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default App;
