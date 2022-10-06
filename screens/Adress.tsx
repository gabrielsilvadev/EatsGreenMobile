import React, { useEffect, useReducer, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from "react-native";
import { ScrollView, BorderlessButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import NotFoundScreen from "./NotFoundScreen";

import Icon from "@expo/vector-icons/Feather";
import ApiRequest from "../services/api";

export default function Adress() {
  const [checked, setChecked] = useState(true);
  const [data, setData] = useState<[]>([]);
  const [user, setUser] = useState({});
  const request = new ApiRequest(user.token);
  const [createView, setCreateView]= useState(false)
  const [adress, setAdress] = useState('')
  const [cep, setCep] = useState('')
  const [complement, setComplement] = useState('')
  const [city, setCity] =useState('')
  const [states, setStates] = useState('')
  const [number, setNumber] = useState('')
  const navigation = useNavigation();
  
 
 const obj= {
  adress,
  cep,
  complement,
  city,
  number,
  states,
 }
 async function buscaCep(cep){
   let adress
   if(cep.length == 8){
    adress = await (await fetch(`https://viacep.com.br/ws/${cep}/json/`)).json()
   }
   setCep(cep)
   setCity(adress.localidade)
   setStates(adress.uf)
   setAdress(adress.logradouro)

 }

  async function createAdress(adress){
  adress?.id ? (await request.patch(`/adress/save/${adress.id}`, adress)) : (await request.post('/adress/create', adress))
  await getAdress()
  setCreateView(false)
  }

 
  useEffect(() => {
    getAdress();
  }, []);



  async function getAdress() {
    await getUser()
    let adress
    try{
    adress = await request.get("/adress/");
    }catch(err){
      if(err.status == 401) navigation.navigate('Login')
    }
    setData(adress.data)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BorderlessButton style={{ marginLeft: "2%", marginTop: "10%" }}>
          <Icon
            name="chevron-left"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </BorderlessButton>
        <Text
          style={[
            styles.title,
            { alignItems: "center", marginTop: "10%", marginRight: "4%" },
          ]}
        >
          Endereços
        </Text>
        <View
          style={{ height: "100%", marginTop: "10%", justifyContent: "center" }}
        >
         { !createView ? <TouchableOpacity
            style={{
              backgroundColor: "#397764",
              width: 30,
              height: 30,
              marginTop: "45%",
              marginRight: "9%",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              left: 0,
              right: 0,
              top: -11,
              elevation: 8,
              borderRadius: 30,
            }}
            onPress={()=> setCreateView(true)}
          >
            <Icon name="plus" size={20} color="white" />
          </TouchableOpacity>: <View/>}
        </View>
      </View>
      {data?.length && createView ? (
        <ScrollView style={{ width: "100%" }}>
          {data?.map((adress, index) => {
            return (
              <View
                key={adress.id}
                style={[styles.conteinerList, { height: 100, margin: "2%" }]}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <View style={{ margin: 12 }}>
                    <Text style={{ color: "gray", fontSize: 17 }}>
                      {adress.adress}
                    </Text>
                    <Text style={{ color: "gray" }}>{adress.city}</Text>
                    <Text style={{ color: "gray", fontWeight: "bold" }}>
                      {adress.complement}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : data.length || createView ? (
        <View style={{justifyContent: 'center', alignItems: 'center' , height: '90%'}}>
        <ScrollView>
        <TextInput style={styles.Input} value={adress} onChangeText={text => setAdress(text)}  placeholder="Endereço"></TextInput>
        <TextInput style={styles.Input} value={cep} onChangeText={text => buscaCep(text)} autoCompleteType="name" placeholder="Cep"></TextInput>
        <TextInput style={styles.Input} value={city} onChangeText={text => setCity(text)} autoCompleteType="name" placeholder="Cidade"></TextInput>
        <TextInput style={styles.Input} value={number} onChangeText={text => setNumber(text)}  autoCompleteType="cc-number" placeholder="Numero"></TextInput>
        <TextInput style={styles.Input} value={complement} onChangeText={text => setComplement(text)} autoCompleteType="name" placeholder="Complemento"></TextInput>
        <TextInput style={styles.Input} value={states} onChangeText={text => setStates(text)}  placeholder="Estado"></TextInput>
        <TouchableOpacity style={[styles.button, {marginTop: '12%'}]} onPress={() => createAdress(obj)} >
          <Text style={styles.text}>Cadastrar</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
      ):
      (
        <NotFoundScreen title="Sem Endereços!" icon="home" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    height: 90,
    backgroundColor: "white",
    width: "100%",
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  Input: {
    height: 50,
    width: 350,
    marginTop: '3%',
    alignSelf: "center",
    marginBottom: 10,
    borderWidth: 0.12,
    borderRadius: 14
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  conteinerList: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    elevation: 1,
    width: "100%",
  },
  subList: {
    flexDirection: "column",
    justifyContent: "space-between",
  },

  textAlign: {
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 10,
    marginVertical: 2,
    fontStyle: "normal",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#397764",
    width: 314,
    height: 55,
    marginVertical: "2%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    left: 0,
    right: 0,
    top: -11,
    elevation: 8,
    borderRadius: 30,
  },
  buttonCount: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "25%",
    width: "25%",
    elevation: 2,
    marginBottom: "2%",
    marginRight: "4%",
    backgroundColor: "#397764",
    alignItems: "center",
    borderRadius: 20,
    alignSelf: "flex-end",
  },
  images: {
    width: 120,
    alignSelf: "center",
    marginTop: "2%",
    height: 120,
  },
});
