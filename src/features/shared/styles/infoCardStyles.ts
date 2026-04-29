import { StyleSheet } from "react-native";

const infoCardStyles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 420,
    height: 120,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 6,
    flexDirection: "row",
    alignItems: "stretch",
    gap: 10,
  },
  leftPaneBase: {
    justifyContent: "center",
  },
  leftPaneNormal: {
    flex: 0.42,
  },
  leftPaneFull: {
    flex: 1,
  },
  leftPaneWide: {
    flex: 0.55,
  },
  mapCard: {
    height: "100%",
    borderRadius: 12,
  },
  rightPane: {
    flex: 0.58,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 2,
  },
  value: {
    fontSize: 10,
    color: "#334155",
    marginBottom: 0,
  },
});

export default infoCardStyles;
