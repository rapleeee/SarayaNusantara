import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from "twrnc";

const ScoreLaporanKeuangan = ({ route, navigation }) => {
  const { score } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/Success.png")}
        style={tw.style(tw`h-3/6`, { aspectRatio: 1 })}
      />
      <Text style={tw`text-2xl font-bold mt-4`}>Congratulations Buddies!!</Text>
      <Text style={tw`font-bold text-xl mt-5`}>Your Score: {score}</Text>
      <Pressable
        style={tw`bg-red-500 p-4 rounded-md mt-6`}
        onPress={() => navigation.navigate("MainApp")}
      >
        <Text style={tw`text-white text-lg font-medium text-center`}>Go to Home</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default ScoreLaporanKeuangan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
