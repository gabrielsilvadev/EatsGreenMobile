import React, {useEffect, useState} from 'react';
import { StyleSheet , FlatList} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import moment from 'moment';
import { Order } from "../interface/order"
import api from "../services/api"
import { getData} from "../services/storage"
export default function TabTwoScreen() {
  useEffect(()=>{
  loginUser()
  },[])
  const [ order , setOrder] =useState<Order[]>([])
  console.log(order)
  async function loginUser() {
    try {
      const authUser = await getData("authUser")
      let { data } = await api.get(`/user/order/${authUser[0].user.id}`,{headers:{ Authorization: `Bearer ${authUser[0].token}` }})
      setOrder(data)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <View style={styles.container}>
    <FlatList
      data={order}
      style={{width: "100%"}}
      keyExtractor={ item => item.id}
      renderItem={({ item }) => (
      <View style={styles.conteinerList}>
        <View style={styles.subList}>
        <Text style={[styles.textAlign, {color: "green", fontWeight: "bold"}]}>{item.orderStatus.toUpperCase()}</Text>
        <Text style={[styles.textAlign, {color: "gray"}]}>{moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</Text>
        <Text style={styles.textAlign}>{item.id.slice(0, 8)}</Text>
        <Text style={styles.textAlign}>Sacolao Crato</Text>
        </View>
        <BorderlessButton style={{ alignSelf: "center", marginRight: 10 }} ><Icon name='chevron-right' size={30} /></BorderlessButton>
      </View>
      )}
    />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F0EF'
  },
  heard: {
    padding: 15,
    paddingTop: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
    alignItems: 'center',
  },
  subList:{
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 10
  },
  textAlign: {
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 10,
    marginVertical: 2,
    fontStyle: "normal"
  },
  conteinerList: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor:'#fff',
    width: "90%",
    alignSelf: "center",
    marginTop: "8%",
    height: 120
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
});
