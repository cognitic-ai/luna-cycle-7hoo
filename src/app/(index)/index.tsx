import { ScrollView, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as AC from "@bacons/apple-colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCyclePhase, getPhaseName, getPhaseColor } from "@/utils/cycle";
import { getZodiacSign, getZodiacInfo, getMoonPhase, getDailyGuidance } from "@/utils/astrology";

export default function IndexRoute() {
  const [hasProfile, setHasProfile] = useState(false);
  const [cycleInfo, setCycleInfo] = useState<any>(null);
  const [zodiacInfo, setZodiacInfo] = useState<any>(null);
  const [moonPhase, setMoonPhase] = useState<any>(null);
  const [dailyGuidance, setDailyGuidance] = useState<any>(null);

  useEffect(() => {
    loadDailyInsights();
  }, []);

  const loadDailyInsights = async () => {
    try {
      const saved = await AsyncStorage.getItem("userProfile");
      if (saved) {
        const profile = JSON.parse(saved);

        if (profile.birthDate && profile.lastPeriodStart) {
          setHasProfile(true);

          // Get cycle info
          const cycle = getCyclePhase(new Date(profile.lastPeriodStart));
          setCycleInfo(cycle);

          // Get zodiac sign
          const sign = getZodiacSign(new Date(profile.birthDate));
          const zodiac = getZodiacInfo(sign);
          setZodiacInfo(zodiac);

          // Get moon phase
          const moon = getMoonPhase();
          setMoonPhase(moon);

          // Get daily guidance
          const guidance = getDailyGuidance(sign, moon.phase, cycle.phase);
          setDailyGuidance(guidance);
        }
      }
    } catch (error) {
      console.error("Error loading insights:", error);
    }
  };

  if (!hasProfile) {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1 }}
      >
        <View style={{ padding: 20, gap: 24 }}>
          <View
            style={{
              padding: 30,
              borderRadius: 20,
              borderCurve: "continuous",
              backgroundColor: AC.secondarySystemBackground,
              alignItems: "center",
              gap: 16,
            }}
          >
            <Text style={{ fontSize: 48 }}>✨</Text>
            <Text style={{ fontSize: 24, fontWeight: "700", color: AC.label, textAlign: "center" }}>
              Welcome to Cosmic Cycles
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: AC.secondaryLabel,
                textAlign: "center",
                lineHeight: 24,
              }}
            >
              Get personalized daily insights combining your hormonal cycle with astrological guidance.
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: AC.secondaryLabel,
                textAlign: "center",
                lineHeight: 22,
                marginTop: 8,
              }}
            >
              Visit the Profile tab to enter your birth date, time, location, and cycle information to begin.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}
    >
      <View style={{ padding: 20, gap: 24 }}>
        {/* Today's Date */}
        <View
          style={{
            padding: 16,
            borderRadius: 16,
            borderCurve: "continuous",
            backgroundColor: AC.secondarySystemBackground,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "700", color: AC.label }}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        {/* Current Cycle Phase */}
        {cycleInfo && (
          <View
            style={{
              padding: 24,
              borderRadius: 20,
              borderCurve: "continuous",
              backgroundColor: getPhaseColor(cycleInfo.phase),
              gap: 12,
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ gap: 4, flex: 1 }}>
                <Text style={{ fontSize: 28, fontWeight: "700", color: "white" }}>
                  {getPhaseName(cycleInfo.phase)} Phase
                </Text>
                <Text style={{ fontSize: 15, color: "white", opacity: 0.95 }}>
                  Day {cycleInfo.dayInCycle} of your cycle
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingTop: 12,
                borderTopWidth: 1,
                borderTopColor: "rgba(255,255,255,0.3)",
                gap: 8,
              }}
            >
              <Text style={{ fontSize: 15, color: "white", lineHeight: 22 }}>
                {cycleInfo.phaseDescription}
              </Text>
              <Text style={{ fontSize: 14, color: "white", opacity: 0.95, lineHeight: 20 }}>
                <Text style={{ fontWeight: "600" }}>Energy: </Text>
                {cycleInfo.phaseEnergy}
              </Text>
            </View>
          </View>
        )}

        {/* Zodiac & Moon */}
        {zodiacInfo && moonPhase && (
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View
              style={{
                flex: 1,
                padding: 20,
                borderRadius: 16,
                borderCurve: "continuous",
                backgroundColor: AC.systemPurple,
                gap: 8,
              }}
            >
              <Text style={{ fontSize: 40, textAlign: "center" }}>{zodiacInfo.symbol}</Text>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "white", textAlign: "center" }}>
                {zodiacInfo.sign}
              </Text>
              <Text style={{ fontSize: 12, color: "white", opacity: 0.9, textAlign: "center" }}>
                {zodiacInfo.element}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                padding: 20,
                borderRadius: 16,
                borderCurve: "continuous",
                backgroundColor: AC.systemIndigo,
                gap: 8,
              }}
            >
              <Text style={{ fontSize: 40, textAlign: "center" }}>{moonPhase.emoji}</Text>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "white", textAlign: "center" }}>
                {moonPhase.phase}
              </Text>
              <Text style={{ fontSize: 11, color: "white", opacity: 0.9, textAlign: "center" }}>
                {moonPhase.illumination}% illuminated
              </Text>
            </View>
          </View>
        )}

        {/* Daily Guidance */}
        {dailyGuidance && (
          <View
            style={{
              padding: 24,
              borderRadius: 20,
              borderCurve: "continuous",
              backgroundColor: AC.systemPink,
              gap: 16,
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "700", color: "white" }}>
              Today's Cosmic Guidance
            </Text>
            <Text style={{ fontSize: 16, color: "white", lineHeight: 24 }}>
              {dailyGuidance.message}
            </Text>

            <View style={{ paddingTop: 12, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.3)", gap: 12 }}>
              <View style={{ gap: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>
                  ✨ Recommended Activities
                </Text>
                {dailyGuidance.activities.map((activity: string, i: number) => (
                  <Text key={i} style={{ fontSize: 14, color: "white", opacity: 0.95, marginLeft: 8 }}>
                    • {activity}
                  </Text>
                ))}
              </View>

              {dailyGuidance.warnings.length > 0 && (
                <View style={{ gap: 8 }}>
                  <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>
                    ⚠️ Be Mindful Of
                  </Text>
                  {dailyGuidance.warnings.map((warning: string, i: number) => (
                    <Text key={i} style={{ fontSize: 14, color: "white", opacity: 0.95, marginLeft: 8 }}>
                      • {warning}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}

        {/* Moon Phase Description */}
        {moonPhase && (
          <View
            style={{
              padding: 20,
              borderRadius: 16,
              borderCurve: "continuous",
              backgroundColor: AC.secondarySystemBackground,
              gap: 8,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: AC.label }}>
              Moon Energy
            </Text>
            <Text style={{ fontSize: 15, color: AC.secondaryLabel, lineHeight: 22 }}>
              {moonPhase.description}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
