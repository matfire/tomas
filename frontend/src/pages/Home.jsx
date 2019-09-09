import React, { useEffect, useState } from 'react'
import axios from "axios"
import {connect} from 'react-redux'
import { MDBContainer, MDBNavbar, MDBCol, MDBCollapse, MDBNavbarToggler, MDBNavbarNav, MDBRow, MDBCard, MDBCardBody } from 'mdbreact'

const Home = ({lat, lon, calendar}) => {

    return (
        <MDBContainer fluid>
            <MDBRow>
                <MDBCol md="4">
                    <MDBCard>
                        <MDBCardBody>
                            sssss
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                    <MDBCard>
                        <MDBCardBody>
                            sssss
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                    <MDBCard>
                        <MDBCardBody>
                            sssss
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                    <MDBCard>
                        <MDBCardBody>
                            sssss
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                    <MDBCard>
                        <MDBCardBody>
                            sssss
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                    <MDBCard>
                        <MDBCardBody>
                            sssss
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