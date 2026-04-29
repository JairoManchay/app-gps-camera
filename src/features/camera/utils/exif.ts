import type { PhotoMetadata } from "../types/photoMetadata";

const toExifRationalDms = (coordinate: number) => {
  const absolute = Math.abs(coordinate);
  const degrees = Math.floor(absolute);
  const minutesFloat = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = (minutesFloat - minutes) * 60;

  return `${degrees}/1,${minutes}/1,${Math.round(seconds * 1000)}/1000`;
};

const toExifDateTime = (value: Date) => {
  const yyyy = value.getFullYear();
  const mm = String(value.getMonth() + 1).padStart(2, "0");
  const dd = String(value.getDate()).padStart(2, "0");
  const hh = String(value.getHours()).padStart(2, "0");
  const min = String(value.getMinutes()).padStart(2, "0");
  const ss = String(value.getSeconds()).padStart(2, "0");

  return `${yyyy}:${mm}:${dd} ${hh}:${min}:${ss}`;
};

export const buildLocationExif = (metadata: PhotoMetadata) => {
  const photoTakenAt = new Date();
  const metadataSnapshot = JSON.stringify(metadata);

  if (!metadata.location) {
    return {
      DateTimeOriginal: toExifDateTime(photoTakenAt),
      UserComment: metadataSnapshot,
      ImageDescription: `${metadata.place || "Sin direccion"} | ${metadata.day} ${metadata.time}`,
    };
  }

  return {
    GPSLatitudeRef: metadata.location.latitude >= 0 ? "N" : "S",
    GPSLatitude: toExifRationalDms(metadata.location.latitude),
    GPSLongitudeRef: metadata.location.longitude >= 0 ? "E" : "W",
    GPSLongitude: toExifRationalDms(metadata.location.longitude),
    DateTimeOriginal: toExifDateTime(photoTakenAt),
    UserComment: metadataSnapshot,
    ImageDescription: `${metadata.place || "Sin direccion"} | ${metadata.day} ${metadata.time}`,
  };
};
