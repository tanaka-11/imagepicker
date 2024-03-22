import { StatusBar } from "expo-status-bar";
import { Button, Image, Text, View } from "react-native";
import { useState, useEffect } from "react";

// Acessando todos recursos da biblioteca imagePicker
import * as ImagePicker from "expo-image-picker";

export default function App() {
  // State tradicional
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

  return (
    <>
      <StatusBar style="auto" />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Escolher foto" />
        <Image style={{ width: 300, height: 300 }} />
      </View>
    </>
  );
}
