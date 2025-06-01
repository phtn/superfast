import { useCallback, useMemo } from "react";
import { View } from "react-native";
import {
  Kind,
  QrCodeSvg,
  renderCircle,
  renderSquare,
  type CustomRenderer,
  type RenderParams,
} from "react-native-qr-svg";

interface StyledQrProps {
  value: string;
  size: number;
}
export const StyledQr = ({ value, size }: StyledQrProps) => {
  const render = useCallback(
    ({ isSquareElem, corners, cellSize }: RenderParams) => {
      if (isSquareElem) {
        return renderSquare(corners);
      }
      return renderCircle(corners.center, cellSize);
    },
    [],
  );
  const circles = useMemo(
    () =>
      ({
        render: {
          [Kind.Circle]: (params) => render(params),
          [Kind.Element]: (params) => render(params),
        },
      }) as CustomRenderer,
    [render],
  );

  return (
    <View>
      <View className="p-4  bg-white rounded-xl">
        <QrCodeSvg value={value} frameSize={size} renderer={circles} />
      </View>
    </View>
  );
};
