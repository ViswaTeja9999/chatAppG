import React from 'react'
import { StyleSheet, TouchableOpacity, View,Alert } from 'react-native'
import {useTheme} from '@react-navigation/native'
import {Text,Icon} from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const CustomListItem = ({name,icon,type,enterSettings,id}) => {
    const navigation=useNavigation();
    const {colors} =useTheme();
    const Leave=()=>{
        Alert.alert(
            "Logout",
            `Do you want to logout your account from this device.If yes click Continue else click Cancel.`,
            [
                {
                    text:'Cancel',
                    style: "cancel"
                },
                { text: "Continue", onPress: () =>Logout()}
            ]
        );
    }
    const Logout=()=>{
        navigation.replace('Welcome')
    }
    const navigate=()=>{
        enterSettings(id,name)
    }
    return (
        <TouchableOpacity onPress={name==='Logout'?Leave:navigate}>
        <View style={{backgroundColor:colors.card,height:70,borderRadius:20,flexDirection:'row',justifyContent:'flex-start',padding:20}}>
            <Icon name={icon} type={type} color={name!=='Logout'?colors.text:'red'} size={26}/>
            <Text h4 style={{color:name!=='Logout'?colors.text:'red',marginLeft:5}}>{name}</Text>
        </View>
        </TouchableOpacity>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
