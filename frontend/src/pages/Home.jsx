import React, { useEffect, useState } from 'react'
import axios from "axios"
import {connect} from 'react-redux'
import { MDBContainer, MDBNavbar, MDBCol, MDBCollapse, MDBNavbarToggler, MDBNavbarNav, MDBRow, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact'

const Home = ({lat, lon, calendar, history}) => {

    return (
        <MDBContainer fluid>
            <MDBRow className="mb-5 pb-5 align-items-stretch d-flex">
                <MDBCol md="4"  xs="12" sm="12" onClick={() => history.push("/contacts")}>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBRow center>
                                <MDBCol md="4"  xs="12" sm="12">
                                    <MDBIcon icon="phone" size="10x" />
                                    <h2 className="text-center">Appels</h2>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4"  xs="12" sm="12" onClick={() => history.push("/gallery")}>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBRow center>
                                <MDBCol md="4"  xs="12" sm="12">
                                    <MDBIcon far icon="images" size="10x"/>
                                    <h2 className="text-center">Galerie photo</h2>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4"  xs="12" sm="12">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBRow center>
                                <MDBCol md="4"  xs="12" sm="12">
                                    <MDBIcon far icon="calendar-alt" size="10x"/>
                                    <h2 className="text-center">Agenda</h2>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </MDBRow>
                <MDBRow className="mt-5 pt-5 d-flex align-content-stretch flex-wrap">
                <MDBCol md="4"  xs="12" sm="12">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBRow center>
                                <MDBCol md="4"  xs="12" sm="12">
                                    <MDBIcon icon="at" size="10x"/>
                                    <h2 className="text-center">Méls</h2>
                                </MDBCol>
                            </MDBRow>                        
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4"  xs="12">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBRow center>
                                <MDBCol md="4"  xs="12">
                                    <MDBIcon icon="tv" size="10x"/>
                                    <h2 className="text-center">Télécomande TV</h2>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4" >
                    <MDBCard>
                        <MDBCardBody>
                            <MDBRow center>
                                <MDBCol md="4"  xs="12">
                                    <MDBIcon icon="cog" size="10x"/>
                                    <h2 className="text-center">Réglages</h2>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

const mapStateToProps = state => (
    {
        lat: state.lat,
        lon: state.lon
    }
)

export default connect(mapStateToProps)(Home)