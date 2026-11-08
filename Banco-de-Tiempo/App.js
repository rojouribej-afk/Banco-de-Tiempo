// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
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


// Flujo principal de la App
export default function App() {
    const[screen, setScreen] = useState('Welcome');


    switch(screen) {
      case 'Welcome': 
        return (<ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.titulo}>Banco de Tiempo y Talento</Text>
          <Text style={styles.seccion}>Cuenta y servicios</Text>
          <View style={styles.boton}><Button title="Login" onPress={() => setScreen('Login')} /></View>
          <View style={styles.boton}><Button title="Crear cuenta" onPress={() => setScreen('Register')} /></View>
          <View style={styles.boton}><Button title="Usuarios" onPress={() => setScreen('Home')} /></View>
          <View style={styles.boton}><Button title="Brindar Servicio" onPress={() => setScreen('ProvideService')} /></View>
          <View style={styles.boton}><Button title="Pedir Servicio" onPress={() => setScreen('RequestService')} /></View>
          <View style={styles.boton}><Button title="Seleccionar Servicio" onPress={() => setScreen('SelectService')} /></View>
          <View style={styles.boton}><Button title="Pagar Servicio" onPress={() => setScreen('PayService')} /></View>
          <View style={styles.boton}><Button title="Calificar Servicio" onPress={() => setScreen('RateService')} /></View>
          <View style={styles.boton}><Button title="Enseñar Servicio" onPress={() => setScreen('TeachService')} /></View>
          <View style={styles.boton}><Button title="Subir Servicio" onPress={() => setScreen('UploadService')} /></View>
          <View style={styles.boton}><Button title="Retirar Servicio" onPress={() => setScreen('CashOutService')} /></View>
          <View style={styles.boton}><Button title="Créditos" onPress={() => setScreen('Credits')} /></View>
          <View style={styles.boton}><Button title="Historial" onPress={() => setScreen('History')} /></View>

          <Text style={styles.seccion}>Administración</Text>
          <View style={styles.boton}><Button title="Panel de administración" onPress={() => setScreen('AdminDashboard')} /></View>
          <View style={styles.boton}><Button title="Reportes" onPress={() => setScreen('AdminReports')} /></View>
          <View style={styles.boton}><Button title="Categorías" onPress={() => setScreen('AdminCategories')} /></View>
          <View style={styles.boton}><Button title="Editar usuario" onPress={() => setScreen('AdminEditUser')} /></View>
          <View style={styles.boton}><Button title="Intercambios" onPress={() => setScreen('AdminInterchanges')} /></View>
          <View style={styles.boton}><Button title="Administrar usuarios" onPress={() => setScreen('AdminUsers')} /></View>
        </ScrollView>

      );
      case 'Login':
        return <LoginScreen setScreen={setScreen} />;
      case 'Register':
        return <RegisterScreen setScreen={setScreen} />;
      case 'Home':
        return <HomeScreen setScreen={setScreen} />;
      case 'ProvideService':
        return <ProvideServiceScreen setScreen={setScreen} />;
      case 'RequestService':
        return <RequestServiceScreen setScreen={setScreen} />;
      case 'SelectService':
        return <SelectServiceScreen setScreen={setScreen} />;
      case 'AdminReports':
        return <AdminReportsScreen setScreen={setScreen} />;
      case 'AdminCategories':
        return <AdminCategoriesScreen setScreen={setScreen} />;
      case 'AdminDashboard':
        return <AdminDashboardScreen setScreen={setScreen} />;
      case 'AdminEditUser':
        return <AdminEditUserScreen setScreen={setScreen} />;
      case 'AdminInterchanges':
        return <AdminInterchangesScreen setScreen={setScreen} />;
      case 'AdminUsers':
        return <AdminUsersScreen setScreen={setScreen} />;
      case 'CashOutService':
        return <CashOutServiceScreen setScreen={setScreen} />;
      case 'Credits':
        return <CreditsScreen setScreen={setScreen} />;
      case 'History':
        return <HistoryScreen setScreen={setScreen} />;
      case 'PayService':
        return <PayServiceScreen setScreen={setScreen} />;
      case 'RateService':
        return <RateServiceScreen setScreen={setScreen} />;
      case 'TeachService':
        return <TeachServiceScreen setScreen={setScreen} />;
      case 'UploadService':
        return <UploadServiceScreen setScreen={setScreen} />;
      default:
        return <LoginScreen setScreen={setScreen} />;
    }

}


const styles = StyleSheet.create({
    container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 30,
    textAlign: 'center',
  },
  seccion: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  boton: {
    marginBottom: 8,
  }

});