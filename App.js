import { StatusBar } from "expo-status-bar";
import { Button, Image, Text, View } from "react-native";
import { useState, useEffect } from "react";

// Acessando todos recursos da biblioteca imagePicker
import * as ImagePicker from "expo-image-picker";

export default function App() {
  // State tradicional guardando a foto
  const [foto, setFoto] = useState(null);

  // State de checagem de permissões atraves do hook(useCameraPermissions) da biblioteca
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  // useEffect monitorando as permissoes
  useEffect(() => {
    async function verificaPermissoes() {
      // CameraStatus guardando a requisição da permissão de camera
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

      // Requisição da permissão recebendo o cameraStatus com o parametro de ter permitido
      requestPermission(cameraStatus === "granted");
    }

    verificaPermissoes();
  }, []);

  // Função para biblioteca de fotos
  const escolherFoto = async () => {
    // Resultado guardando a biblioteca de fotos
    const resultado = await ImagePicker.launchImageLibraryAsync({
      // Habilitando apenas as imagens do dispositivo atraves do (MediaTypeOptions)
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // Permitindo edição de foto
      allowsEditing: true,
      // Formato da foto
      aspect: [16, 9],
      // Qualidade da imagem de 0 a 1
      quality: 1,
    });

    // Se o resultado não for cancelado
    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  // Função para captura de nova foto
  const capturarFoto = async () => {
    const imagem = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [16, 9],
      quality: 0.5,
    });

    // Se a imagem não for cancelado
    if (!imagem.canceled) {
      setFoto(imagem.assets[0].uri);
    }
  };

  return (
    <>
      <StatusBar style="auto" />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            justifyContent: "space-evenly",
            // alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Button onPress={escolherFoto} title="Escolher foto" />
          <Button onPress={capturarFoto} title="Tirar uma nova foto" />
        </View>
        {/* Condicional para aparecer a imagem */}
        {foto ? (
          <Image source={{ uri: foto }} style={{ width: 300, height: 300 }} />
        ) : (
          <Text>Você ainda não escolheu uma foto </Text>
        )}
      </View>
    </>
  );
}
