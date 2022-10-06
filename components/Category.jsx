import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { SvgProps } from "react-native-svg"
import { ScrollView, RectButton, RectButtonProps} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { opacity } from "styled-system";

type Props =  RectButtonProps & {
    title: String,
    icon: React.FC<SvgProps>,
    checked?: Boolean 
}

export default function Category({
   title,
   icon: Icon,
   checked = false,
   ...rest
}:Props){

  return (
   <RectButton {...rest} style={{borderWidth: 1}}>
    <View style={[styles.content,{opacity:  0.4}]}>
     <View style={ checked ? styles.checked : styles.check}>
     <Icon width={48} height={48}/>
     </View>
     <Text style={styles.title}>{ title }</Text>
     </View>
   </RectButton>
  );
};

const styles = StyleSheet.create({
  content: {
    width: 104,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1
  }
});

