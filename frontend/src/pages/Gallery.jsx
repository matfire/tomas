import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { MDBContainer, MDBRow, MDBCol, MDBProgress, MDBInput, MDBFileInput } from 'mdbreact'
import shortid from 'shortid'
import firebase from '../firebase'
import actions from '../store/actions'
import Lightbox from 'react-image-lightbox'
import './Lightbox.css'

const Gallery = ({client, images, setImages}) => {
	const [progress, setProgress] = useState(0)
	const [photoIndex, setPhotoIndex] = useState(-1)
	const [isOpen, setOpen] = useState(false)
	useEffect(() => {
		if (images.length === 0) {
			client.service("images").find().then((data) => {
				setImages(data.data)
			})
		}
	}, [client, setImages, images])
	return(
		<MDBContainer className="mt-5">
			{ progress > 0 && <MDBProgress material preloader />}
				<div className="mdb-lightbox fluid">
			<MDBRow>
				{images.map((image, index) => {
					const privateKey = index
					return (
						<MDBCol md="4" key={privateKey}>
							<figure>
								<img src={image.path} alt={image.name} className="img-fluid" onClick={() => {
									setOpen(true)
									setPhotoIndex(privateKey)
								}} />
							</figure>
						</MDBCol>
					)
				})}
			</MDBRow>
				</div>
				{isOpen && 
					<Lightbox
						mainSrc={images[photoIndex].path}
						nextSrc={images[(photoIndex + 1) % images.length].path}
						prevSrc={images[(photoIndex + images.length - 1) % images.length].path}
						imageTitle={images[photoIndex].name}
						onCloseRequest={() => setOpen(false)}
						onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
						onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
					/>
				}
			<MDBRow center>
					<MDBCol md="6">
						<MDBFileInput textFieldTitle="ajouter une image" btnTitle="Ajouter une image" accept="image/*" getValue={(e) => {
							const id = shortid.generate()
							var storageRef = firebase.storage().ref()
							setProgress(1)
							storageRef.child("images/" + id).put(e[0]).then((snapshot) => {
								snapshot.ref.getDownloadURL().then(path => {
									client.service("images").create({
										name:snapshot.ref.name,
										path
									}).then(() => {
										setProgress(0)
									})
								})
							})
						}}/>
					</MDBCol>
			</MDBRow>
		</MDBContainer>
	)
}

const mapStateToProps = state => (
	{
		client:state.client,
		images: state.images
	}
)

const mapDispatchToProps = dispatch => (
	{
		setImages : images => dispatch(actions.setImages(images))
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)