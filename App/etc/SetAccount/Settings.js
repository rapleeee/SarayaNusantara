import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Settings() {    
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Account Settings</Text>
      </View>
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("ChangePassword")}>
          <Text style={styles.optionText}>Change Password</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("ChangeProfilePicture")}>
          <Text style={styles.optionText}>Change Profile Picture</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'darkred',
    paddingVertical: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionContainer: {
    flex: 1,
    margin: 20,
    marginTop: 170,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  optionText: {
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
  },
});
