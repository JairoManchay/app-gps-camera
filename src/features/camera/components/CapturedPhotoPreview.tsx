import { forwardRef, useRef, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { captureRef } from "react-native-view-shot";
import { useSharePhoto } from "../hooks/useSharePhoto";
import type { PhotoMetadata } from "../types/photoMetadata";
import MapMetaCard from "./MapMetaCard";

type PhotoShareComposerProps = {
  photoUri: string;
  photoMetadata: PhotoMetadata | null;
  mapSnapshotUri: string | null;
};

const PhotoShareComposer = forwardRef<View, PhotoShareComposerProps>(
  function PhotoShareComposer(
    { photoUri, photoMetadata, mapSnapshotUri },
    ref,
  ) {
    return (
      <View ref={ref} collapsable={false} style={composerStyles.composerRoot}>
        <Image source={{ uri: photoUri }} style={composerStyles.photo} />

        <View style={composerStyles.card}>
          {photoMetadata ? (
            <MapMetaCard
              metadata={photoMetadata}
              mapSnapshotUri={mapSnapshotUri}
              mapRef={null}
              compact={false}
              containerStyle={composerStyles.mapMetaRow}
              mapColumnStyle={composerStyles.mapColumn}
              metaColumnStyle={composerStyles.metaColumn}
            />
          ) : null}
        </View>
      </View>
    );
  },
);

type CapturedPhotoPreviewProps = {
  photoUri: string;
  photoMetadata: PhotoMetadata | null;
  isSavingToLibrary: boolean;
  saveMessage: string | null;
  setSaveMessage: (message: string | null) => void;
  onSave: () => void;
  onRetake: () => void;
};

export default function CapturedPhotoPreview({
  photoUri,
  photoMetadata,
  isSavingToLibrary,
  saveMessage,
  setSaveMessage,
  onSave,
  onRetake,
}: CapturedPhotoPreviewProps) {
  const shareComposerRef = useRef<View>(null);
  const mapRef = useRef<any>(null);
  const { width } = useWindowDimensions();
  const compact = width < 380;
  const [mapSnapshotUri, setMapSnapshotUri] = useState<string | null>(null);
  const [isPreparingShare, setIsPreparingShare] = useState(false);
  const { isSharing, sharePhoto } = useSharePhoto({ setSaveMessage });

  const waitForNextFrame = () =>
    new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => resolve());
      });
    });

  const handleShare = async () => {
    if (isPreparingShare || isSharing) {
      return;
    }

    try {
      setIsPreparingShare(true);

      let snapshotUri: string | null = null;

      if (photoMetadata?.location && mapRef.current?.takeSnapshot) {
        snapshotUri = await mapRef.current.takeSnapshot({
          width: 720,
          height: 360,
          format: "jpg",
          quality: 0.9,
          result: "file",
        });
      }

      setMapSnapshotUri(snapshotUri);
      await waitForNextFrame();

      const shareUri = await captureRef(shareComposerRef, {
        format: "jpg",
        quality: 0.95,
        result: "tmpfile",
      });

      await sharePhoto(shareUri, photoMetadata);
    } catch (error) {
      console.error("Error preparing share image:", error);
      await sharePhoto(photoUri, photoMetadata);
    } finally {
      setIsPreparingShare(false);
    }
  };

  return (
    <View style={styles.previewContainer}>
      <Image source={{ uri: photoUri }} style={styles.previewImage} />

      {photoMetadata ? (
        <View style={styles.previewMetaCard}>
          <MapMetaCard
            metadata={photoMetadata}
            mapSnapshotUri={mapSnapshotUri}
            mapRef={mapRef}
            compact={compact}
            containerStyle={styles.previewMapRow}
            mapColumnStyle={[
              styles.previewMiniMapRow,
              compact && styles.previewMiniMapRowCompact,
            ]}
            metaColumnStyle={styles.previewMetaColumn}
          />
        </View>
      ) : null}

      <View style={styles.previewActions}>
        <Pressable
          onPress={handleShare}
          style={[styles.previewButton, styles.previewShareButton]}
          disabled={isSharing || isPreparingShare}
        >
          <Text style={styles.previewButtonText}>
            {isPreparingShare
              ? "Preparando..."
              : isSharing
                ? "Abriendo..."
                : "Compartir"}
          </Text>
        </Pressable>

        <Pressable
          onPress={onSave}
          style={styles.previewButton}
          disabled={isSavingToLibrary}
        >
          <Text style={styles.previewButtonText}>
            {isSavingToLibrary ? "Guardando..." : "Guardar"}
          </Text>
        </Pressable>

        <Pressable
          onPress={onRetake}
          style={[styles.previewButton, styles.previewRetakeButton]}
        >
          <Text style={styles.previewButtonText}>Tomar otra foto</Text>
        </Pressable>
      </View>

      {saveMessage ? (
        <Text style={styles.saveMessage}>{saveMessage}</Text>
      ) : null}

      <View style={styles.hiddenComposer} pointerEvents="none">
        <PhotoShareComposer
          ref={shareComposerRef}
          photoUri={photoUri}
          photoMetadata={photoMetadata}
          mapSnapshotUri={mapSnapshotUri}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  previewImage: {
    flex: 1,
  },
  previewMetaCard: {
    position: "absolute",
    top: 24,
    alignSelf: "center",
    width: "92%",
    maxWidth: 520,
    backgroundColor: "#000000cc",
    borderRadius: 8,
    padding: 8,
    gap: 6,
  },
  previewMiniMap: {
    height: 96,
    marginBottom: 6,
  },
  previewMiniMapRow: {
    width: 160,
    height: 96,
    marginRight: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  previewMiniMapRowCompact: {
    width: 120,
    height: 80,
  },
  previewMapRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  previewMetaColumn: {
    flex: 1,
    gap: 8,
  },
  previewMetaText: {
    color: "#fff",
    fontSize: 13,
  },
  previewRow: {
    flexDirection: "row",
    gap: 10,
  },
  previewColumn: {
    flex: 1,
    gap: 2,
  },
  previewColumnFull: {
    gap: 2,
  },
  previewLabel: {
    color: "#CBD5E1",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  previewValue: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  previewActions: {
    position: "absolute",
    bottom: 90,
    alignSelf: "center",
    flexDirection: "row",
    gap: 10,
  },
  previewButton: {
    backgroundColor: "#0EA5E9",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  previewRetakeButton: {
    backgroundColor: "#334155",
  },
  previewShareButton: {
    backgroundColor: "#16A34A",
  },
  previewButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  saveMessage: {
    position: "absolute",
    bottom: 42,
    alignSelf: "center",
    color: "#fff",
    backgroundColor: "#00000099",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  hiddenComposer: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 860,
    height: 1300,
    opacity: 0,
    zIndex: -1,
  },
});

const composerStyles = StyleSheet.create({
  composerRoot: {
    width: 860,
    backgroundColor: "#0F172A",
    padding: 18,
    gap: 14,
  },
  header: {
    gap: 4,
  },
  title: {
    color: "#F8FAFC",
    fontSize: 24,
    fontWeight: "800",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
  },
  photo: {
    width: "100%",
    height: 780,
    borderRadius: 18,
    backgroundColor: "#111827",
  },
  card: {
    gap: 12,
    borderRadius: 18,
    padding: 14,
    backgroundColor: "#111827",
  },
  mapMetaRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  mapColumn: {
    width: 260,
  },
  metaColumn: {
    flex: 1,
    gap: 8,
  },
  mapImage: {
    width: "100%",
    height: 240,
    borderRadius: 14,
    backgroundColor: "#1F2937",
  },
  mapFallback: {
    height: 240,
    borderRadius: 14,
  },
  cardText: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 20,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  column: {
    flex: 1,
    gap: 4,
  },
  columnFull: {
    gap: 4,
  },
  label: {
    color: "#94A3B8",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  value: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
  },
});
