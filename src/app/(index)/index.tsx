import { ScrollView, Text, View, Pressable, useWindowDimensions } from "react-native";
import { useState } from "react";
import * as AC from "@bacons/apple-colors";

const MOODS = [
  { emoji: "😊", label: "Happy", value: "happy" },
  { emoji: "😌", label: "Calm", value: "calm" },
  { emoji: "😐", label: "Neutral", value: "neutral" },
  { emoji: "😔", label: "Sad", value: "sad" },
  { emoji: "😤", label: "Irritable", value: "irritable" },
];

const ENERGY_LEVELS = [
  { label: "Very Low", value: 1 },
  { label: "Low", value: 2 },
  { label: "Medium", value: 3 },
  { label: "High", value: 4 },
  { label: "Very High", value: 5 },
];

const SYMPTOMS = [
  { label: "Cramps", icon: "💢" },
  { label: "Headache", icon: "🤕" },
  { label: "Bloating", icon: "🎈" },
  { label: "Fatigue", icon: "😴" },
  { label: "Nausea", icon: "🤢" },
  { label: "Acne", icon: "✨" },
  { label: "Back Pain", icon: "🔙" },
  { label: "Tender Breasts", icon: "💝" },
];

export default function IndexRoute() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const { width } = useWindowDimensions();

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        flex: 1,
      }}
    >
      <View style={{ padding: 20, gap: 32 }}>
        {/* Mood Section */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: AC.label }}>
            How are you feeling?
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {MOODS.map((mood) => (
              <Pressable
                key={mood.value}
                onPress={() => setSelectedMood(mood.value)}
                style={{
                  alignItems: "center",
                  padding: 12,
                  borderRadius: 16,
                  borderCurve: "continuous",
                  backgroundColor:
                    selectedMood === mood.value
                      ? AC.systemBlue
                      : AC.secondarySystemBackground,
                  minWidth: 80,
                  gap: 4,
                }}
              >
                <Text style={{ fontSize: 32 }}>{mood.emoji}</Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: selectedMood === mood.value ? "white" : AC.label,
                    fontWeight: selectedMood === mood.value ? "600" : "400",
                  }}
                >
                  {mood.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Energy Level */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: AC.label }}>
            Energy Level
          </Text>
          <View style={{ flexDirection: "row", gap: 8, justifyContent: "space-between" }}>
            {ENERGY_LEVELS.map((level) => (
              <Pressable
                key={level.value}
                onPress={() => setSelectedEnergy(level.value)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  padding: 16,
                  borderRadius: 12,
                  borderCurve: "continuous",
                  backgroundColor:
                    selectedEnergy === level.value
                      ? AC.systemGreen
                      : AC.secondarySystemBackground,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: selectedEnergy === level.value ? "white" : AC.label,
                  }}
                >
                  {level.value}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: selectedEnergy === level.value ? "white" : AC.secondaryLabel,
                    marginTop: 4,
                    textAlign: "center",
                  }}
                >
                  {level.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Symptoms */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: AC.label }}>
            Symptoms
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {SYMPTOMS.map((symptom) => (
              <Pressable
                key={symptom.label}
                onPress={() => toggleSymptom(symptom.label)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                  borderRadius: 20,
                  borderCurve: "continuous",
                  backgroundColor: selectedSymptoms.includes(symptom.label)
                    ? AC.systemPurple
                    : AC.secondarySystemBackground,
                }}
              >
                <Text style={{ fontSize: 16 }}>{symptom.icon}</Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: selectedSymptoms.includes(symptom.label)
                      ? "white"
                      : AC.label,
                    fontWeight: selectedSymptoms.includes(symptom.label) ? "600" : "400",
                  }}
                >
                  {symptom.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Save Button */}
        <Pressable
          style={{
            backgroundColor: AC.systemBlue,
            padding: 16,
            borderRadius: 14,
            borderCurve: "continuous",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
            Save Entry
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
