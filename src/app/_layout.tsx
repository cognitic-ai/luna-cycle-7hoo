import { ThemeProvider } from "@/components/theme-provider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs as WebTabs } from "expo-router/tabs";
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import { Platform, useWindowDimensions } from "react-native";

export default function Layout() {
  const { width } = useWindowDimensions();

  const isMd = width >= 768;
  const isLg = width >= 1024;

  return (
    <ThemeProvider>
      {process.env.EXPO_OS === "web" ? (
        <WebTabs
          screenOptions={{
            headerShown: false,
            ...(isMd
              ? {
                  tabBarPosition: "left",
                  tabBarVariant: "material",
                  tabBarLabelPosition: isLg ? undefined : "below-icon",
                }
              : {
                  tabBarPosition: "bottom",
                }),
          }}
        >
          <WebTabs.Screen
            name="(index)"
            options={{
              title: "Track",
              tabBarIcon: (props) => <MaterialIcons {...props} name="add-circle" />,
            }}
          />
          <WebTabs.Screen
            name="(info)"
            options={{
              title: "Calendar",
              tabBarIcon: (props) => <MaterialIcons {...props} name="calendar-today" />,
            }}
          />
        </WebTabs>
      ) : (
        <NativeTabs>
          <NativeTabs.Trigger name="(index)">
            <Label>Track</Label>
            <Icon
              {...Platform.select({
                ios: { sf: { default: "plus.circle", selected: "plus.circle.fill" } },
                default: {
                  src: <VectorIcon family={MaterialIcons} name="add-circle" />,
                },
              })}
            />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(info)">
            <Label>Calendar</Label>
            <Icon
              {...Platform.select({
                ios: { sf: { default: "calendar", selected: "calendar" } },
                default: {
                  src: <VectorIcon family={MaterialIcons} name="calendar-today" />,
                },
              })}
            />
          </NativeTabs.Trigger>
        </NativeTabs>
      )}
    </ThemeProvider>
  );
}
