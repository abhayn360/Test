import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import RootLayout from '../Layout/Rootlayout'
import { Icon } from 'react-native-elements'
import axios from 'axios'
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import CustomInput from '../Custominput'
import { useNavigation } from '@react-navigation/native'

const Dashboard = ({ route }) => {
  const [user, setUser] = useState(null);
  const [tag, settag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasNfc, setHasNFC] = useState(null);
  const navigation = useNavigation()

  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported()

      setHasNFC(deviceIsSupported)
      if (deviceIsSupported) {
        await NfcManager.start()
      }
    }

    checkIsSupported()
  }, [])


  const baseUrl = "https://wispper.vercel.app/api/v0"

  useEffect(() => {
    axios
      .get(`${baseUrl}/users/${route?.params?.userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [route?.params?.userId]);

  const AddTag = () => {
    if (!tag) {
      ToastAndroid.show("Please enter a tag.", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);

    axios.post(`${baseUrl}/tags`, {
      tag_id: tag,
    })
      .then((response) => {
        ToastAndroid.show('Tag added successfully.', ToastAndroid.SHORT);
        settag('');
      })
      .catch((err) => {
        console.log('error', err);
        ToastAndroid.show(err.response ? err.response.data.message : "An error occurred", ToastAndroid.SHORT);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  NfcManager.start();

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn('Tag found', tag);
      settag(tag)
      if (tag) {
        AddTag()

      }
    } catch (ex) {
      console.warn('Oops!', ex);
      ToastAndroid.show('Oops!,Tag not found', ToastAndroid.SHORT);

    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }
  if (hasNfc === null) return null;

  // if (!hasNfc) {
  //   return (
  //     <View style={styles.sectionContainer}>
  //       <Text>NFC not supported</Text>
  //     </View>
  //   )
  // }
  return (
    <RootLayout>
      <View style={styles.container}>
        <View style={{ marginTop: '4%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image source={{ uri: "https://randomuser.me/api/portraits/men/86.jpg" }}
            style={{ height: 40, width: 40, borderRadius: 60 }}
            resizeMode='contain'
          />

          <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Bold', color: '#000', flex: 1, }}> Home </Text>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Icon
              type='material-community'
              name='logout'
              size={23}
            />
          </TouchableOpacity>

        </View>
        <Text style={{ fontFamily: 'Poppins-Bold', color: '#000', marginTop: 20 }}>User info</Text>
        <View style={{ backgroundColor: '#e5e5e580', padding: 10, borderRadius: 10 }}>
          <Text>{user?.email}</Text>
          <Text>{user?.tag}</Text>
        </View>

        <View style={styles.wrapper}>
          <Text style={{ fontFamily: 'Poppins-Bold', color: '#000', marginTop: 20, textAlign: 'center' }}>Link your tags..</Text>


        </View>

        <CustomInput
          labelText="Tag Id"
          value={tag}
          onChangeText={settag}
          placeholder="Enter your Id manually.."
          keyboardType="email-address"
          iconName="tag-multiple-outline"
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
        {!hasNfc?
        <Text style={{}}>NFC not supported</Text>
      :
      <TouchableOpacity onPress={readNdef} style={{ backgroundColor: '#424242', borderRadius: 5, padding: 15 }}>
      <Text style={{ color: '#fff' }}>Scan a Tag</Text>
    </TouchableOpacity>
      }
        
          <TouchableOpacity onPress={AddTag} style={{ backgroundColor: '#424242', borderRadius: 5, padding: 15 }}>
            <Text style={{ color: '#fff' }}>Add Tag</Text>
          </TouchableOpacity>
        </View>


      </View>


    </RootLayout>
  )
}

export default Dashboard

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: '4%',
    marginBottom: '4%'
  },
  wrapper: {
    marginTop: 10
  }
})