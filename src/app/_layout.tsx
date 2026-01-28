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
              title: "Today",
              tabBarIcon: (props) => <MaterialIcons {...props} name="today" />,
            }}
          />
          <WebTabs.Screen
            name="(calendar)"
            options={{
              title: "Calendar",
              tabBarIcon: (props) => <MaterialIcons {...props} name="calendar-today" />,
            }}
          />
          <WebTabs.Screen
            name="(profile)"
            options={{
              title: "Profile",
              tabBarIcon: (props) => <MaterialIcons {...props} name="person" />,
            }}
          />
        </WebTabs>
      ) : (
        <NativeTabs>
          <NativeTabs.Trigger name="(index)">
            <Label>Today</Label>
            <Icon
              {...Platform.select({
                ios: { sf: { default: "sun.max", selected: "sun.max.fill" } },
                default: {
                  src: <VectorIcon family={MaterialIcons} name="today" />,
                },
              })}
            />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(calendar)">
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
          <NativeTabs.Trigger name="(profile)">
            <Label>Profile</Label>
            <Icon
              {...Platform.select({
                ios: { sf: { default: "person", selected: "person.fill" } },
                default: {
                  src: <VectorIcon family={MaterialIcons} name="person" />,
                },
              })}
            />
          </NativeTabs.Trigger>
        </NativeTabs>
      )}
    </ThemeProvider>
  );
}
