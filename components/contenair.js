import { StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Card } from 'react-native-paper';

const Button = ({ onPress, style}) => (
    <Pressable>
        <TouchableOpacity onPress={onPress} style={style}>
            <AntDesign size={30} color={'#1F2937'} name='edit'></AntDesign>
        </TouchableOpacity>
    </Pressable>
)

import {
    RightIcon
} from './../components/style';

export default function Contenair({title, status, onPress}) {
    const boxStyle = {
        width : 300,
        height : 100,
        margin : 10,
        borderRadius : 5,
        justifyContent : 'center',
        alignItem : 'center',
        backgroundColor : '#d91a3e',
        paddingLeft : 20,
    }

    return (
        <Card style={boxStyle}>
            <View>
                <Text style={{paddingTop:8}}> ID : {title} </Text>
                <Text style={{paddingTop:8}}> Status : {status} </Text>
            </View>
            <RightIcon>
                <View>
                    <Button setSubmitText onPress={onPress} />
                </View>
            </RightIcon>
        </Card>
    )
}

