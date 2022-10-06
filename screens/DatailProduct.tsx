import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { View, ScrollView, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Product } from '../interface/product';
import realmDb from '../realmDB/index'
export default function Bay() {
  const route = useRoute();
  const storage = new realmDb() 
  let item: Product = route.params as Product
  const navigation = useNavigation()
  
 async function addCar(item: Product){
    await storage.create(item)
    navigation.goBack()
  }
  return (
    <View style={style.conteiner} >
      <View style={style.header}>
        <BorderlessButton style={{ marginLeft: '2%' }}>
          <Icon name='chevron-left' size={30} onPress={navigation.goBack} />
        </BorderlessButton>
        <BorderlessButton style={{ marginRight: '4%' }}>
          <Icon name='heart' size={30} />
        </BorderlessButton>
      </View>
      <ScrollView style={{ marginTop: "-18%" }} horizontal pagingEnabled >
        {
          item.images?.map(image => {
            return (
              <Image
              style={{height: 200, width: 200}}
                key={image.id}
                source={{ uri: `data:image/gif;base64,${image.path}`}}
              />
            )
          })
        }
      </ScrollView>
      <View>
        <Text style={[style.title, { marginTop: "4%" }]}>{item.name[0].toUpperCase() + item.name.substring(1)}</Text>
        <Text style={[style.title, { color: '#397764' }]}>{item.price}/kg</Text>
        <Text style={[style.title, { marginHorizontal: '5%', fontSize: 17, alignSelf: 'flex-start' }]}>Detalhes</Text>
        <Text style={[style.title, { marginHorizontal: '5%', marginTop: 0, opacity: 0.5, fontSize: 17, alignSelf: 'flex-start' }]}>Nome - { item.company.name}</Text>
        <Text style={[style.title, { marginHorizontal: '5%', marginTop: 0, opacity: 0.5, fontSize: 17, alignSelf: 'flex-start' }]}>Telefone - {item.company.telephone}</Text>
        <Text style={[style.title, { marginHorizontal: '5%', marginTop: 0, opacity: 0.5, fontSize: 17, alignSelf: 'flex-start' }]}>Email - {item.company.email}</Text>
        <Text style={[style.title, { alignSelf: 'flex-start', marginHorizontal: '5%' }]}>Informações de entrega</Text>
        <Text style={[style.title, { marginHorizontal: '5%', fontSize: 17, opacity: 0.4 }]}>Entrega entre segunda-feira e quinta-feira das 20h às 21h32</Text>
      </View>
      <TouchableOpacity style={style.button} onPress={() => addCar(item)}>
        <Text style={style.text}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>
    </View>
  );
}

export const style = StyleSheet.create({
  conteiner:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:'#fff',
   paddingHorizontal: 20
  },
  header:{
   height:'10%',
   marginVertical:'5%',
   elevation:5,
   width:'100%',

   flexDirection:'row',
   alignItems:'center',
   justifyContent:'space-between'
   
  },
  text:{
      color:'white',
      fontSize:20,
      fontWeight:'bold'
  },
  title:{
      alignSelf:'center',
      fontSize:18,
      marginVertical:'2%',
      fontWeight:'bold'
  },
  button:{
   backgroundColor:'#397764',
   width:314,
   height:55,
   marginVertical:'4%',
   justifyContent:'center',
   alignItems:'center',
   alignSelf:'center',
   left:0,
   right:0,
   top:-13,
   elevation:8,
   borderRadius:30
  }
});
