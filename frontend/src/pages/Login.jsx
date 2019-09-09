import React, {useState} from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, toast } from 'mdbreact';
import actions from '../store/actions';
import {connect} from 'react-redux'

const Login = ({history, client, setAuthenticated, setUser}) => {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    return(
        <MDBRow center>
            <MDBCol md="4">
                <MDBCard>
                    <MDBCardBody>
                        <h2 className="text-center">Se connecter</h2>
                        <MDBInput icon="envelope" type="email" label="Email" getValue={(value) => setEmail(value)}/>
                        <MDBInput icon="lock" type="password" label="Password" getValue={(value) => setPassword(value)} />
                        <div className="text-center">
                            <MDBBtn color="primary" onClick={() => {
                                client.authenticate({
                                    strategy:"local",
                                    email,
                                    password
                                }).then(({user}) => {
                                    setAuthenticated(true)
                                    setUser(user)
                                    history.push("/")
                                }).catch(() => {
                                    toast.error("Connection failed: check credentials")
                                })
                            }}>Envoyer</MDBBtn>
                             ou 
                            <MDBBtn color="secondary" onClick={() => history.push("/register")}>Creer un compte</MDBBtn>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    )
}

const mapStateToProps = state => (
    {
        client: state.client
    }
)

const mapDispatchToProps = dispatch => (
    {
        setAuthenticated: value => dispatch(actions.setAuth(value)),
        setUser: user => dispatch(actions.setUser(user))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Login)