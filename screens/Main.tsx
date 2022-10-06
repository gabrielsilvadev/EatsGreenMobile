import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { categories } from "../utils/category";
import { Product } from "../interface/product";
import { Feather } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatGrid } from "react-native-super-grid";
import ApiRequest from "../services/api";
import localStorage from "../services/storage";

export default function Main() {
  const storage = new localStorage();
  const request = new ApiRequest();
  const [products, setProducts] = useState<Product[]>([]);
  const [productCar, setProductsCar] = useState<Product[]>([]);
  const [filterCategoryProduct, setFilterCategory] = useState<Product[]>([]);
  const navigation = useNavigation();
  const route = useRoute();
  async function getProducts() {
    let car: Product[] = await storage.getData("CarShop");
    setProductsCar(JSON.parse(car));
  }
  async function getProductsApi() {
    //const products = await request.get("/products/");
    setFilterCategory(products?.data);
    setProducts(products?.data);
  }
  useEffect(() => {
    getProductsApi();
    getProducts();
  }, []);

  function filterCategory(name: string) {
    if (name == "Todos") return setFilterCategory(products);
    const filter = products.filter(
      (product) => product.category.toUpperCase() === name.toUpperCase()
    );
    setFilterCategory(filter);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput placeholder="Pesquisar" maxLength={20} style={styles.search}>
          <Feather
            name="search"
            size={20}
            style={{ alignSelf: "flex-start", marginTop: "28%" }}
            color="gray"
          />
        </TextInput>
        <View style={{ backgroundColor: "white" }}>
          {productCar?.length ? (
            <View style={styles.carShoping}>
              <Text
                style={{
                  alignSelf: "center",
                  color: "white",
                  height: 16,
                  fontWeight: "bold",
                }}
              >
                {productCar.length}
              </Text>
            </View>
          ) : (
            <View style={{ marginTop: "10%" }}></View>
          )}
          <View>
            <Pressable
              onPress={() => navigation.navigate("CarShopping")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginLeft: "7%",
                position: "absolute",
              })}
            >
              <Feather
                name="shopping-cart"
                size={30}
                style={{ opacity: 0.4 }}
              />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={{ width: "100%", backgroundColor: "#F5F0EF" }}>
      </View>
      <View style={styles.conteinerCategory}>
        {categories.map((category) => {
          return (
            <View key={category.id} style={styles.subConteinerCategory}>
              <TouchableOpacity
                style={styles.content}
                onPress={() => filterCategory(category.title)}
              >
                <View style={{ backgroundColor: "#F5F0EF" }}>
                  <Text
                    style={[styles.title, { fontWeight: "bold", opacity: 0.8 }]}
                  >
                    {category.title}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <View
        style={{ height: "100%", width: "100%", backgroundColor: "#F5F0EF" }}
      >
        <FlatGrid
          itemDimension={180}
          data={filterCategoryProduct}
          spacing={10}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: "#F5F0EF" }}>
              <TouchableOpacity
                style={styles.ConteinerTabs}
                onPress={() => navigation.navigate("DetailProduct", item)}
              >
                {item.images?.map((images) => {
                  return (
                    <Image
                      style={[styles.images, { borderRadius: 4 }]}
                      key={images}
                      source={{ uri: `data:image/gif;base64,${images.path}` }}
                    />
                  );
                })}
                <Text style={styles.text}>
                  {item.name[0].toUpperCase() + item.name.substring(1)}
                </Text>
                <Text
                  style={[
                    styles.text,
                    { color: "#397764", fontWeight: "bold", fontSize: 17 },
                  ]}
                >
                  {item.price}/Kg
                </Text>
                <Text style={[styles.text, { color: "gray", fontSize: 13 }]}>
                  Casa da Verdura
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F0EF",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    height: 80,
    elevation: 5,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    color: "#397764",
    fontWeight: "normal",
  },
  search: {
    alignSelf: "center",
    width: "78%",
    marginLeft: "6%",
    marginTop: "5%",
    height: "47%",
    borderWidth: 0.8,
    borderRadius: 17,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  conteinerProduct: {
    height: 150,
    alignItems: "center",
    width: 100,
    elevation: 1,
  },
  images: {
    width: 100,
    height: 100,
  },
  text: {
    color: "black",
    fontWeight: "400",
    fontSize: 13,
    marginTop: 10,
  },
  ConteinerTabs: {
    height: 210,
    elevation: 1.6,
    width: 160,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: "7%",
    borderRadius: 30,
  },
  titleH3: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
    fontStyle: "normal",
    textAlign: "center",
    color: "grey",
  },
  carShoping: {
    alignSelf: "center",
    backgroundColor: "red",
    borderRadius: 100,
    position: "relative",
    top: "10%",
    right: "10%",
    width: "29%",
    border: 1,
    borderWidth: 0.5,
    borderColor: 'gray',
    height: "30%",
    marginLeft: "16%",
    marginTop: "16%",
  },
  input: {
    height: 20,
    width: "80%",
    alignSelf: "center",
    marginTop: "5%",
    marginBottom: 20,
    borderWidth: 0.1,
    borderRadius: 17,
  },
  content: {
    width: "97%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    margin: "3%",
    backgroundColor: "#F5F0EF",
    borderColor: "#397764",
  },
  conteinerCategory: {
    alignContent: "center",
    flexDirection: "row",
    height: '10%',
    backgroundColor: "#F5F0EF",
    width: "90%",
    marginTop: '4%',
    justifyContent: "space-between",
  },
  subConteinerCategory: {
    alignItems: "center",
    height: '70%',
    backgroundColor: "#F5F0EF",
  },
});
