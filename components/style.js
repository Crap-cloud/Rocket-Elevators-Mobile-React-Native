import styled from "styled-components/native";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
    primary: '#ffffff',
    secondary: '#E5E7EB',
    tertiary: '#1F2937',
    brand: '#d91a3e',
    blue: '#0a639f',
    darkLight: '#9CA3AF',
    red: '#d91a3e'
}

const {primary, secondary, tertiary, brand, blue, darkLight, red} = Colors;

export const StyledContenair = styled.View`
    flex : 1;
    padding : 25px;
    padding-top : ${StatusBarHeight + 10}px;
    background-color : ${primary};
`;

export const InnerContainer = styled.View`
    flex : 2;
    width : 100%;
    align-items : center;
`;

export const PageTitle = styled.Text`
    font-size : 30px;
    font-weight : bold;
    text-align : center;
    padding : 10px;
    color : ${brand};
`;

export const StyledTextInput = styled.TextInput`
    background-color : ${secondary};
    padding : 15px;
    padding-left : 55px;
    padding-right : 55px;
    border-radius : 5px;
    font-size : 16px;
    height : 60px;
    margin-vertical : 3px;
    margin-bottom : 10px;
    color: ${tertiary};
`;

export const StyledFormArea = styled.View`
    align-items : center;
    margin-top : 30%;
`;

export const StyledInputLabel = styled.Text`
    color : ${tertiary};
    font-size : 13px;
    text-align : left;
    min-width : 300px;
`;

export const LeftIcon = styled.TouchableOpacity`
    left : 15px;
    top : 32px;
    position : absolute;
    z-index : 1;
`;

export const RIcon = styled.TouchableOpacity`
    right : 15px;
    top : 32px;
    position : absolute;
    z-index : 1;
`;

export const RightIcon = styled.TouchableOpacity`
    padding-left : 230px;
`;

export const StyledButton = styled.TouchableOpacity`
    padding : 15px;
    background-color : ${tertiary};
    justify-content : center;
    align-items : center;
    border-radius : 5px;
    min-width : 100px;
    margin-vertical : 5px;
    height : 60px;
`;

export const ButtonText = styled.Text`
    color : ${primary};
    font-size : 16px;
`;

export const Box = styled.View`
    width : 300px;
    height : 80px;
    margin : 10px;
    border-radius : 5px;
    justify-content : center;
    align-item : center;
    background-color : ${red};
    padding-left : 20px;
`;

export const BoxText = styled.Text`
    font-size : 16px;
`;