import AsyncStorage from "@react-native-async-storage/async-storage";


function storage(){
  async function createValue(data: Object, key: String) {
    try {
      let savedItems = [];
      const response = await AsyncStorage.getItem(`${key}`);
      if (response != null) savedItems = JSON.parse(response);
      savedItems = [data, ...savedItems];
      console.log("create");
      return await AsyncStorage.setItem(`${key}`, JSON.stringify(savedItems));
    } catch (e) {
      console.log(e);
    }
  }

  async function getData(key?: String) {
    let data 
    if(key == "userAuth"){
      [data] = JSON.parse(await AsyncStorage.getItem(`${key}`));
      
    }else{
      data = await AsyncStorage.getItem(`${key}`)
    }
    return data;
  };

  async function clearAll(key: String, savedItems: []){
    return await AsyncStorage.setItem(key, JSON.stringify(savedItems));
  };
  
  async function clearkey(key) {
    return await AsyncStorage.removeItem(key);
  };

  return {
    clearAll,
    clearkey,
    getData,
    createValue
  }

}
export default storage
