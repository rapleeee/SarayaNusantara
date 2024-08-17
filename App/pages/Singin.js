import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  Alert, 
  Pressable 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackHandler } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScoreDetail from '../etc/Kuis/ScoreDetail';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemembered, setIsRemembered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  useEffect(() => {
    setLoading(true);

    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.replace("MainApp");
      }
    });

    const loadCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('userEmail');
        const savedPassword = await AsyncStorage.getItem('userPassword');
        if (savedEmail !== null && savedPassword !== null) {
          setEmail(savedEmail);
          setPassword(savedPassword);
          setIsRemembered(true);
        }
      } catch (error) {
        console.log('Failed to load credentials', error);
      }
    };

    loadCredentials();

    return () => {
      backHandler.remove();
      unsubscribe();
    };
  }, [navigation]);

  const saveCredentials = async (email, password) => {
    try {
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password);
    } catch (error) {
      console.log('Failed to save credentials', error);
    }
  };

  const removeCredentials = async () => {
    try {
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('userPassword');
    } catch (error) {
      console.log('Failed to remove credentials', error);
    }
  };

  const login = async () => {
    if (email === "" || password === "") {
      Alert.alert(
        "Yakin mau login?",
        "Kamu udah masukin Email apa Passwordnya?",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (isRemembered) {
        saveCredentials(email, password);
      } else {
        removeCredentials();
      }

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role;

        if (userRole === "admin") {
          navigation.replace("adminPanel");
        } else if (userRole === "user") {
          navigation.replace("MainApp");
        } else {
          console.log("Unknown user role:", userRole);
        }
      } else {
        console.log("No such document!");
        Alert.alert("Error", "User data not found.");
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        Alert.alert("Error", "Account not found.", [{ text: "OK" }]);
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Error", "Wrong password. Please try again.", [{ text: "OK" }]);
      } else {
        Alert.alert("Error", error.message, [{ text: "OK" }]);
      }
    }
  };

  const resetPassword = () => {
    if (email === "") {
      Alert.alert("Error", "Please enter your email address.", [{ text: "OK" }]);
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Success", "Password reset email sent.", [{ text: "OK" }]);
      })
      .catch((error) => {
        Alert.alert("Error", error.message, [{ text: "OK" }]);
      });
  };

  const toggleRememberMe = () => {
    setIsRemembered(!isRemembered);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffff" }}>
      <ScrollView>
        <StatusBar />
        <Image source={require('./../assets/SignUpPage/Rectangle7.png')} />
        <Image 
          source={require('./../assets/SignUpPage/Group108.png')} 
          style={styles.logoImage}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.h1}>Let's Sign In</Text>
          <Text style={styles.h2}>Masuk ke Akun Anda</Text>
        </View>
        <TextInput
          style={styles.input1}
          value={email}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          autoFocus
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input2}
            value={password}
            placeholder="Password"
            secureTextEntry={secureTextEntry}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
            <Ionicons
              name={secureTextEntry ? 'eye-off' : 'eye'}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.rememberMeForgotContainer}>
          <View style={styles.rememberMeContainer}>
            <TouchableOpacity onPress={toggleRememberMe}>
              <Ionicons
                name={isRemembered ? 'checkbox' : 'checkbox-outline'}
                size={18}
                color="#BB1624"
              />
            </TouchableOpacity>
            <Text style={styles.rememberMeText}>Ingat Saya</Text>
          </View>
          <TouchableOpacity onPress={resetPassword}>
            <Text style={styles.forgotText}>Lupa Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Masuk</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <Text style={styles.orText}>atau</Text>
          <Pressable style={styles.googleButton} onPress={ScoreDetail}>
            <Image
              source={require('./../assets/google-logo.webp')}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Masuk dengan Google</Text>
          </Pressable>
        </View>
        <View style={styles.signupContainer}>
          <Text>Belum punya akun? </Text>
          <Text
            style={styles.signupText}
            onPress={() => navigation.navigate("signup")}
          >
            Daftar
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  h1: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 35,
    color: '#6D6A6D',
    marginBottom: 50
  },
  h2: {
    marginTop: 1,
    fontSize: 15,
    color: '#6D6A6D',
    marginLeft: -140
  },
  logoImage: {
    height: 100, 
    width: 100, 
    marginLeft: 150, 
    marginTop: -50
  },
  headerContainer: {
    alignItems: 'center'
  },
  input1: {
    marginHorizontal: 65,
    marginTop: 10,
    width: '70%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 10,
    
  },
  input2: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 10,
  },
  icon: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 65,
    marginTop: 10,
    width: '70%',
  },
  rememberMeForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 65,
    marginTop: 5,
    width: '70%',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    fontSize: 13,
    marginLeft: 5,
    color: '#6D6A6D',
  },
  forgotText: {
    fontSize: 13,
    color: '#265CBF',
  },
  button: {
    backgroundColor: '#BB1624',
    height: 50,
    marginHorizontal: 65,
    marginTop: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
  },
  orContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  orText: {
    color: '#808080',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 65,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#6D6A6D',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleIcon: {
    width: 20, 
    height: 20, 
    marginRight: 10
  },
  googleButtonText: {
    color: '#6D6A6D',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  signupText: {
    color: '#265CBF',
  },
});
