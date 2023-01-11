import { Modal, StyleSheet, Text, TouchableOpacity, Pressable, View, Alert } from "react-native";
import React, {useEffect, useState} from "react";

const ModalView = ({setLoading, setData, postID, title, onSubmit, cancelable, visible = false, onDismiss }) => {

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
            updateElevators()
        })
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
        })
        .then(resJson => {
            updateElevators()
        })
    }

    const updateElevators = () => {
        getInactivesElevators()
    } 

    useEffect(() => {
        getInactivesElevators();
    }, []);


    const [submitText, setSubmitText] = useState('Activate')

    ModalView['backgroundColor'] = submitText === 'Activate' ? '#D9534F' : '#5CB85C'

    const pressing = () => {
        submitText === 'Activate' ? editToActive(postID, 'Activate') : editToInactive(postID, 'Activate')
        submitText === 'Activate' ? setSubmitText('Inactive') : setSubmitText('Activate')
        setTimeout(function(){submitText === 'Inactive' ? setSubmitText('Activate') : setSubmitText('Activate')}, 10000)
    }

    return (
        <Modal transparent={true} visible={visible} onDismiss={onDismiss} animationType="slide">
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{title}{postID}</Text>
                    <View>
                        <Text style={styles.modalText}>Status : {submitText === 'Activate' ? 'Inactive' : 'Activate'}</Text>
                    </View>
                    <View style={{alignSelf:'flex-end', alignItems:'center', flexDirection:'row'}}>
                        {cancelable && (<TouchableOpacity onPress={onDismiss} style={{ ...styles.button, backgroundColor: 'white'}}>
                            <Text>Back</Text>
                        </TouchableOpacity>)}
                        {onSubmit && (<TouchableOpacity onPress={pressing} style={buttonStyle}>
                            <Text>{submitText}</Text>
                        </TouchableOpacity>)}
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const buttonStyle = {
    width : 100,
    height : 50,
    margin : 10,
    borderRadius : 5,
    justifyContent : 'center',
    alignItem : 'center',
    backgroundColor : '#d91a3e',
    paddingLeft : 20,
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


export default ModalView;