import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, Pressable, Modal, Alert, StyleSheet, FlatList} from 'react-native';
import { TextInput } from 'react-native-web';
import Contenair from '../components/contenair';
import ModalView from '../components/modals';

import {
    StyledContenair,
    InnerContainer,
    PageTitle,
    LeftIcon,
    RightIcon,
    StyledButton,
    ButtonText,
    StyledFormArea,
    StyledInputLabel,
    StyledTextInput,
    Colors, 
    Box,
    BoxText
} from './../components/style';

const {brand, darkLight, blue, tertiary} = Colors;

const Home = ({navigation}) => {
    const [visible, setVisible] = useState(false);
    const [id, setID] = useState('');
    const [elev_status, setElev_Status] = useState('');
    const [postID, setPostID] = useState(0);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [submitText, setSubmitText] = useState('Activate')


    const url = 'https://14ed-66-130-105-123.ngrok.io/api/elevators/status';

    const headers = {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    };

    const getInactivesElevators = async () => {
        setLoading(true)
        await fetch(url)
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            })
            .catch(e =>console.log(e))
        setLoading(false)
    }

    const editToActive = (id, elev_status) => {
        fetch('https://14ed-66-130-105-123.ngrok.io/api/elevators/' + id + '/status/Active', {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                "elevator_status": elev_status,
            })
        }).then((res) => {
            res.json()
        })
        .then(resJson => {
            udpateElevators()
        }).catch(e => {console.log(e)})
    }

    const editToInactive = (id, elev_status) => {
        fetch('https://14ed-66-130-105-123.ngrok.io/api/elevators/' + id + '/status/Inactive', {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                "elevator_status": elev_status,
            })
        }).then((res) => {
            res.json()
            console.log('test')
        })
        .then(resJson => {
            console.log('test3')
            updateElevators()
        })
    }

    const updateElevators = () => {
        getInactivesElevators()
    } 

    const edit = (elev_id, elev_status) => {
        console.log('HEY')
        console.log(visible)
        console.log(elev_status)
        console.log(elev_id)
        setVisible(true)
        setPostID(elev_id)
        setElev_Status(elev_status)
    }

    useEffect(() => {
        getInactivesElevators();
        // axios.get('https://14ed-66-130-105-123.ngrok.io/api/elevators/status')
        // .then(response => {
        //     setResponseData(response.data);
        // });
    }, []);

    return (
        <StyledContenair>
            <InnerContainer>
                <PageTitle> Welcome Home ! </PageTitle>
                    <FlatList
                        data = {data}
                        keyExtractor = {(item, index) => item.id + index.toString()}
                        refreshing = {loading}
                        onRefresh = {getInactivesElevators}
                        renderItem = {({item}) => (
                        <Contenair 
                            title = {item.id}
                            status = {item.elevator_status}
                            onPress = {() => edit(item.id, item.elevator_status)}
                            onDelete = {() => deleteItem(item.id)} 
                        />
                        )}
                    />
                    <ModalView
                        setElev_Status = {setElev_Status}
                        elev_status = {elev_status}
                        setLoading = {setLoading}
                        setData = {setData}
                        setSubmitText = {setSubmitText}
                        postID = {postID}
                        visible = {visible}
                        title = 'Elevator ID :'
                        onDismiss = {() => setVisible(false, setSubmitText === 'Activate')}
                        onSubmit = {() => {
                            if (elev_status == 'Inactive') {
                                editToActive(postID, 'Active');
                                setTimeout(function(){editToInactive(postID, "Inactive")}, 10000)
                                console.log('test2')
                            }
                        }
                    }
                        cancelable>
                    </ModalView>
                    
                    {/* <TextInput 
                        editable = {false}
                        label = "Elevator status"
                        value = {elev_status}
                        onChangeText = {(text) => setElev_Status(text)}
                        mode = "outlined"
                    /> */}

            </InnerContainer>
        </StyledContenair>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

export default Home;