import { StatusBar } from "expo-status-bar";
import { Button, Image, Text, View } from "react-native";
import { useState, useEffect } from "react";

// Acessando todos recursos da biblioteca imagePicker
import * as ImagePicker from "expo-image-picker";
// Acessando todos recursos da MediaLibrary
import * as MediaLibrary from "expo-media-library";
// Acessando todos recursos da Sharing
import * as Sharing from "expo-sharing";

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
      // Negando edição da foto
      allowsEditing: false,
      // Formato da imagem
      aspect: [16, 9],
      // Nivel da qualidade
      quality: 1,
    });

    // Se a imagem não for cancelada
    if (!imagem.canceled) {
      await MediaLibrary.saveToLibraryAsync(imagem.assets[0].uri); // Salvando a imagem
      setFoto(imagem.assets[0].uri);
    }
  };

  // Função para compartilhar a foto
  const compartilharFoto = async () => {
    await Sharing.shareAsync(foto);
  };

  return (
    <>
      <StatusBar style="auto" />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
            gap: 8,
            margin: 10,
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

        {foto && (
          <Button
            style={{ padding: 10, margin: 10 }}
            onPress={compartilharFoto}
            title="Compartilhar"
          />
        )}
      </View>
    </>
  );
}
