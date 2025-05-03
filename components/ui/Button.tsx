// import { clsx } from "clsx";
// import { type ReactNode } from "react";
// import {
//   Text,
//   TouchableOpacity,
//   type TouchableOpacityProps,
//   View,
// } from "react-native";

// interface Props extends TouchableOpacityProps {
//   title: string;
//   dark?: boolean;
//   active?: boolean;
//   className?: string;
//   endContent?: ReactNode;
//   startContent?: ReactNode;
// }

// export const Button = ({
//   title,
//   dark,
//   active,
//   startContent,
//   endContent,
//   ...props
// }: Props) => {
//   const baseStyles =
//     `flex flex-row items-center justify-center px-4 h-16 rounded-2xl border border-void/40 ` +
//     `${dark ? "bg-void" : "bg-white"}` +
//     `${active ? "bg-active" : "bg-white"}`;

//   return (
//     <TouchableOpacity {...props} className={`${baseStyles} ${props.className}`}>
//       <View className="px-4">{startContent}</View>
//       <Text
//         className={clsx("font-quickbold", dark ? "text-white" : "text-void")}
//       >
//         {title}
//       </Text>
//       <View className="px-4">{endContent}</View>
//     </TouchableOpacity>
//   );
// };
