import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgProps } from "react-native-svg"
import { RectButtonProps} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

type Props =  RectButtonProps & {
  title: String,
  icon: React.FC<SvgProps>
}

export default function NotFoundScreen({ title, icon ,...rest}: Props) {
  const navigate = useNavigation()
  return (
    <View style={styles.container}>
       <Feather
                name={icon}
                size={100}
                color='#397764'
                style={{ marginRight: 15 }}
              />
      <Text style={styles.title}></Text>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => navigate.goBack()} style={styles.link}>
        <Text style={styles.linkText}>Volte para a pagina inicial</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
