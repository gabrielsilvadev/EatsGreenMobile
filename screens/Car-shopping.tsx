
import React, {useEffect, useState} from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CheckBox} from 'react-native-elements';
import { ScrollView, BorderlessButton} from 'react-native-gesture-handler';
import {Product} from "../interface/product"
import localStorage from "../services/storage"
import { useNavigation } from '@react-navigation/native';
import NotFoundScreen from './NotFoundScreen'
import Icon from "@expo/vector-icons/Feather"
export default function CarScreen() {
    const storage = new localStorage()
    const [checked, setChecked] = useState(true)
    const [data, setData] = useState<Product[]>([])
    const navigation = useNavigation()
    useEffect(()=>{
      getProducts()
     }, [])
   
     async function getProducts(){
      let car = await storage.getData("CarShop")
      console.log(car)
      setData(JSON.parse(car))
     }
     async function deleteProduct(index) {
       setData(data.splice(index, 1))
       await storage.clear('CarShop', data)
       await  getProducts()
     }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BorderlessButton style={{ marginLeft: '2%', marginTop: '5%' }}>
          <Icon name='chevron-left' size={30} onPress={() => navigation.goBack()} />
        </BorderlessButton>
        <Text style={[styles.title,{alignItems: 'center',marginTop:'5%', marginRight: '5%'}]}>Carrinho</Text>
       <View></View>
      </View>
   { data.length ? <ScrollView style={{ width: "100%" }}>
        { data?.map( (product, index) =>{
          return (
        <View key={product.id} style={[styles.conteinerList, { height: 125, marginTop: "2%" }]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
                                style={styles.images}
                                source={{uri: `data:image/gif;base64,${product?.images[0]?.path}`}}

                              />
                <View style={{ alignSelf: "flex-start", marginTop: "5%", marginHorizontal: "-1%" }}>
                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 17 }}>{product.name}</Text>
                    <Text style={{ color: "#397764" }}>{product?.company?.name}</Text>
                    <Text style={{ color: "#397764", fontWeight: "bold" }}>R$ {product.price}/kg</Text>
                </View>
            </View>
            <View  style={styles.buttonCount}>
                <TouchableOpacity style={{ marginLeft: "7%" }}>
                    <Icon name="minus" color={"white"} size={17} />
                </TouchableOpacity>
                <Text style={[styles.text, { fontSize: 17, fontWeight: "normal" }]}>3</Text>
                <TouchableOpacity onPress={()=> deleteProduct(index)} style={{ marginRight: "7%" }}>
                    <Icon name="plus" color={"white"} size={17} />
                </TouchableOpacity>
            </View>  
        </View>
        )} )}
        <View style={[styles.conteinerList, { marginTop: "10%", flexDirection: "column" }]}>
            <Text style={[styles.textAlign, { color: "black" }]}>Endereco </Text>
            <Text style={[styles.textAlign, { color: "black", marginTop: "8%" }]}>Formas de Pagamento </Text>
            <View style={{ flexDirection: "row", margin: "7%", alignItems: "center" }}>
                <CheckBox
                        center
                        title='Maquineta'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={!checked}
                        onPress={()=> setChecked(false)}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <CheckBox
                       center
                       title='Dinheiro'
                       checkedIcon='dot-circle-o'
                       uncheckedIcon='circle-o'
                       onPress={()=> setChecked(true)}
                       checked={checked}
                    />
                    </View>
            </View>
            <View >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "center", borderWidth: 0.1, width: "100%" }}>
                    <Text style={[styles.textAlign, { marginRight: "5%", color: "black" }]}>SubTotal</Text>
                    <Text style={[styles.textAlign, { marginRight: "5%" }]}>R$ 210</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "center", width: "100%" }}>
                    <Text style={[styles.textAlign, { marginRight: "5%", color: "grey" }]}>Taxa de Entrega</Text>
                    <Text style={[styles.textAlign, { marginRight: "5%" }]}>R$ 5</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "center", width: "100%" }}>
                    <Text style={[styles.textAlign, { marginRight: "5%", color: "black" }]}>Total</Text>
                    <Text style={[styles.textAlign, { marginRight: "5%" }]}>R$ 215</Text>
                </View>
            </View>
        </View>
    </ScrollView> :  <NotFoundScreen  title="Carrinho vazio!" icon="shopping-cart" />}
    { data.length ? <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Fechar pedido</Text>
    </TouchableOpacity> : <View/>}

</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    height:'10%',
    backgroundColor:'white',
    width:'100%',
    flexDirection:'row',
    elevation:5,
    alignItems:'center',
    justifyContent:'space-between'
    
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
  conteinerList: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor:'#fff',
    elevation: 1,
    width: "100%",
    
  },
  subList:{
    flexDirection: "column",
    justifyContent: "space-between",
  },

  textAlign: {
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 10,
    marginVertical: 2,
    fontStyle: "normal"
  },
  text:{
    color:'white',
    fontSize:20,
    fontWeight:'bold'
},
  button:{
    backgroundColor:'#397764',
    width:314,
    height:55,
    marginVertical:'2%',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    left:0,
    right:0,
    top:-11,
    elevation:8,
    borderRadius:30
   },
   buttonCount:{
    flexDirection: "row", 
    justifyContent: "space-between",
    height:"25%",
    width:"25%",
    elevation:2,
    marginBottom:"2%",
    marginRight: "4%",
    backgroundColor: "#397764",
    alignItems:"center",
    borderRadius:20,
    alignSelf: "flex-end"
   },
   images:{
    width:120,
    alignSelf: "center",
    marginTop:"2%",
    height:120
   },
});
