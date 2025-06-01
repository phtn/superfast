import { Colors } from "@/constants/Colors";
import { memo, useMemo } from "react";
import { View } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { FlexCol } from "../FlexCol";
import { FlexRow } from "../FlexRow";
import { StyledQr } from "../QRStyling";
import { SheetHeader } from "./components";

const QRViewerSheet = ({ payload }: SheetProps<"qr-viewer">) => {
  // Memoize the styles to prevent recreation on each render
  const sheetStyles = useMemo(
    () => ({
      indicator: {
        top: -7,
        zIndex: 1,
        position: "absolute",
        backgroundColor: payload?.isDark
          ? Colors.dark.hyper
          : Colors.dark.active,
      } as ViewStyle,
      container: {
        elevation: 0,
        shadowOpacity: 0,
        paddingBottom: 0,
        overflow: "hidden",
        shadowColor: "none",
        paddingHorizontal: 0,
        borderTopEndRadius: 36,
        borderTopStartRadius: 36,
        borderBottomEndRadius: 36,
        borderBottomStartRadius: 36,
        backgroundColor: "transparent",
        shadowOffset: { width: 0, height: 0 },
      } as ViewStyle,
    }),
    [payload],
  );

  return (
    <ActionSheet
      elevation={0}
      gestureEnabled
      key="get-started-sheet"
      defaultOverlayOpacity={0.15}
      indicatorStyle={sheetStyles.indicator}
      containerStyle={sheetStyles.container}
    >
      <View className="px-0">
        <FlexCol
          style={{ borderTopStartRadius: 24, borderTopEndRadius: 24 }}
          className="justify-start relative bg-white dark:bg-hades py-8"
        >
          <QRViewer {...payload} />
        </FlexCol>
      </View>
    </ActionSheet>
  );
};

interface QRViewerProps {
  affiliateCode: string;
  isDark: boolean;
}
const QRViewer = memo(({ affiliateCode }: QRViewerProps) => {
  return (
    <View className="py-4 px-2">
      <SheetHeader title="Affiliate QR Code" />
      <FlexRow className="rounded-3xl py-6">
        <StyledQr value={`https://${affiliateCode}`} size={300} />
      </FlexRow>
    </View>
  );
});
QRViewer.displayName = "QRViewer";

export default QRViewerSheet;
