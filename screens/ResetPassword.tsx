import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, Text, TouchableOpacity,  StyleSheet} from 'react-native';
import api from "../services/api"
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import  Constants  from 'expo-constants';
import Icon from 'react-native-vector-icons/Feather';

export default function ResetPassword() {
  
  const navigation = useNavigation()

  const [email, setEmailLogin] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmed, setPasswordConfirmed] = useState('')
  const [token, setToken] = useState('')
 
  const [loginView, setLoginView] = useState(true)

 
  const resetPassword = {
    password,
    token,
    email
  }

  async function sendToken(){
    await api.post('/user/forgot', {email})
    setLoginView(false)
  }

  async function savePassword(resetPassword) {
    try {
      if(resetPassword.password != resetPassword.passwordConfirmed) throw new Error('')
      await api.post('/user/resetPassword', resetPassword)
      setEmailLogin('')
      navigation.goBack()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <BorderlessButton style={{ marginLeft: '1%', marginTop: '5%' }}>
          <Icon name='chevron-left' size={30} onPress={navigation.goBack} />
        </BorderlessButton>
        <Text style={styles.Title}>Recuperar Senha</Text>
        <BorderlessButton style={{ marginRight: '4%' }}>
        </BorderlessButton>
      </View>
      {loginView ?
        <View style={{ width: "100%", marginVertical: '30%' }}>
          <TextInput style={styles.Input} value={email} onChangeText={text => setEmailLogin(text)} keyboardType="email-address" placeholder="Email"></TextInput>
          <TouchableOpacity style={styles.button} onPress={() => sendToken()}>
            <Text style={styles.text}>Enviar Token</Text>
          </TouchableOpacity>
        </View>
        : 
        <View style={{ height: "100%", width:"100%", marginVertical: '14%'}}>
          <ScrollView  >
            <View style={{ height: "100%", width: "100%" }}>
              <TextInput style={styles.Input} value={password} onChangeText={text => setPassword(text)} keyboardType="phone-pad" secureTextEntry={true} autoCompleteType="tel" placeholder="Senha"></TextInput>
              <TextInput style={styles.Input} value={passwordConfirmed} onChangeText={text => setPasswordConfirmed(text)} secureTextEntry={true} keyboardType="numeric" placeholder="Repita a Senha"></TextInput>
              <TextInput style={styles.Input} value={token} onChangeText={text => setToken(text)} keyboardType="default"  underlineColorAndroid="transparent" placeholder="Token"></TextInput>
              <TouchableOpacity style={[styles.button]} onPress={() => savePassword(resetPassword)} >
                <Text style={styles.text}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      }

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  header:{
    height:70,
    backgroundColor:'white',
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
    
   },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#397764',
    width: 200,
    height: 55,
    marginVertical: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    left: 0,
    right: 0,
    top: -13,
    elevation: 8,
    marginTop: 42,
    borderRadius: 30
  },
  Title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '3%',
    fontStyle: 'normal',
  },
  Input: {
    height: 50,
    width: '90%',
    marginTop: '3%',
    alignSelf: "center",
    marginBottom: 10,
    borderWidth: 0.12,
    borderRadius: 14
  },
  ConteinerTabs: {
    height: 210,
    elevation: 1.6,
    width: 170,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    borderRadius: 30
  },

  Tabs: {
    backgroundColor: '#FFFAFA'
  }

});
