// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen, RegisterScreen } from './Screens/AuthScreen';
import { HomeScreen } from './Screens/HomeScreen';
import { ProvideServiceScreen } from './Screens/ProvideServiceScreen';
import { RequestServiceScreen } from './Screens/RequestServiceScreen';
import { SelectServiceScreen } from './Screens/SelectServiceScreen';
import { AdminReportsScreen } from './Screens/AdminScreen';
import { AdminCategoriesScreen } from './Screens/AdminCategoriesScreen';
import { AdminDashboardScreen } from './Screens/AdminDashboardScreen';
import { AdminEditUserScreen } from './Screens/AdminEditUserScreen';
import { AdminInterchangesScreen } from './Screens/AdminInterchanges';
import { AdminUsersScreen } from './Screens/AdminUsersScreen';
import { CashOutServiceScreen } from './Screens/CashOutServiceScreen';
import { CreditsScreen } from './Screens/CreditsScreen';
import { HistoryScreen } from './Screens/HistoryScreen';
import { PayServiceScreen } from './Screens/PayServiceScreen';
import { RateServiceScreen } from './Screens/RateServiceScreen';
import { TeachServiceScreen } from './Screens/TeachServiceScreen';
import { UploadServiceScreen } from './Screens/UploadServiceScreen';
import { COLORS } from './Screens/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Barra de pestañas inferior (Bottom Tabs)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.wine,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: { height: 60, paddingBottom: 8, paddingTop: 6 },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      }}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Brindar" component={ProvideServiceScreen} />
      <Tab.Screen name="Solicitar" component={SelectServiceScreen} />
      <Tab.Screen name="Reportes" component={AdminReportsScreen} />
    </Tab.Navigator>
  );
}

// Flujo principal de la App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={MainTabs} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="AdminUsuarios" component={AdminUsersScreen} />
        <Stack.Screen name="AdminEditarUsuario" component={AdminEditUserScreen} />
        <Stack.Screen name="AdminReportes" component={AdminReportsScreen} />
        <Stack.Screen name="AdminSolicitudes" component={AdminInterchangesScreen} />
        <Stack.Screen name="AdminCategories" component={AdminCategoriesScreen} />
        <Stack.Screen name="Impartir" component={TeachServiceScreen} />
        <Stack.Screen name="SubirServicio" component={UploadServiceScreen} />
        <Stack.Screen name="Cobrar" component={CashOutServiceScreen} />
        <Stack.Screen name="Historial" component={HistoryScreen} />
        <Stack.Screen name="Calificar" component={RateServiceScreen} />
        <Stack.Screen name="SeleccionarServicio" component={SelectServiceScreen} />
        <Stack.Screen name="PedirServicio" component={RequestServiceScreen} />
        <Stack.Screen name="PagarServicio" component={PayServiceScreen} />
        <Stack.Screen name="Creditos" component={CreditsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}