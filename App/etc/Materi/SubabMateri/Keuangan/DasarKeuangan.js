import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { reactMateriKeuangan } from './MateriKeuangan';

const DasarKeuangan = ({ navigation }) => {
  const [currentMateriIndex, setCurrentMateriIndex] = useState(0);

  const handleNext = () => {
    if (currentMateriIndex === reactMateriKeuangan.length - 1) {
      navigation.navigate("Keuangan");
    } else {
      setCurrentMateriIndex(currentMateriIndex + 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={tw`p-4`}>
        <View style={tw`mb-10`}>
          <Text style={tw`text-xl font-extrabold text-center mb-2`}>
            Dasar Laporan Keuangan
          </Text>
          <Text style={tw`text-lg font-bold text-center mb-4`}>
            {reactMateriKeuangan[currentMateriIndex].Judul}
          </Text>
        </View>
        <View style={tw`mb-4`}>
          <Text style={tw`text-base leading-6`}>
            {reactMateriKeuangan[currentMateriIndex].subJudul}
          </Text>
        </View>
        <View style={tw`mb-4`}>
          {reactMateriKeuangan[currentMateriIndex].Poin.map((poin, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.listText}>{poin}</Text>
            </View>
          ))}
        </View>
        <Pressable
          style={tw`bg-red-500 p-4 rounded-md mt-6`} // Mengubah warna menjadi merah
          onPress={handleNext}
        >
          <Text style={tw`text-white text-lg text-center`}>
            {currentMateriIndex === reactMateriKeuangan.length - 1 ? "Finish" : "Next"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default DasarKeuangan;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  bulletPoint: {
    fontSize: 18,
    lineHeight: 22,
    marginRight: 8,
  },
  listText: {
    flexShrink: 1,
    fontSize: 14,
    lineHeight: 22,
  },
});
