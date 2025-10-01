import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Video } from 'expo-av';

export default function HomeScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  const data = ['Elemento 1', 'Elemento 2', 'Elemento 3'];

  const sections = [
    { title: 'Sección A', data: ['A1', 'A2', 'A3'] },
    { title: 'Sección B', data: ['B1', 'B2'] },
  ];

  return (
    <ParallaxScrollView
      style={{ width: '200%', height: '100%', resizeMode: 'cover' }}
      headerBackgroundColor={{ light: '#f0f4ff', dark: '#1a1a1a' }}
      headerImage={
        <Image source={require('../../assets/images/icon.png')} />
      }
    >
      <ScrollView style={styles.container}>
        
        <Text style={styles.title}>reac native punto 2</Text>

  
<View style={styles.card}>
  <Image
    source={require('../../assets/images/pan.jpg')}
    style={styles.image}
  />
  <Text style={styles.cardText}>🥖🥖Un pan🥖🥖</Text>
</View>


       
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Escribe algo:</Text>
          <TextInput
            placeholder=" texto "
            value={inputValue}
            onChangeText={setInputValue}
            style={styles.input}
          />
          <Text style={styles.cardText}>texto ingresado: {inputValue}</Text>
        </View>

       
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Botón:</Text>
          <Button title="Presióname" onPress={() => alert('¡Botón🥖!')} />
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => alert('Touchable presionado!')}
          >
            <Text style={styles.touchableText}> TouchableOpacity</Text>
          </TouchableOpacity>
        </View>

      
        <View style={styles.cardRow}>
          <Text style={styles.sectionTitle}>Switch:</Text>
          <Switch value={isEnabled} onValueChange={toggleSwitch} />
        </View>

       
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Cargando:</Text>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>

     
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>lFlatList:</Text>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.listItem}>• {item}</Text>}
          />
        </View>

   
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>SectionList:</Text>
          <SectionList
            sections={sections}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
          />
        </View>

    
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Video:</Text>
          <Video
            source={{ uri: 'https://www.youtube.com/watch?v=OSNGVw__dEs&list=RDOSNGVw__dEs&start_radio=1' }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        </View>
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#eef3f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardText: {
    marginTop: 8,
    fontSize: 16,
    color: '#444',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#007AFF',
  },
  image: {
    width: 250,
    height: 160,
    borderRadius: 12,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '100%',
  },
  touchable: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  touchableText: {
    color: 'white',
    fontWeight: '600',
  },
  listItem: {
    fontSize: 16,
    paddingVertical: 4,
    color: '#333',
  },
  sectionHeader: {
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginTop: 10,
    borderRadius: 6,
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#000',
  },
});
