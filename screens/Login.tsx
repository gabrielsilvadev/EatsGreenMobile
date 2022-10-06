import React, { useState, useEffect } from 'react';
import { View, TextInput,  ScrollView, Text, TouchableOpacity,  StyleSheet} from 'react-native';
import ApiRequest from "../services/api";
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import { CheckBox} from 'react-native-elements';
import localStorage from "../services/storage"
import {  User } from "../interface/login"
import Icon from 'react-native-vector-icons/Feather';


export default function LoginUser() {
  const route = useRoute();
  const storage = new localStorage()
  let item = route.params

  const [check, setCheck] = useState(false)
  const navigation = useNavigation()
  const [first_name, setName] = useState('')
  const [last_name, setSobrename] = useState('')
  const [telephone, setTelephone] = useState('')
  const [cpf, setCpf] = useState('')


  const [password, setPasswordLogin] = useState('')
  const [email, setEmailLogin] = useState('')

  const [loginView, setLoginView] = useState(true)

  let user = {
  first_name,
  last_name,
  email,
  password,
  telephone,
  cpf
  }
  const login = {
    email,
    password,
   conected: check
  }

 
  const request = new ApiRequest()
  async function loginUser(login: any) {
    try {
      const result = await request.post('/user/auth', login)
      await storage.clearkey("userAuth")
      await storage.createValue(result, "userAuth")
      return  navigation.navigate('Main')
    } catch (err) {
      console.log(err)
    }
  }
  async function createUser(user: User) {
    try {
      await request.post('/user/create', user)
      setCpf('')
      setName('')
      setTelephone('')
      setSobrename('')
      setLoginView(true)
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
        <Text style={styles.Title}>Login</Text>
        <BorderlessButton style={{ marginRight: '4%' }}>
        </BorderlessButton>
      </View>
      {loginView ?
        <View style={{ width: "100%", marginVertical: '30%' }}>
          <TextInput style={styles.Input} value={email} onChangeText={text => setEmailLogin(text)} keyboardType="email-address" placeholder="Email"></TextInput>
          <TextInput style={styles.Input} value={password} onChangeText={text => setPasswordLogin(text)} secureTextEntry={true} underlineColorAndroid="transparent" placeholder="Senha"></TextInput>
          <TouchableOpacity style={styles.button} onPress={() => loginUser(login)}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')} style={{ alignSelf: 'flex-end', marginLeft: '27%' }}><Text style={{ color: '#397764', fontWeight: "400",marginRight: '2%', fontStyle: "normal" }}>Esqueceu senha ?</Text></TouchableOpacity>
        <View>
        <CheckBox
        title='Manter-me conectado'
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checkedColor='#397764'
        containerStyle={{backgroundColor: "#f5f5f5"}}
        checked={check}
        onPress={()=> setCheck(!check)}
                />
            </View>
          <TouchableOpacity style={{ marginTop: "10%", justifyContent: "center", alignSelf: "center" }}><Text style={{ color: '#397764', fontWeight: "bold", fontStyle: "normal" }} onPress={() => setLoginView(false)} >Cadastrar-se</Text></TouchableOpacity>
        </View>
        : 
        <View style={{ height: "100%", width:"100%"}}>
          <ScrollView  >
            <View style={{ height: "100%", width: "100%" }}>
              <TextInput style={styles.Input} value={email} onChangeText={text => setEmailLogin(text)} keyboardType="email-address" autoCompleteType="email" placeholder="Email"></TextInput>
              <TextInput style={styles.Input} value={first_name} onChangeText={text => setName(text)} autoCompleteType="name" placeholder="Name"></TextInput>
              <TextInput style={styles.Input} value={last_name} onChangeText={text => setSobrename(text)} autoCompleteType="name" placeholder="Sobrename"></TextInput>
              <TextInput style={styles.Input} value={telephone} onChangeText={text => setTelephone(text)} keyboardType="phone-pad" autoCompleteType="tel" placeholder="Telephone"></TextInput>
              <TextInput style={styles.Input} value={cpf} onChangeText={text => setCpf(text)} keyboardType="numeric" placeholder="Cpf"></TextInput>
              <TextInput style={styles.Input} value={password} onChangeText={text => setPasswordLogin(text)} keyboardType="default" secureTextEntry={true} underlineColorAndroid="transparent" placeholder="Senha"></TextInput>
              <TouchableOpacity style={[styles.button]} onPress={() => createUser(user)} >
                <Text style={styles.text}>Cadastrar</Text>
              </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: "center", marginBottom: "40%",alignSelf: "center" }}><Text style={{ color: '#397764', fontWeight: "bold", fontStyle: "normal" }} onPress={() => setLoginView(true)} >Login?</Text></TouchableOpacity>

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
    elevation:5,
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
