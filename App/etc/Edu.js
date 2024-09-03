import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

const Edu = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.logoContainer}>
        <Image
          source={require("./../assets/Logo.png")}
          style={styles.logo}
          accessible={true}
          accessibilityLabel="Logo"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.headerText}>Materi Edukasi</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            <Text style={styles.boldText}>
              Didalam materi edukasi ini
            </Text>{" "}
            akan berisi beberapa materi yang sangat berguna di lapangan. Materi yang ada sudah dikurasi dengan cermat sehingga mendapatkan poin-poin utama dalam menjalankan sebuah bisnis berskala kecil hingga menengah. Pada materi edukasi terdapat materi dan latihan soal yang berguna untuk menambah wawasan dan pengetahuan mulai dari mengelola laporan keuangan, hingga menggunakan ads/iklan di sosial media.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Ensure the background color is white
  },
  logoContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  logo: {
    height: 30,
    width: 30,
  },
  content: {
    flex: 1,
    marginTop: 50, // Ensure content isn't hidden behind the logo
    paddingHorizontal: 20, // Consistent horizontal padding
  },
  headerText: {
    color: '#7D0A0A',
    fontWeight: '500',
    fontSize: 20,
    marginBottom: 20, // Add spacing below the header
  },
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default Edu;
