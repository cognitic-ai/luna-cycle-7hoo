import { ScrollView, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as AC from "@bacons/apple-colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar, DateData } from "react-native-calendars";
import { getCyclePhase, getPhaseColor, getPhaseName } from "@/utils/cycle";

export default function CalendarRoute() {
  const [lastPeriodStart, setLastPeriodStart] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [markedDates, setMarkedDates] = useState<any>({});

  useEffect(() => {
    loadProfileAndGenerateCalendar();
  }, []);

  const loadProfileAndGenerateCalendar = async () => {
    try {
      const saved = await AsyncStorage.getItem("userProfile");
      if (saved) {
        const profile = JSON.parse(saved);
        if (profile.lastPeriodStart) {
          const periodDate = new Date(profile.lastPeriodStart);
          setLastPeriodStart(periodDate);
          generateCalendarMarks(periodDate);
        }
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const generateCalendarMarks = (lastPeriod: Date) => {
    const marks: any = {};
    const today = new Date();
    const cycleLength = 28;

    // Mark the last 60 days
    for (let i = -30; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split("T")[0];

      const cycleInfo = getCyclePhase(lastPeriod, date);
      const phaseColor = getPhaseColor(cycleInfo.phase);

      marks[dateString] = {
        marked: true,
        dotColor: phaseColor,
        selectedColor: phaseColor,
        customStyles: {
          container: {
            backgroundColor: i === 0 ? phaseColor : undefined,
          },
          text: {
            color: i === 0 ? "white" : AC.label,
            fontWeight: i === 0 ? "bold" : "normal",
          },
        },
      };
    }

    setMarkedDates(marks);
  };

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const getSelectedDateInfo = () => {
    if (!selectedDate || !lastPeriodStart) return null;
    const date = new Date(selectedDate);
    return getCyclePhase(lastPeriodStart, date);
  };

  const selectedInfo = getSelectedDateInfo();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}
    >
      <View style={{ padding: 20, gap: 24 }}>
        {lastPeriodStart ? (
          <>
            <Calendar
              markedDates={markedDates}
              onDayPress={onDayPress}
              theme={{
                backgroundColor: AC.secondarySystemBackground,
                calendarBackground: AC.secondarySystemBackground,
                textSectionTitleColor: AC.label,
                selectedDayBackgroundColor: AC.systemBlue,
                selectedDayTextColor: "white",
                todayTextColor: AC.systemBlue,
                dayTextColor: AC.label,
                textDisabledColor: AC.tertiaryLabel,
                monthTextColor: AC.label,
                textMonthFontWeight: "bold",
                textDayFontSize: 16,
                textMonthFontSize: 18,
              }}
              style={{
                borderRadius: 16,
                padding: 10,
              }}
            />

            {/* Legend */}
            <View
              style={{
                padding: 16,
                borderRadius: 16,
                borderCurve: "continuous",
                backgroundColor: AC.secondarySystemBackground,
                gap: 12,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600", color: AC.label }}>
                Cycle Phases
              </Text>
              <View style={{ gap: 8 }}>
                {["menstrual", "follicular", "ovulation", "luteal"].map((phase) => (
                  <View
                    key={phase}
                    style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
                  >
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        backgroundColor: getPhaseColor(phase as any),
                      }}
                    />
                    <Text style={{ fontSize: 15, color: AC.label }}>
                      {getPhaseName(phase as any)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Selected Date Info */}
            {selectedInfo && (
              <View
                style={{
                  padding: 20,
                  borderRadius: 16,
                  borderCurve: "continuous",
                  backgroundColor: getPhaseColor(selectedInfo.phase),
                  gap: 12,
                }}
              >
                <Text style={{ fontSize: 22, fontWeight: "700", color: "white" }}>
                  {getPhaseName(selectedInfo.phase)} Phase
                </Text>
                <Text style={{ fontSize: 15, color: "white", opacity: 0.95 }}>
                  Day {selectedInfo.dayInCycle} of your cycle
                </Text>
                <View
                  style={{
                    paddingTop: 12,
                    borderTopWidth: 1,
                    borderTopColor: "rgba(255,255,255,0.3)",
                    gap: 8,
                  }}
                >
                  <Text style={{ fontSize: 15, color: "white", lineHeight: 22 }}>
                    {selectedInfo.phaseDescription}
                  </Text>
                  <Text style={{ fontSize: 14, color: "white", opacity: 0.9, lineHeight: 20 }}>
                    <Text style={{ fontWeight: "600" }}>Energy: </Text>
                    {selectedInfo.phaseEnergy}
                  </Text>
                  <Text style={{ fontSize: 14, color: "white", opacity: 0.9, lineHeight: 20 }}>
                    <Text style={{ fontWeight: "600" }}>Emotions: </Text>
                    {selectedInfo.phaseEmotions}
                  </Text>
                </View>
              </View>
            )}

            {/* Current Cycle Info */}
            {!selectedDate && lastPeriodStart && (
              <View
                style={{
                  padding: 20,
                  borderRadius: 16,
                  borderCurve: "continuous",
                  backgroundColor: AC.systemPink,
                  gap: 8,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
                  Today's Cycle Info
                </Text>
                {(() => {
                  const todayInfo = getCyclePhase(lastPeriodStart);
                  return (
                    <>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        Day {todayInfo.dayInCycle} - {getPhaseName(todayInfo.phase)} Phase
                      </Text>
                      <Text style={{ fontSize: 14, color: "white", opacity: 0.9 }}>
                        {todayInfo.daysUntilNextPeriod} days until next period
                      </Text>
                    </>
                  );
                })()}
              </View>
            )}
          </>
        ) : (
          <View
            style={{
              padding: 30,
              borderRadius: 16,
              borderCurve: "continuous",
              backgroundColor: AC.secondarySystemBackground,
              alignItems: "center",
              gap: 12,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600", color: AC.label }}>
              No Cycle Data
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: AC.secondaryLabel,
                textAlign: "center",
                lineHeight: 22,
              }}
            >
              Visit the Profile tab to enter your last period start date and begin tracking
              your cycle.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
