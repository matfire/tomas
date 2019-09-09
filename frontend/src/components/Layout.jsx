import React, { useEffect, useState } from 'react'
import { MDBContainer, ToastContainer, MDBIcon, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBRow } from 'mdbreact'
import { MDBNavbar, MDBCol, MDBCollapse, MDBNavbarToggler, MDBNavbarNav } from 'mdbreact'
import actions from '../store/actions';
import {connect} from 'react-redux'
import axios from "axios"
import QRNode from 'qrcode.react'
import { userInfo } from 'os';



const Layout = ({children, client, setAuth, setCoords, lat, lon, authenticated, user, setUser}) => {
    const getPosition = (pos) => {
        setCoords({lat: pos.coords.latitude, lon: pos.coords.longitude})
    }
    const [temp, setTemp] = useState({deg:"", icon:""})
    const [collapse, setCollapse] = useState(false)
    const [modal, setModal] = useState(false)

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(getPosition)
        }
        client.reAuthenticate().then(({user}) => {setUser(user); setAuth(true)})
    }, [])
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9d9ab4467244bce9a0a31fcbeb8ecb4c`).then((res) => {
            setTemp({deg:((res.data.main.temp - 32) * 5/9).toFixed(2), icon:res.data.weather[0].icon})
        })
    }, [lat, lon])
    return(
        <MDBContainer fluid>
            {authenticated && <header>
                <MDBNavbar color="bg-primary" fixed="top" expand="md" transparent dark scrolling>
                    <MDBNavbarToggler onClick={() => setCollapse(!collapse)} />
                    <MDBCollapse isOpen={collapse} navbar>
                        <MDBNavbarNav left>
                        {temp.deg}   {/* <img src={`http://openweathermap.org/img/wn/${temp.icon}.png`} className="img-fluid" /> */}
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            <MDBIcon icon="qrcode" onClick={() => setModal(!modal)}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Layout)