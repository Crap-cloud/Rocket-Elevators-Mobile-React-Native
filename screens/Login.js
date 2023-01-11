import React, {useState} from 'react';

import axios from 'axios';

import { View, Text } from 'react-native';

import { Formik } from 'formik';

import {Octicons, Ionicons} from '@expo/vector-icons';


import {
    StyledContenair,
    InnerContainer,
    PageTitle,
    LeftIcon,
    RIcon,
    StyledButton,
    ButtonText,
    StyledFormArea,
    StyledInputLabel,
    StyledTextInput,
    Colors
} from './../components/style';

const {brand, darkLight, blue} = Colors;

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [emailError, setEmailError] = useState('');

    return (
        <StyledContenair>
            <InnerContainer>
                <PageTitle> Employee Login </PageTitle>
                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values) => {
                        console.log(values.email);
                        axios.get('https://14ed-66-130-105-123.ngrok.io/api/users', {
                            headers: {
                              'Content-Type': 'application/json',
                              'ngrok-skip-browser-warning': '*',
                            },
                          })
                            .then(response => {
                                // la réponse est disponible dans la variable "response"
                                const emails = response.data.map(user => user.email);
                                console.log(emails)
                                console.log('=====')
                                // console.log(emails);
                                if (emails.includes(values.email)) {
                                    // la valeur du formulaire est dans la liste d'e-mails
                                    setEmailError('');
                                    navigation.navigate('Home');
                                  } else {
                                    // la valeur du formulaire n'est pas dans la liste d'e-mails
                                    setEmailError("Email address is incorrect ! Please change it");                                  
                                }
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    }}>
                        {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                            <MyTextInput 
                                label='Email Address'
                                icon='mail'
                                placeholder='youremail@gmail.com'
                                placeholderTextColor={darkLight}
                                onChangeText={email => handleChange('email')(email)}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType='email-address'
                            />

                            <MyTextInput 
                                label='Password'
                                icon='lock'
                                placeholder='* * * * * * *'
                                placeholderTextColor={darkLight}
                                onChange={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />

                            { emailError ? 
                            <Text style={{color: 'red'}}> {emailError}</Text> :
                            null 
                            }

                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Login</ButtonText>
                            </StyledButton>

                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContenair>
    )
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
                </RIcon>
            )}
        </View>
    )
}

export default Login;