import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import { MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBCard, MDBCardBody, MDBIcon, MDBBtn } from 'mdbreact'
import actions from '../store/actions'
import Chat from '../components/Chat'


const ChatMessage = ({right, message}) => {
    return (
        <MDBCard>
            <MDBCardBody>
                <div>
                <small className={`pull-${right ? "right" : "left"} text-muted`}>
                        <i className="far fa-clock" /> {message.created_at}
                </small>
                </div>
                <hr />
                <p className="mb-0">{message.content}</p>
            </MDBCardBody>
        </MDBCard>
    )
}

const Contacts = ({user, selectedSender, messages, setSender, client, setMessages, history}) => {
    return (
        <MDBRow className="d-flex align-content-stretch wrap">
            <MDBCol md="4" sm="12">
                <MDBListGroup>
                    {user.contacts.map((contact) => (
                        <MDBListGroupItem key={contact._id} active={selectedSender === contact._id} onClick={() => setSender(contact._id)}>
                            <MDBRow>
                                <MDBCol md="8" sm="10" lg="10">
                                    <h3>{contact.email}</h3>
                                </MDBCol>
                                <MDBCol md="4" sm="2" lg="10">
                                   <MDBBtn gradient="young-passion" rounded onClick={() => history.push("/conf/dc3ed1")}> <MDBIcon icon="video" size="2x"  /></MDBBtn>
                                </MDBCol>
                            </MDBRow> 
                        </MDBListGroupItem>
                    ))}
                </MDBListGroup>
            </MDBCol>
            <MDBCol md="8" sm="12">
                    <MDBCard>
                        <MDBCardBody>
                        {/* {selectedSender !== "" && messages[selectedSender] && messages[selectedSender].map((message) => (
                            <ChatMessage right={message.from === user._id} message={message} />
                        ))} */}
                            <Chat />
                        </MDBCardBody>
                    </MDBCard>

            </MDBCol>
        </MDBRow>
    )
}

const mapStateToProps = state => (
    {
        user:state.user,
        selectedSender: state.selectedSender,
        messages: state.messages,
        client: state.client
    }
)

const mapDispatchToProps = dispatch => (
    {
        setSender: sender => dispatch(actions.setSender(sender)),
        setMessages: messages => dispatch(actions.setMessages(messages))
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(Contacts)