import { ScrollView, Text, View, Pressable, TextInput, Platform } from "react-native";
import { useState, useEffect } from "react";
import * as AC from "@bacons/apple-colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}
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
              <TextInput
                style={{
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: AC.tertiarySystemBackground,
                  color: AC.label,
                  fontSize: 16,
                }}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={AC.placeholderText}
                value={profile.birthDate}
                onChangeText={(text) => setProfile({ ...profile, birthDate: text })}
              />
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
              <TextInput
                style={{
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: AC.tertiarySystemBackground,
                  color: AC.label,
                  fontSize: 16,
                }}
                placeholder="HH:MM (24-hour format)"
                placeholderTextColor={AC.placeholderText}
                value={profile.birthTime}
                onChangeText={(text) => setProfile({ ...profile, birthTime: text })}
              />
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
                keyboardType="numeric"
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
                keyboardType="numeric"
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
              <TextInput
                style={{
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: AC.tertiarySystemBackground,
                  color: AC.label,
                  fontSize: 16,
                }}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={AC.placeholderText}
                value={profile.lastPeriodStart}
                onChangeText={(text) =>
                  setProfile({ ...profile, lastPeriodStart: text })
                }
              />
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
  );
}
