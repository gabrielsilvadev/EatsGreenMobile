import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import storageBank from '../services/storage';
import {validationUser} from "../utils/validationToken"

export default function TabTwoScreen(){
   const bankStorage = new storageBank() 
   const [user, setUser] = useState([])
   useEffect(()=>{
     bankStorage.getData('userAuth').then(item =>{
       setUser(item)
       auth()
     })
   })
  async function auth(){
   const result = await validationUser(user.token)
    if(result.code == 401) navigationLogin()
  }  
  const navigation = useNavigation()
  function navigationLogin(){
    navigation.navigate("Login")
  }
  return (
    <View style={styles.container}>
     { user ?  <TouchableOpacity  style={{ alignSelf: 'flex-end', marginLeft: '35%' }}><Text style={{ color: '#397764', marginRight: 50, fontWeight: "bold", marginVertical: 4 }}>Alterar Dados</Text></TouchableOpacity> : <View/>}
   { user ? 
   
   <View style={styles.conteinerThree}>
      <Image source={{uri: "https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur-vert.png"}} style={styles.image} />
      <View style={{ alignItems: "center", paddingVertical: 20, width: "70%" }}>
        <Text style={{ fontSize: 18, fontStyle: "normal",borderBottomWidth: 1,  opacity: 0.5 }}></Text>
        <Text style={{ fontSize: 17, fontStyle: "normal",borderBottomWidth: 1, opacity: 0.5 }}></Text>
        <Text style={{ fontSize: 17, fontStyle: "normal",borderBottomWidth: 1, opacity: 0.5 }}></Text>
      </View>
    </View>
    :
    <View style={[styles.conteinerThree, {justifyContent: "center", flexDirection: "column"}]}>
      <Text style={styles.textAlign}>Bem-vindo :)</Text>
      <TouchableOpacity  style={[styles.button, {marginLeft: "2%",marginTop: "2%", width: "55%"}]} onPress={() => navigationLogin()}>
        <Text style={styles.text}>Entrar ou cadastrar-se</Text>
    </TouchableOpacity>
      </View>
    
    
}

    <View style={styles.conteinerList}>
      <Text style={styles.textAlign}>Pedidos</Text>
      <BorderlessButton style={{ alignSelf: "center", marginRight: 10 }} onPress={navigation.goBack} ><Icon name='chevron-right' size={30} /></BorderlessButton>
    </View>
    <View style={styles.conteinerList}>
      <Text style={styles.textAlign}>Endereços</Text>
      <TouchableOpacity onPress={()=> navigation.navigate('Adress')} style={{ alignSelf: "center", marginRight: 10 }}  ><Icon name='chevron-right' size={30} /></TouchableOpacity>
    </View>
    <View style={styles.conteinerList}>
      <Text style={styles.textAlign}>Faq</Text>
      <BorderlessButton style={{ alignSelf: "center", marginRight: 10 }} onPress={navigation.goBack} ><Icon name='chevron-right' size={30} /></BorderlessButton>
    </View>

    <View style={styles.conteinerList}>
      <Text style={styles.textAlign}>Ajuda</Text>
      <BorderlessButton style={{ alignSelf: "center", marginRight: 10 }} onPress={navigation.goBack} ><Icon name='chevron-right' size={30} /></BorderlessButton>
    </View>
    <TouchableOpacity onPress={()=> exitUser()} style={{ alignSelf: "center", marginTop: 10, marginLeft: 20, elevation: 2 }}><Text style={{ color: "red", fontSize: 18 }}>Exit</Text></TouchableOpacity>

  </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text:{
    color:'white',
    fontSize: 15,
    fontWeight:'bold'
},
  conteinerTwo: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    height: 90,
    width: '100%'
  },
  image: {
    height: 80,
    width: 80,
    alignSelf: 'flex-start',
    flexDirection: "column",
    marginLeft: 3,
    borderRadius: 10,
   
  },
  conteinerThree: {
    alignSelf: 'center',
    borderRadius: 20,
    height: '25%',
    elevation: 1,
    width: '95%',
    flexDirection: 'row',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: 'space-between'
  },
  conteinerList:{
    borderRadius: 20,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    elevation: 1,
    width: "95%",
    height: "10%"
  },

  textAlign: {
    fontSize: 18,
    alignSelf: "center",
    marginLeft: 10,
    fontWeight: "600",
    fontStyle: "normal"
  },
   button:{
    backgroundColor:'#397764',
    width:100,
    height:40,
    flexDirection: "column",
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    left:0,
    right:0,
    elevation:8,
    borderRadius:30
   },

  });
