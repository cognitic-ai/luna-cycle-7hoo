import { ScrollView, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as AC from "@bacons/apple-colors";

const ZODIAC_SIGNS = [
  { name: "Aries", dates: "Mar 21 - Apr 19", symbol: "♈", element: "Fire" },
  { name: "Taurus", dates: "Apr 20 - May 20", symbol: "♉", element: "Earth" },
  { name: "Gemini", dates: "May 21 - Jun 20", symbol: "♊", element: "Air" },
  { name: "Cancer", dates: "Jun 21 - Jul 22", symbol: "♋", element: "Water" },
  { name: "Leo", dates: "Jul 23 - Aug 22", symbol: "♌", element: "Fire" },
  { name: "Virgo", dates: "Aug 23 - Sep 22", symbol: "♍", element: "Earth" },
  { name: "Libra", dates: "Sep 23 - Oct 22", symbol: "♎", element: "Air" },
  { name: "Scorpio", dates: "Oct 23 - Nov 21", symbol: "♏", element: "Water" },
  { name: "Sagittarius", dates: "Nov 22 - Dec 21", symbol: "♐", element: "Fire" },
  { name: "Capricorn", dates: "Dec 22 - Jan 19", symbol: "♑", element: "Earth" },
  { name: "Aquarius", dates: "Jan 20 - Feb 18", symbol: "♒", element: "Air" },
  { name: "Pisces", dates: "Feb 19 - Mar 20", symbol: "♓", element: "Water" },
];

const MOON_PHASES = [
  { phase: "New Moon", emoji: "🌑", description: "New beginnings, fresh starts" },
  { phase: "Waxing Crescent", emoji: "🌒", description: "Setting intentions, growth" },
  { phase: "First Quarter", emoji: "🌓", description: "Taking action, decision making" },
  { phase: "Waxing Gibbous", emoji: "🌔", description: "Refinement, patience" },
  { phase: "Full Moon", emoji: "🌕", description: "Release, manifestation" },
  { phase: "Waning Gibbous", emoji: "🌖", description: "Gratitude, sharing wisdom" },
  { phase: "Last Quarter", emoji: "🌗", description: "Letting go, forgiveness" },
  { phase: "Waning Crescent", emoji: "🌘", description: "Rest, reflection, surrender" },
];

function getMoonPhase(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let c = 0;
  let e = 0;
  let jd = 0;
  let b = 0;

  if (month < 3) {
    const year2 = year - 1;
    const month2 = month + 12;
  }

  c = 365.25 * year;
  e = 30.6 * month;
  jd = c + e + day - 694039.09;
  jd /= 29.5305882;
  b = Math.floor(jd);
  jd -= b;
  b = Math.round(jd * 8);

  if (b >= 8) {
    b = 0;
  }

  return MOON_PHASES[b];
}

function getCurrentZodiacSign(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return ZODIAC_SIGNS[0];
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return ZODIAC_SIGNS[1];
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return ZODIAC_SIGNS[2];
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return ZODIAC_SIGNS[3];
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return ZODIAC_SIGNS[4];
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return ZODIAC_SIGNS[5];
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return ZODIAC_SIGNS[6];
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return ZODIAC_SIGNS[7];
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return ZODIAC_SIGNS[8];
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return ZODIAC_SIGNS[9];
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return ZODIAC_SIGNS[10];
  return ZODIAC_SIGNS[11];
}

export default function InfoRoute() {
  const [currentDate] = useState(new Date());
  const [moonPhase, setMoonPhase] = useState(getMoonPhase(currentDate));
  const [zodiacSign, setZodiacSign] = useState(getCurrentZodiacSign(currentDate));

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        flex: 1,
      }}
    >
      <View style={{ padding: 20, gap: 32 }}>
        {/* Current Date */}
        <View
          style={{
            padding: 20,
            borderRadius: 20,
            borderCurve: "continuous",
            backgroundColor: AC.secondarySystemBackground,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 28, fontWeight: "700", color: AC.label }}>
            {currentDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        {/* Current Zodiac Sign */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: AC.label }}>
            Current Sun Sign
          </Text>
          <View
            style={{
              padding: 24,
              borderRadius: 20,
              borderCurve: "continuous",
              backgroundColor: AC.systemPurple,
              gap: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 32, fontWeight: "700", color: "white" }}>
                  {zodiacSign.name}
                </Text>
                <Text style={{ fontSize: 14, color: "white", opacity: 0.9 }}>
                  {zodiacSign.dates}
                </Text>
              </View>
              <Text style={{ fontSize: 64 }}>{zodiacSign.symbol}</Text>
            </View>
            <View
              style={{
                paddingTop: 12,
                borderTopWidth: 1,
                borderTopColor: "rgba(255,255,255,0.2)",
              }}
            >
              <Text style={{ fontSize: 14, color: "white", opacity: 0.9 }}>
                Element: {zodiacSign.element}
              </Text>
            </View>
          </View>
        </View>

        {/* Moon Phase */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: AC.label }}>
            Current Moon Phase
          </Text>
          <View
            style={{
              padding: 24,
              borderRadius: 20,
              borderCurve: "continuous",
              backgroundColor: AC.systemIndigo,
              gap: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 72 }}>{moonPhase.emoji}</Text>
            <Text style={{ fontSize: 24, fontWeight: "700", color: "white" }}>
              {moonPhase.phase}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "white",
                opacity: 0.9,
                textAlign: "center",
                marginTop: 4,
              }}
            >
              {moonPhase.description}
            </Text>
          </View>
        </View>

        {/* Cycle Tracking Suggestion */}
        <View
          style={{
            padding: 20,
            borderRadius: 16,
            borderCurve: "continuous",
            backgroundColor: AC.systemPink,
            gap: 8,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
            💫 Cosmic Insight
          </Text>
          <Text style={{ fontSize: 14, color: "white", opacity: 0.95, lineHeight: 20 }}>
            The moon phase can influence your hormonal cycle. Many people notice changes
            in mood and energy that align with lunar cycles.
          </Text>
        </View>

        {/* All Zodiac Signs */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: AC.label }}>
            All Zodiac Signs
          </Text>
          <View style={{ gap: 10 }}>
            {ZODIAC_SIGNS.map((sign) => (
              <View
                key={sign.name}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 16,
                  borderRadius: 14,
                  borderCurve: "continuous",
                  backgroundColor: AC.secondarySystemBackground,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <Text style={{ fontSize: 32 }}>{sign.symbol}</Text>
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: "600", color: AC.label }}>
                      {sign.name}
                    </Text>
                    <Text style={{ fontSize: 12, color: AC.secondaryLabel }}>
                      {sign.dates}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    color: AC.secondaryLabel,
                    fontWeight: "500",
                  }}
                >
                  {sign.element}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
