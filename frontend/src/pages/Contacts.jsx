import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import { MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBCard, MDBCardBody } from 'mdbreact'
import actions from '../store/actions'


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

const Contacts = ({user, selectedSender, messages, setSender, client, setMessages}) => {
    useEffect(() => {
        if (selectedSender) {
            if (!messages[selectedSender]) {
                client.service("messages").find({query: {
                    to: {
                        $in:[selectedSender, user._id]
                    },
                    from: {
                        $in:[selectedSender, user._id]
                    }
                }}).then((res) => {
                    let {data} = res
                    let msgs = {...messages, selectedSender: data}
                    setMessages(msgs)
                })
            }
        }
    }, [selectedSender])
    return (
        <MDBRow className="d-flex align-content-stretch wrap">
            <MDBCol md="4">
                <MDBListGroup>
                    {user.contacts.map((contact) => (
                        <MDBListGroupItem key={contact._id} active={selectedSender === contact._id} onClick={() => setSender(contact._id)}>{contact.email}</MDBListGroupItem>
                    ))}
                </MDBListGroup>
            </MDBCol>
            <MDBCol md="8" style={{height:"100%"}}>
                        {selectedSender !== "" && messages[selectedSender] && messages[selectedSender].map((message) => (
                            <ChatMessage right={message.from === user._id} message={message} />
                        ))}
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