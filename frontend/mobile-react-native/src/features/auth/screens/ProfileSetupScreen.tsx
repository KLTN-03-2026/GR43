import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../../store/authStore';
import Svg, { Path } from 'react-native-svg';

export default function ProfileSetupScreen() {
  const { user, accessToken, setProfileStatus, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);

  // Form states
  const [displayName, setDisplayName] = useState('');
  const [dob, setDob] = useState(''); // YYYY-MM-DD
  const [gender, setGender] = useState('Male');
  const [languages, setLanguages] = useState<string[]>(['Vietnamese']);

  const handleComplete = async () => {
    if (!displayName || !dob) {
      Alert.alert('Missing Info', 'Please provide your name and date of birth.');
      return;
    }

    // Basic date validation
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      Alert.alert('Invalid Date', 'Please use YYYY-MM-DD format.');
      return;
    }

    try {
      setLoading(true);
      const API_URL = `${
        process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:5017'
      }/api/v1/profile/setup`;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          displayName,
          dob: new Date(dob).toISOString(),
          gender,
          languages,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Profile completed!');
        setProfileStatus(true);
      } else {
        throw new Error(result.message || 'Failed to update profile');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Bắt đầu nào!</Text>
          <Text style={styles.subtitle}>
            Hãy cho chúng tôi biết một chút về bạn để bắt đầu kết nối.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tên hiển thị</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên của bạn"
              value={displayName}
              onChangeText={setDisplayName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ngày sinh (YYYY-MM-DD)</Text>
            <TextInput
              style={styles.input}
              placeholder="1995-12-23"
              value={dob}
              onChangeText={setDob}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Giới tính</Text>
            <View style={styles.genderContainer}>
              {['Male', 'Female', 'Other'].map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[
                    styles.genderButton,
                    gender === g && styles.genderButtonActive,
                  ]}
                  onPress={() => setGender(g)}
                >
                  <Text
                    style={[
                      styles.genderText,
                      gender === g && styles.genderTextActive,
                    ]}
                  >
                    {g === 'Male' ? 'Nam' : g === 'Female' ? 'Nữ' : 'Khác'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleComplete}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Hoàn thành</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 24,
    flexGrow: 1,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    height: 56,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#F9FAF6',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  genderButtonActive: {
    borderColor: '#F43F5E',
    backgroundColor: '#FFF1F2',
  },
  genderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  genderTextActive: {
    color: '#F43F5E',
  },
  footer: {
    marginTop: 40,
    gap: 16,
  },
  button: {
    height: 58,
    backgroundColor: '#F43F5E',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F43F5E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  logoutButton: {
    padding: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '500',
  },
});
