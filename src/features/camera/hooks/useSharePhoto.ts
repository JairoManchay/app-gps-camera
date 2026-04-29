import * as IntentLauncher from "expo-intent-launcher";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import { Platform } from "react-native";
import type { PhotoMetadata } from "../types/photoMetadata";

type UseSharePhotoParams = {
  setSaveMessage: (message: string | null) => void;
};

const buildShareCaption = (metadata: PhotoMetadata) => {
  const locationLine = metadata.location
    ? `${metadata.location.latitude.toFixed(6)}, ${metadata.location.longitude.toFixed(6)}`
    : "Sin coordenadas";

  return [
    "GPS Camera",
    `Fecha: ${metadata.day}`,
    `Hora: ${metadata.time}`,
    `Ubicacion: ${locationLine}`,
    `Direccion: ${metadata.place || "Sin direccion"}`,
    metadata.errorMsg ? `Estado: ${metadata.errorMsg}` : null,
  ]
    .filter(Boolean)
    .join("\n");
};

const normalizeShareUri = (uri: string) =>
  uri.startsWith("file://") ? uri : `file://${uri}`;

export function useSharePhoto({ setSaveMessage }: UseSharePhotoParams) {
  const [isSharing, setIsSharing] = useState(false);

  const sharePhoto = async (
    shareUri: string,
    shareMetadata: PhotoMetadata | null,
  ) => {
    if (isSharing) {
      return;
    }

    try {
      setIsSharing(true);
      setSaveMessage(null);

      const shareCaption = shareMetadata
        ? buildShareCaption(shareMetadata)
        : "GPS Camera";
      const normalizedShareUri = normalizeShareUri(shareUri);

      if (Platform.OS === "android") {
        try {
          await IntentLauncher.startActivityAsync(
            "android.intent.action.SEND",
            {
              packageName: "com.whatsapp",
              type: "image/jpeg",
              data: normalizedShareUri,
              extra: {
                "android.intent.extra.STREAM": normalizedShareUri,
                "android.intent.extra.TEXT": shareCaption,
              },
            },
          );
          return;
        } catch (intentError) {
          console.error("Error opening WhatsApp intent:", intentError);
        }
      }

      if (!(await Sharing.isAvailableAsync())) {
        setSaveMessage("Compartir no esta disponible en este dispositivo.");
        return;
      }

      await Sharing.shareAsync(normalizedShareUri, {
        mimeType: "image/jpeg",
        dialogTitle: "Compartir foto",
      });
    } catch (error) {
      console.error("Error sharing photo:", error);
      setSaveMessage(
        "Error al abrir WhatsApp o el panel para compartir la foto.",
      );
    } finally {
      setIsSharing(false);
    }
  };

  return {
    isSharing,
    sharePhoto,
  };
}
