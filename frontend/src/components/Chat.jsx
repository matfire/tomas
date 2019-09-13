import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { MDBInput, MDBBtn, MDBRow, MDBCol, MDBContainer, MDBSpinner, MDBProgress, toast } from 'mdbreact'

const Chat = ({user, messages, firebase}) => {
	const [text, setText] = useState("")
	const [loading, setLoading] = useState(false)
	return (
		<div>
				<MDBContainer fluid>
					<MDBRow>
						{loading && <MDBProgress material preloader />}
						{messages.slice().reverse().map((msg) => (
							<MDBCol size="12"  key={msg.timestamp}>
								<div className={msg.name === user.email ? "float-right dusty-grass-gradient mb-3" : "float-left spring-warmth-gradient mb-3"} style={{borderRadius:"20px"}}>

								<h2>{msg.name.split("@")[0]}</h2>
								<p>{msg.text}</p>
								</div>
							</MDBCol>
						))}
					</MDBRow>
				</MDBContainer>
				<MDBInput label="Ecrivez ici votre message" value={text} getValue={(value) => {
					setText(value)
				}} />
				<MDBBtn color="primary" disabled={loading} circle={loading} onClick={() => {
					if (text === "") {
						toast.error("veuillez rentrer un message")
						return
					}
					setLoading(true)
					firebase.firestore().collection("messages").add({
						text,
						name:user.email,
						timestamp: new Date()
					}).then(() => {
						setLoading(false)
						setText("")
					})
					
				}}>Envoyer</MDBBtn>
		</div>
	)
}

const mapStateToProps = state => (
	{
		user: state.user,
		firebase: state.firebase,
		messages: state.messages
	}
)

export default connect(mapStateToProps)(Chat)
