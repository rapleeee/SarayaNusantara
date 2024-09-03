import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Pressable, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Ionicons } from 'react-native-vector-icons';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const register = async () => {
    if (fullname === "" || email === "" || password === "" || phoneNumber === "") {
      Alert.alert("Invalid Details", "Please fill all the details");
    } else {
      if (password.length < 6) {
        Alert.alert("Invalid Password", "Password should be at least 6 characters long");
      } else {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          const myUserUid = user.uid;

          await setDoc(doc(db, "users", myUserUid), {
            fullname: fullname,
            email: email,
            phoneNumber: phoneNumber,
            scores: {},
            role: 'user'
          });

          console.log("User data saved successfully");
          navigation.replace("MainApp");
        } catch (error) {
          Alert.alert("Registration Failed", error.message);
        }
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '<YOUR_ANDROID_CLIENT_ID>',
        iosClientId: '<YOUR_IOS_CLIENT_ID>',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        const { idToken, accessToken } = result;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        const userCredential = await signInWithCredential(auth, credential);
        const user = userCredential.user;
        
        if (userCredential.additionalUserInfo.isNewUser) {
          await setDoc(doc(db, 'users', user.uid), {
            fullname: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber || '',
            role: 'user',
          });
        }

        navigation.replace('MainApp');
      } else {
        return { cancelled: true };
      }
    } catch (error) {
      Alert.alert("Google Sign-In Error", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffff" }}>
      <ScrollView>
        <StatusBar />
        <KeyboardAvoidingView>
          <Image source={require("./../assets/SignUpPage/Rectangle7.png")} />
          <Image
            source={require("./../assets/SignUpPage/Group108.png")}
            style={{ height: 100, width: 100, marginLeft: 150, marginTop: -50 }}
          />
          <View>
            <Text style={styles.h1}>Sign Up</Text>
          </View>

          <Text style={styles.h2}>Daftar akun Anda</Text>
          <View style={styles.shadow}>
            <TextInput
              style={styles.input1}
              placeholder="Nama Lengkap"
              onChangeText={(text) => setFullname(text)}
              autoFocus
            />
          </View>
            <TextInput
              style={styles.input1}
              placeholder="Alamat Email"
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              style={styles.input1}
              placeholder="Nomor Handphone"
              onChangeText={(text) => setPhoneNumber(text)}
            />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input2}
              placeholder="Password"
              secureTextEntry={secureTextEntry}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.icon}
            >
              <Ionicons
                name={secureTextEntry ? "eye-off" : "eye"}
                size={24}
                color="darkgrey"
              />
            </TouchableOpacity>
          </View>
          <Pressable style={styles.button} onPress={register}>
            <Text style={{ color: "#ffff" }}>Daftar</Text>
          </Pressable>

          <View>
            <Text style={{ marginLeft:195, color:'#6D6A6D', marginTop:10}}>atau</Text>
            <Pressable style={styles.googleButton} onPress={signInWithGoogle}>
              <Image
                source={require('./../assets/google-logo.webp')}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Masuk dengan Google</Text>
            </Pressable>
          </View> 
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              marginHorizontal: 125,
            }}
          >
            <Text>Sudah punya akun?</Text>
            <Text
              style={{  color: "#265CBF", marginLeft:5 }}
              onPress={() => navigation.navigate("signin")}
            >
               Masuk
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Signup;

const styles = StyleSheet.create({
  h1: {
    textAlign: 'center',
    fontSize: 35,
    color: '#6D6A6D',
    marginBottom: 40
  },
  h2: {
    marginTop: 1,
    marginLeft: 65,
    fontSize: 20,
    color: '#6D6A6D',
    marginBottom: 10
  },
  button: {
    backgroundColor: '#BB1624',
    padding: 12,
    marginTop: 30,
    marginHorizontal: 70,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  othertext: {
    textAlign: 'center',
    color: 'grey'
  },
  input1: {
    marginHorizontal: 65,
    marginTop: 5,
    width: '70%',
    height: 40,
    borderColor: 'darkgrey',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 10,
  },
  input2: {
    marginHorizontal: 65,
    marginTop: 5,
    width: '70%',
    height: 40,
    borderColor: 'darkgrey',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 10,
  },
  icon: {
    marginLeft: -100,
    justifyContent: 'center',
    marginTop: -5
  },
  passwordContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: 'darkgrey',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginHorizontal: 70,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#6D6A6D',
    fontSize: 16,
  },
});
