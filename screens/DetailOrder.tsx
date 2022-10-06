import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'


const data = [
  {
    id: 1,
    name: 'Ordem',

  },

]

export default function DetailOrder() {

  const navigation = useNavigation()


  return (
    <View style={style.container}>
      <View style={style.heard}>
        <BorderlessButton style={{ alignSelf: "flex-start", marginRight: 10 }} onPress={navigation.goBack} ><Icon name='chevron-left' size={30} /></BorderlessButton>
        <Text style={{ fontSize: 18, fontStyle: "normal", fontWeight: "600" }}>DETALHES DO PEDIDO</Text>
      </View>

      <FlatList
        data={data}
        style={{ width: "100%" }}
        renderItem={({ item }) => (
          <View style={[style.conteinerList, { flexDirection: "column", justifyContent: "flex-start", height: "100%" }]}>
            <View style={[style.conteinerList, { flexDirection: "column", justifyContent: "flex-start" }]}>
              <Text style={[style.textAlign, { color: "black", }]}>Casa da Verdura</Text>
              <Text style={[style.textAlign, { color: "gray" }]}>test@gmail.com.br</Text>
              <Text style={[style.textAlign, { color: "gray" }]}>(88)9999999</Text>
            </View>
            <View style={[style.subList, { marginTop: "4%", borderRadius: 10 }]}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "center", width: "100%", borderRadius: 7}}>
             <Text style={[style.textAlign, { color: "gray" }]}>4/kg  Manga cariri</Text> 
             <Text style= {[style.textAlign,{marginRight: "5%"}]}>R$ 200</Text>
            </View> 
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "center", width: "100%", borderRadius: 7}}>
             <Text style={[style.textAlign, { color: "gray" }]}>2/kg  Maca amaricana </Text> 
             <Text style= {[style.textAlign,{marginRight: "5%"}]}>R$ 10</Text>
            </View>
            <View>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "center", borderWidth: 0.1, width: "100%"}}>
             <Text style= {[style.textAlign,{marginRight: "5%", color: "black"}]}>SubTotal</Text>
             <Text style= {[style.textAlign,{marginRight: "5%"}]}>R$ 210</Text>
            </View>
             <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "center", width: "100%"}}>
             <Text style= {[style.textAlign,{marginRight: "5%", color: "grey"}]}>Taxa de Entrega</Text>
             <Text style= {[style.textAlign,{marginRight: "5%"}]}>R$ 5</Text>
             </View>
             <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "center", width: "100%"}}>
             <Text style= {[style.textAlign,{marginRight: "5%", color: "black"}]}>Total</Text>
             <Text style= {[style.textAlign,{marginRight: "5%"}]}>R$ 215</Text>
             </View>
            </View>
            </View>

            <View style={[style.subList, { marginTop: "5%", borderRadius: 10 }]}>
            <Text style={[style.textAlign, { color: "black", }]}>Endereco de Entrega </Text>
            <Text style={[style.textAlign, { color: "gray" }]}>Joao Gabriel </Text>
              <Text style={[style.textAlign, { color: "gray" }]}>071-165553-74 </Text>
              <Text style={[style.textAlign, { color: "gray" }]}>Endereco: Rua tentente Antonio joa 163</Text>
              <Text style={[style.textAlign, { color: "gray" }]}>Crato-ce, Vila alta </Text>
            </View>

            <View style={[style.subList, { marginTop: "4%", borderRadius: 10 }]}>
            <Text style= {[style.textAlign,{marginRight: "5%", color: "black"}]}>Mais Informacoes</Text>

              <Text style={[style.textAlign, { color: "gray" }]}>Pedido: edf67g6d87f6fddf86 </Text>
              <Text style={[style.textAlign, { color: "gray" }]}>Satus do pedido: <Text style={{color:"green", fontWeight: "bold"}}>Entrege</Text></Text>
              <Text style={[style.textAlign, { color: "gray" }]}>Data: 12/06/2001 14:34 </Text>
              <Text style={[style.textAlign, { color: "gray" }]}>Atualizado: 12/06/2001 14:34 </Text>

              <Text style={[style.textAlign, { color: "gray" }]}>Forma de pagamento: Dinheiro</Text>
            </View>

          </View>
        )}
      />


    </View>
  );
}


export const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: "100%",
    flex: 1,
    backgroundColor: '#FFFAFA',
    paddingHorizontal: 20,

  },
  heard: {
    padding: 15,
    paddingTop: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
    elevation:5,
    alignItems: 'center',
  },

  conteinerList: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor:'#fff',
    elevation: 1,
    width: "100%",
    height: 100
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
  }
})
