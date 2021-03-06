import React, { Component } from 'react';
import {View, StyleSheet, Text, Image, Modal, TouchableOpacity , PermissionsAndroid } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Fontisto from "react-native-vector-icons/Fontisto";
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import Entypo from "react-native-vector-icons/Entypo";
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
  } from 'react-native-admob';
class ShareScreen extends Component{
    componentDidMount = ()=>{
        
        this.getPermissions();
    }
    getPermissions = async ()=>{
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: "Needs Storage Permissions",
              message:
                "Quote App Needs Storage Permissions to Share Files.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Permission Granted")
          } else {
            this.refs.toast.show('Saving Failed! Storage Permission Required.');
          }
        } catch (err) {
          console.warn(err);
        }
      }

      ShareNow = (msg)=>{
        this.refs.viewShot.capture().then(uri => {
          console.log("Image is Ready For Sharing!");
          if(msg==null){
            options = {
              title: 'Share via',
             // message: msg,
              url: "data:image/jpeg;base64,"+uri,
             // social: "whatsapp"
          };
          }
          else{
            options = {
              title: 'Share via',
              message: msg,
             // url: "data:image/png;base64,"+uri,
             // social: "whatsapp"
          };
          }
      
        Share.open(options)
        .then((res) => { console.log(res); this.goBack(); })
        
        .catch((err) => { err && console.log(err); });
      });
      
      }

      goBack = ()=>{
        this.props.navigation.goBack();
      }

    render(){
        let quote = this.props.navigation.getParam("body");
        let by = this.props.navigation.getParam("by");
        return(
            <View style={{ backgroundColor:"#1a1a1a",
            flex: 1,
            flexDirection: 'column',
            width:"100%",
            height:"70%",
           }}>
                <View style={{backgroundColor:"#1a1a1a", height:"25%", justifyContent:"center", alignItems:"center"}}>
                <AdMobBanner
                adSize="largeBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111"
                testDevices={[AdMobBanner.simulatorId]}
                onAdFailedToLoad={error => console.error(error)}
/>

                </View>
                <ViewShot ref="viewShot" options={{ result: "base64", quality: 0.9 }}>
              
            <View style={{ padding:10, backgroundColor:"#1a1a1a"}}>
             
                  <Image source={require("../assets/images/quotesIcon.png")} style={{width:50, height:50}} />
                  <Text style={{color:"white",fontFamily:"KulimPark-Light", fontSize:22, paddingHorizontal:20}} numberOfLines={8}>
                  {quote}
                 </Text>
                  <View style={{alignItems:"flex-end", marginRight:10, paddingBottom:10}}>
                      <Text style={{color:"#66ff66", paddingRight:10, fontSize:18, paddingBottom:10}}>
                        ~ {by}
                      </Text>
                  </View>
                 
                  </View>
                
                   </ViewShot>
                   <TouchableOpacity style={styles.Sharebutton} onPress={
  
                      ()=>{
                        this.ShareNow(null);
                      }
                     
                }>
                <View style={{ width:"50%"}}>
                 <Text style={styles.buttonText}>  Share as Image </Text>
                 </View>
                 <View style={{ width:"20%"}}>
                 <Icon name="share" color="white"size={25} style={{alignSelf:"center"}}/>
                 </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Sharebutton} onPress={
                    ()=>{
                      this.ShareNow(quote);
                    }
                }>
                <View style={{ width:"50%"}}>
                <Text style={styles.buttonText}> Share as Text </Text>
                </View>
                <View style={{ width:"20%"}}>
                <Icon name="share" color="white"size={25} style={{alignSelf:"center"}}/>
                </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Sharebutton} onPress={
                 this.goBack
                }>
                <View style={{ width:"50%"}}>
                 <Text style={styles.buttonText}>  Cancel </Text>
                 </View>
                 <View style={{ width:"20%"}}>
                 <Entypo name="squared-cross" color="white"size={25} style={{alignSelf:"center"}}/>
                 </View>
                </TouchableOpacity>
               
            </View>
            
         

          
        )
    }
}

const styles = StyleSheet.create({
    Sharebutton : {
        width:"90%",
        height:"8%",
        backgroundColor:"#38b750",
        justifyContent:"space-around",
        alignItems:"center",
        marginTop:10,
        alignSelf:"center",
        flexDirection:"row",
    },
    buttonText: {
        color:"white",
        alignContent:"center",
        fontSize:20,
        alignSelf:"center"
    },
});

export default ShareScreen;












