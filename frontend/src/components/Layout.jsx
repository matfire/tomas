import React, { useEffect, useState } from 'react'
import { MDBContainer, ToastContainer, MDBIcon, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBRow, MDBNavItem } from 'mdbreact'
import { MDBNavbar, MDBCol, MDBCollapse, MDBNavbarToggler, MDBNavbarNav } from 'mdbreact'
import actions from '../store/actions';
import {connect} from 'react-redux'
import axios from "axios"
import QRNode from 'qrcode.react'
import {withRouter} from 'react-router-dom'
import SpeechRecognition from 'react-speech-recognition'



const Layout = ({children, client, setAuth, setCoords, lat, lon, authenticated, user, setUser, finalTranscript, transcript, resetTranscript, startListening, stopListening, listening, recognition, history}) => {
    const getPosition = (pos) => {
        setCoords({lat: pos.coords.latitude, lon: pos.coords.longitude})
    }
    const [temp, setTemp] = useState({deg:"", icon:""})
    const [collapse, setCollapse] = useState(false)
    const [modal, setModal] = useState(false)

    // check authentication and get geolocation
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(getPosition)
        }
        recognition.lang = "fr-FR"
        client.reAuthenticate().then(({user}) => {setUser(user); setAuth(true)})
    }, [])
    // get weather data
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9d9ab4467244bce9a0a31fcbeb8ecb4c`).then((res) => {
            setTemp({deg:((res.data.main.temp - 32) * 5/9).toFixed(2), icon:res.data.weather[0].icon})
        })
    }, [lat, lon])

    // handle actions using final transcript
    useEffect(() => {
        if (finalTranscript !== "") {
            console.log(finalTranscript)
            if (finalTranscript.includes("appelle")) {
                history.push("/appelle")
            }
        }
    }, [])

    // set listener for speech recognition
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 32) {
                resetTranscript()
                if (listening) {
                    stopListening()
                } else {
                    startListening()
                }
           }
         };
         window.addEventListener("keydown", handleEsc);
         return (() => {
             window.removeEventListener("keydown", handleEsc)
         })
    }, [])
    return(
        <MDBContainer fluid>
            {authenticated && <header>
                <MDBNavbar color="bg-primary" fixed="top" expand="md" transparent dark scrolling>
                    <MDBNavbarToggler onClick={() => setCollapse(!collapse)} />
                    <MDBCollapse isOpen={collapse} navbar>
                        <MDBNavbarNav left>
                        <h2>{temp.deg}</h2>   <img src={`http://openweathermap.org/img/wn/${temp.icon}.png`} className="img-fluid" />
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBIcon icon="qrcode" onClick={() => setModal(!modal)}/>
                            </MDBNavItem>
                            <MDBNavItem className="pl-2">
                                <MDBIcon icon="microphone" onClick={() => {
                                    if (listening) {
                                        stopListening()
                                    } else {
                                        startListening()
                                    }
                                }}/>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </header>}
            <MDBModal isOpen={modal} toggle={() => setModal(!modal)}>
                <MDBModalHeader isOpen={modal}>Ton Code</MDBModalHeader>
                <MDBModalBody>
                    <MDBRow center>
                        <MDBCol md="6">
                            <QRNode value={user._id} />
                        </MDBCol>
                    </MDBRow>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="success" onClick={() => setModal(!modal)}>Fermer</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
            <MDBContainer fluid className="mt-5 pt-5">
                <ToastContainer           
                hideProgressBar={true}
                newestOnTop={true}
                autoClose={5000}/>
                {children}
                <MDBContainer>
                                {finalTranscript}
                </MDBContainer>
            </MDBContainer>
        </MDBContainer>
    )
}

const mapStateToProps = state => ({
    client: state.client,
    lat: state.lat,
    lon: state.lon,
    authenticated: state.authenticated,
    user: state.user
})

const mapDispatchToProps = dispatch => (
    {
        setAuth : auth => dispatch(actions.setAuth(auth)),
        setCoords : coords => dispatch(actions.setCoords(coords)),
        setUser: user => dispatch(actions.setUser(user))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SpeechRecognition({autoStart:false, continuous:false})(Layout)))