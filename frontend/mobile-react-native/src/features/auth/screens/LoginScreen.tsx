import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResponseType } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as GoogleAuth from 'expo-auth-session/providers/google';
// removed unused NativeModules and duplicate useEffect import
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import { RootStackParamList } from "../../../app/navigation/RootNavigator";

// Use web-based OAuth (expo-auth-session) so Google Sign-In works in Expo Go.
WebBrowser.maybeCompleteAuthSession();

const LogoGradientWave = () => (
  <Svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    <Defs>
      <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#F97316" />
        <Stop offset="50%" stopColor="#E11D48" />
        <Stop offset="100%" stopColor="#7C3AED" />
      </LinearGradient>
    </Defs>
    <Path
      d="M50 10C27.9 10 10 27.9 10 50c0 14.5 7.8 27.3 19.5 34.6 2.5-8.5 7-16.1 13-22.1-13-8.5-16.5-23-9-34 9 1 18.5 7.5 22.5 16.5 5-6 10-9.5 16-10.5 4-5 13-7.5 13-7.5C76 16.5 64 10 50 10zM63.5 35.5c-4.5 1.5-8.5 6-12 12.5-4.5 8.5-4.5 19.5 0 28.5C65.5 83.5 81 77 87.5 62c4.5-10.5 2.5-22.5-5-30-2.5-1.5-12.5 2-19 3.5z"
      fill="url(#grad)"
    />
  </Svg>
);

const GoogleIcon = () => (
  <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <Path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <Path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <Path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z"
      fill="#FBBC05"
    />
    <Path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </Svg>
);

export const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = React.useState(false);
  const [googleAvailable, setGoogleAvailable] = React.useState<boolean | null>(null);
  const googleWebClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID?.trim() || '792593212502-636i3fh12fe1m5makdjar4mvg6ufrcm8.apps.googleusercontent.com';
  const redirectUri = 'https://auth.expo.io/@tranvanhuy16032004/datn-2026';

  // Configure web-based Google OAuth request using expo-auth-session
  const [request, response, promptAsync] = GoogleAuth.useAuthRequest({
    clientId: googleWebClientId,
    webClientId: googleWebClientId,
    responseType: ResponseType.IdToken,
    shouldAutoExchangeCode: false,
    redirectUri,
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    // mark that web-based auth is available when request is created
    setGoogleAvailable(!!request);
  }, [request]);

  useEffect(() => {
    (async () => {
      if (response?.type === 'success') {
        setLoading(true);
        // id_token is returned in response.params.id_token
        const idToken = (response as any).params?.id_token ?? (response as any).authentication?.idToken;
        if (!idToken) {
          setLoading(false);
          Alert.alert('Lỗi Đăng Nhập', 'Không nhận được idToken từ Google');
          return;
        }
        try {
          console.log('📨 [Google] idToken nhận được, gửi tới Backend...');
          await handleBackendLogin(idToken);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      } else if (response?.type === 'error') {
        console.warn('Google auth error', response);
        Alert.alert('Lỗi Đăng Nhập', 'Không thể đăng nhập bằng Google');
      }
    })();
  }, [response]);

  const handleBackendLogin = async (idToken: string) => {
    try {
      // Đổi URL để test local hoặc production
      // iOS Simulator chạy trên cùng Mac → dùng localhost trực tiếp
      const API_URL = `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/auth/google-login`;
      // Cấu hình API_BASE_URL trong file .env
      console.log("📡 [API] Gửi request tới:", API_URL);
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();
      console.log("📡 [API] Response:", JSON.stringify(data, null, 2));

      if (res.ok && data.data?.accessToken) {
        await AsyncStorage.setItem("accessToken", data.data.accessToken);
        await AsyncStorage.setItem("refreshToken", data.data.refreshToken);
        console.log("✅ [API] Đăng nhập thành công! Điều hướng về Home...");
        navigation.replace("Home");
      } else {
        Alert.alert("Lỗi", data.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("❌ [API] Network error:", error);
      Alert.alert(
        "Lỗi Kết Nối",
        "Không thể kết nối đến Server. Kiểm tra IP và cổng Backend.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <LogoGradientWave />
        </View>

        <Text style={styles.title}>Sign up to continue</Text>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() =>
            Alert.alert(
              "Thông báo",
              "Tính năng đăng nhập bằng Email đang phát triển",
            )
          }
        >
          <Text style={styles.primaryBtnText}>Continue with email</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or sign up with</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={[styles.socialBtn, loading && styles.socialBtnDisabled]}
            disabled={loading || !googleAvailable}
            onPress={async () => {
              try {
                console.log('[GoogleAuth][feature/login] request=', request);
                if (!request) {
                  Alert.alert('Unavailable', 'Google auth request is not ready.');
                  return;
                }
                const redirectOk = request.redirectUri === 'https://auth.expo.io/@tranvanhuy16032004/datn-2026';
                const responseTypeOk = request.responseType === 'id_token';
                if (!redirectOk || !responseTypeOk) {
                  Alert.alert('Google Config Error', 'Bundle đang dùng config cũ. Hãy restart bằng `npx expo start -c` rồi thử lại.');
                  console.warn('[GoogleAuth][feature/login] blocked invalid request config', {
                    redirectUri: request.redirectUri,
                    responseType: request.responseType,
                  });
                  return;
                }
                const result = await promptAsync();
                console.log('[GoogleAuth][feature/login] promptAsync result:', result);
                if (result?.type === 'dismiss' || result?.type === 'cancel') {
                  // user cancelled
                  return;
                }
              } catch (e) {
                console.error('Error launching Google auth:', e);
                Alert.alert('Lỗi', 'Không thể mở Google Sign-In.');
              }
            }}
          >
            {loading ? <ActivityIndicator color="#4285F4" /> : <GoogleIcon />}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Terms of use</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 60 : 80,
  },
  logoContainer: { marginBottom: 40 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 30,
  },
  primaryBtn: {
    width: "100%",
    backgroundColor: "#EF4444",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  primaryBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
  },
  line: { flex: 1, height: 1, backgroundColor: "#E5E7EB" },
  orText: { paddingHorizontal: 16, color: "#374151", fontSize: 14 },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  socialBtn: {
    width: 72,
    height: 72,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  socialBtnDisabled: { opacity: 0.5 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    width: "100%",
  },
  footerLink: { color: "#EF4444", fontSize: 14, fontWeight: "500" },
});
