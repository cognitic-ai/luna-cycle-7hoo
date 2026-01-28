import { ScrollView, Text, View, Pressable, TextInput, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import * as AC from "@bacons/apple-colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

interface UserProfile {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  latitude: number;
  longitude: number;
  lastPeriodStart: string;
  cycleLength: number;
}

export default function ProfileRoute() {
  const [profile, setProfile] = useState<UserProfile>({
    birthDate: "",
    birthTime: "12:00",
    birthPlace: "",
    latitude: 0,
    longitude: 0,
    lastPeriodStart: "",
    cycleLength: 28,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);
  const [showBirthTimePicker, setShowBirthTimePicker] = useState(false);
  const [showPeriodDatePicker, setShowPeriodDatePicker] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const saved = await AsyncStorage.getItem("userProfile");
      if (saved) {
        setProfile(JSON.parse(saved));
      } else {
        setIsEditing(true);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem("userProfile", JSON.stringify(profile));
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBirthDateChange = (event: any, selectedDate?: Date) => {
    setShowBirthDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setProfile({ ...profile, birthDate: selectedDate.toISOString().split("T")[0] });
    }
  };

  const handleBirthTimeChange = (event: any, selectedTime?: Date) => {
    setShowBirthTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, "0");
      const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
      setProfile({ ...profile, birthTime: `${hours}:${minutes}` });
    }
  };

  const handlePeriodDateChange = (event: any, selectedDate?: Date) => {
    setShowPeriodDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setProfile({ ...profile, lastPeriodStart: selectedDate.toISOString().split("T")[0] });
    }
  };

  const getBirthDate = () => {
    return profile.birthDate ? new Date(profile.birthDate) : new Date();
  };

  const getBirthTime = () => {
    const [hours, minutes] = profile.birthTime.split(":");
    const date = new Date();
    date.setHours(parseInt(hours) || 12);
    date.setMinutes(parseInt(minutes) || 0);
    return date;
  };

  const getPeriodDate = () => {
    return profile.lastPeriodStart ? new Date(profile.lastPeriodStart) : new Date();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ padding: 20, gap: 24 }}>
        {/* Header */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 28, fontWeight: "700", color: AC.label }}>
            Your Profile
          </Text>
          <Text style={{ fontSize: 15, color: AC.secondaryLabel, lineHeight: 20 }}>
            Enter your birth details and cycle information for personalized insights
          </Text>
        </View>

        {/* Birth Information */}
        <View
          style={{
            padding: 20,
            borderRadius: 16,
            borderCurve: "continuous",
            backgroundColor: AC.secondarySystemBackground,
            gap: 16,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600", color: AC.label }}>
            Birth Information
          </Text>

          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: "500", color: AC.label }}>
              Birth Date
            </Text>
            {isEditing ? (
              <>
                <Pressable
                  onPress={() => setShowBirthDatePicker(true)}
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    backgroundColor: AC.tertiarySystemBackground,
                  }}
                >
                  <Text style={{ color: profile.birthDate ? AC.label : AC.placeholderText, fontSize: 16 }}>
                    {profile.birthDate ? formatDate(profile.birthDate) : "Select birth date"}
                  </Text>
                </Pressable>
                {showBirthDatePicker && (
                  <DateTimePicker
                    value={getBirthDate()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={handleBirthDateChange}
                    maximumDate={new Date()}
                  />
                )}
              </>
            ) : (
              <Text style={{ fontSize: 16, color: AC.secondaryLabel }}>
                {formatDate(profile.birthDate)}
              </Text>
            )}
          </View>

          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: "500", color: AC.label }}>
              Birth Time
            </Text>
            {isEditing ? (
              <>
                <Pressable
                  onPress={() => setShowBirthTimePicker(true)}
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    backgroundColor: AC.tertiarySystemBackground,
                  }}
                >
                  <Text style={{ color: AC.label, fontSize: 16 }}>
                    {profile.birthTime}
                  </Text>
                </Pressable>
                {showBirthTimePicker && (
                  <DateTimePicker
                    value={getBirthTime()}
                    mode="time"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={handleBirthTimeChange}
                    is24Hour={true}
                  />
                )}
              </>
            ) : (
              <Text style={{ fontSize: 16, color: AC.secondaryLabel }}>
                {profile.birthTime}
              </Text>
            )}
          </View>

          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: "500", color: AC.label }}>
              Birth Place
            </Text>
            {isEditing ? (
              <TextInput
                style={{
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: AC.tertiarySystemBackground,
                  color: AC.label,
                  fontSize: 16,
                }}
                placeholder="City, Country"
                placeholderTextColor={AC.placeholderText}
                value={profile.birthPlace}
                onChangeText={(text) => setProfile({ ...profile, birthPlace: text })}
                returnKeyType="next"
              />
            ) : (
              <Text style={{ fontSize: 16, color: AC.secondaryLabel }}>
                {profile.birthPlace || "Not set"}
              </Text>
            )}
          </View>

          {isEditing && (
            <View style={{ gap: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: AC.label }}>
                Latitude
              </Text>
              <TextInput
                style={{
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: AC.tertiarySystemBackground,
                  color: AC.label,
                  fontSize: 16,
                }}
                placeholder="e.g., 40.7128"
                placeholderTextColor={AC.placeholderText}
                value={profile.latitude.toString()}
                onChangeText={(text) =>
                  setProfile({ ...profile, latitude: parseFloat(text) || 0 })
                }
                keyboardType="decimal-pad"
                returnKeyType="next"
              />

              <Text style={{ fontSize: 14, fontWeight: "500", color: AC.label }}>
                Longitude
              </Text>
              <TextInput
                style={{
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: AC.tertiarySystemBackground,
                  color: AC.label,
                  fontSize: 16,
                }}
                placeholder="e.g., -74.0060"
                placeholderTextColor={AC.placeholderText}
                value={profile.longitude.toString()}
                onChangeText={(text) =>
                  setProfile({ ...profile, longitude: parseFloat(text) || 0 })
                }
                keyboardType="decimal-pad"
                returnKeyType="done"
              />
            </View>
          )}
        </View>

        {/* Cycle Information */}
        <View
          style={{
            padding: 20,
            borderRadius: 16,
            borderCurve: "continuous",
            backgroundColor: AC.secondarySystemBackground,
            gap: 16,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600", color: AC.label }}>
            Cycle Information
          </Text>

          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: "500", color: AC.label }}>
              Last Period Start Date
            </Text>
            {isEditing ? (
              <>
                <Pressable
                  onPress={() => setShowPeriodDatePicker(true)}
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    backgroundColor: AC.tertiarySystemBackground,
                  }}
                >
                  <Text style={{ color: profile.lastPeriodStart ? AC.label : AC.placeholderText, fontSize: 16 }}>
                    {profile.lastPeriodStart ? formatDate(profile.lastPeriodStart) : "Select last period date"}
                  </Text>
                </Pressable>
                {showPeriodDatePicker && (
                  <DateTimePicker
                    value={getPeriodDate()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={handlePeriodDateChange}
                    maximumDate={new Date()}
                  />
                )}
              </>
            ) : (
              <Text style={{ fontSize: 16, color: AC.secondaryLabel }}>
                {formatDate(profile.lastPeriodStart)}
              </Text>
            )}
          </View>

          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: "500", color: AC.label }}>
              Average Cycle Length (days)
            </Text>
            {isEditing ? (
              <TextInput
                style={{
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: AC.tertiarySystemBackground,
                  color: AC.label,
                  fontSize: 16,
                }}
                placeholder="28"
                placeholderTextColor={AC.placeholderText}
                value={profile.cycleLength.toString()}
                onChangeText={(text) =>
                  setProfile({ ...profile, cycleLength: parseInt(text) || 28 })
                }
                keyboardType="number-pad"
                returnKeyType="done"
              />
            ) : (
              <Text style={{ fontSize: 16, color: AC.secondaryLabel }}>
                {profile.cycleLength} days
              </Text>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        {isEditing ? (
          <Pressable
            onPress={saveProfile}
            style={{
              backgroundColor: AC.systemBlue,
              padding: 16,
              borderRadius: 14,
              borderCurve: "continuous",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
              Save Profile
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => setIsEditing(true)}
            style={{
              backgroundColor: AC.systemBlue,
              padding: 16,
              borderRadius: 14,
              borderCurve: "continuous",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
              Edit Profile
            </Text>
          </Pressable>
        )}

        {/* Info Note */}
        <View
          style={{
            padding: 16,
            borderRadius: 12,
            borderCurve: "continuous",
            backgroundColor: AC.systemIndigo,
          }}
        >
          <Text style={{ fontSize: 14, color: "white", lineHeight: 20 }}>
            💫 Your birth chart requires exact birth time and location for accurate
            astrological calculations. This data is stored locally on your device.
          </Text>
        </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
