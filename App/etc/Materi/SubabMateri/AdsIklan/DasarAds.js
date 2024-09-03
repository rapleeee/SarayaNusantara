import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { reactMateriAds } from './MateriAds';

const DasarAds = ({ navigation }) => {
  const [currentMateriIndex, setCurrentMateriIndex] = useState(0);

  const handleNext = () => {
    if (currentMateriIndex === reactMateriAds.length - 1) {
      navigation.navigate("ads"); // Pastikan nama rute benar
    } else {
      setCurrentMateriIndex(currentMateriIndex + 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View>
        <View style={tw`mt-20 p-4`}>
          <Text style={tw`text-xl font-extrabold mb-10`}>
            Dasar Iklan
          </Text>
          <Text style={tw`text-l font-bold mb-4`}>
            {reactMateriAds[currentMateriIndex].Judul}
          </Text>
          <Text style={tw`mb-4`}>
            {reactMateriAds[currentMateriIndex].subJudul}
          </Text>
          {reactMateriAds[currentMateriIndex].Poin.map((poin, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listText}>{poin}</Text>
            </View>
          ))}
          <Pressable
            style={tw`bg-purple-500 p-4 rounded-md mt-6`}
            onPress={handleNext}
          >
            <Text style={tw`text-white text-l text-center`}>
              {currentMateriIndex === reactMateriAds.length - 1 ? "Finish" : "Next"}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DasarAds;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  listText: {
    fontSize: 12,
    lineHeight: 22,
  },
});
