import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

export default function Select(){
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("Rua Tenten antonio joao")

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.heard}>
                <Pressable style={{ alignSelf: "flex-start"}}    onPress={() => setModalVisible(!modalVisible)} ><Icon name='chevron-left' size={30} /></Pressable>
                <Text style={{ fontSize: 18, fontStyle: "normal", fontWeight: "600" , marginLeft: "30%"}}>SELECIONE UM ENDERECO</Text>
            </View>
            <View >
             <ScrollView style={styles.list}>
            
               <Pressable  onPress={()=> alert('Ola')} style={styles.select}>
             <Text style={[styles.textStyle,{color: "black", opacity: 0.6, marginHorizontal: "20%", marginVertical: "1%"}]}>Rua  tenete antonio joao 165 vila alta  ap 404 </Text>
               </Pressable>
               
             </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen, { justifyContent: "space-between", flexDirection: "row", alignItems: "center"}]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>{text}</Text>
        <Icon name="chevron-down" size={30} color="white"/>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    height:"80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    height: "60%",
    width:"70%",
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#397764",
  },
  heard: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"flex-start",
    width: "100%"
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  list:{
      marginVertical: "10%",
      
  },
  select:{
      borderWidth: 0.2,
      borderColor:"gray",
      borderRadius: 20,
      width: "100%",
      elevation: 3,
      backgroundColor: "white"
  }
});

