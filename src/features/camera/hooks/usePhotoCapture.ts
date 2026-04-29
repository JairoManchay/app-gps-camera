import { CameraView } from "expo-camera";
import * as IntentLauncher from "expo-intent-launcher";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import { Platform } from "react-native";
import { formatDate } from "../../../shared/utils/formatDate";
import type { Coordinates } from "../../../types/common";
import type { PhotoMetadata } from "../types/photoMetadata";
import { buildLocationExif } from "../utils/exif";

type UsePhotoCaptureParams = {
  location: Coordinates | null;
  place: string;
  errorMsg: string | null;
  showCoordinates: boolean;
  showAddress: boolean;
  showTime: boolean;
  showDate: boolean;
};

export function usePhotoCapture({
  location,
  place,
  errorMsg,
  showCoordinates,
  showAddress,
  showTime,
  showDate,
}: UsePhotoCaptureParams) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoMetadata, setPhotoMetadata] = useState<PhotoMetadata | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingToLibrary, setIsSavingToLibrary] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions(
    {
      granularPermissions: ["photo", "video"],
    },
  );

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

  const takePhoto = async (
    cameraRef: React.RefObject<CameraView | null>,
    isCameraReady: boolean,
  ) => {
    if (!isCameraReady || !cameraRef.current || isSaving) {
      return;
    }

    try {
      setIsSaving(true);

      const snapshotLocation = location ? { ...location } : null;
      const snapshotTime = formatDate(new Date());
      const snapshotMetadata: PhotoMetadata = {
        location: snapshotLocation,
        place,
        day: snapshotTime.day,
        time: snapshotTime.time,
        errorMsg,
        overlay: {
          showCoordinates,
          showAddress,
          showTime,
          showDate,
        },
        miniMap: snapshotLocation
          ? {
              latitude: snapshotLocation.latitude,
              longitude: snapshotLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
              markerTitle: "Tu ubicacion",
              provider: Platform.OS === "android" ? "google" : "default",
              liteMode: Platform.OS === "android",
            }
          : null,
      };

      const captured = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        exif: true,
        additionalExif: buildLocationExif(snapshotMetadata),
      });

      if (captured) {
        setPhoto(captured.uri);
        setPhotoMetadata(snapshotMetadata);
        setSaveMessage(null);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const savePhotoWithMetadata = async () => {
    if (!photo || isSavingToLibrary) {
      return;
    }

    try {
      setIsSavingToLibrary(true);
      setSaveMessage(null);

      if (!mediaPermission?.granted) {
        const requestedPermission = await requestMediaPermission();

        if (!requestedPermission.granted) {
          setSaveMessage("Necesitas dar permiso para guardar en galeria.");
          return;
        }
      }

      const asset = await MediaLibrary.createAssetAsync(photo);
      const albumName = "GPS Camera";
      const album = await MediaLibrary.getAlbumAsync(albumName);

      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      } else {
        await MediaLibrary.createAlbumAsync(albumName, asset, false);
      }

      setSaveMessage("Foto guardada en galeria y en album GPS Camera.");
    } catch (error) {
      console.error("Error saving photo:", error);
      setSaveMessage("Error al guardar la foto en galeria.");
    } finally {
      setIsSavingToLibrary(false);
    }
  };

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

  const resetCapturedPhoto = () => {
    setPhoto(null);
    setPhotoMetadata(null);
    setSaveMessage(null);
  };

  return {
    photo,
    photoMetadata,
    isSaving,
    isSavingToLibrary,
    isSharing,
    saveMessage,
    setSaveMessage,
    takePhoto,
    savePhotoWithMetadata,
    sharePhoto,
    resetCapturedPhoto,
  };
}
