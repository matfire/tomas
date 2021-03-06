import React, { useEffect, useState } from 'react'
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact'
import {connect} from 'react-redux'
import Plyr from 'plyr';

const Video = ({match, location, user}) => {
    useEffect(() => {
        const ScaleDrone = window.ScaleDrone
        let localVideo = document.getElementById("callerVideo")
        let remoteVideo = document.getElementById("receiverVideo")
          const roomHash = match.params.hash;
          
          // TODO: Replace with your own channel ID
          const drone = new ScaleDrone('gNE2U44b56ZsfPx0');
          // Room name needs to be prefixed with 'observable-'
          const roomName = 'observable-' + roomHash;
          const configuration = {
            iceServers: [{
              urls: 'stun:stun.l.google.com:19302'
            }]
          };
          let room;
          let pc;
          
          
          function onSuccess() {};
          function onError(error) {
            console.error(error);
          };
          
          drone.on('open', error => {
            if (error) {
              return console.error(error);
            }
            room = drone.subscribe(roomName);
            room.on('open', error => {
              if (error) {
                onError(error);
              }
            });
            // We're connected to the room and received an array of 'members'
            // connected to the room (including us). Signaling server is ready.
            room.on('members', members => {
              console.log('MEMBERS', members);
              // If we are the second user to connect to the room we will be creating the offer
              const isOfferer = members.length === 2;
              startWebRTC(isOfferer);
            });
          });
          
          // Send signaling data via Scaledrone
          function sendMessage(message) {
            drone.publish({
              room: roomName,
              message
            });
          }
          
          function startWebRTC(isOfferer) {
            pc = new RTCPeerConnection(configuration);
          
            // 'onicecandidate' notifies us whenever an ICE agent needs to deliver a
            // message to the other peer through the signaling server
            pc.onicecandidate = event => {
              if (event.candidate) {
                sendMessage({'candidate': event.candidate});
              }
            };
          
            // If user is offerer let the 'negotiationneeded' event create the offer
            if (isOfferer) {
              pc.onnegotiationneeded = () => {
                pc.createOffer().then(localDescCreated).catch(onError);
              }
            }
          
            // When a remote stream arrives display it in the #remoteVideo element
            pc.ontrack = event => {
              const stream = event.streams[0];
              if (!remoteVideo.srcObject || remoteVideo.srcObject.id !== stream.id) {
                remoteVideo.srcObject = stream;
                remoteVideo.scrollIntoView({behavior:"auto"})
              }
            };
          
            navigator.mediaDevices.getUserMedia({
              audio: true,
              video: true,
            }).then(stream => {
              window.localStream = stream
              // Display your local video in #localVideo element
              localVideo.srcObject = stream;
              localVideo.play()
              // Add your stream to be sent to the conneting peer
              stream.getTracks().forEach(track => pc.addTrack(track, stream));
            }, onError);
            room.on("member_leave", () => {
              remoteVideo.pause()
              remoteVideo.srcObject = null
            })

            // Listen to signaling data from Scaledrone
            room.on('data', (message, client) => {
              // Message was sent by us
              if (client.id === drone.clientId) {
                return;
              }
          
              if (message.sdp) {
                // This is called after receiving an offer or answer from another peer
                pc.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
                  // When receiving an offer lets answer it
                  if (pc.remoteDescription.type === 'offer') {
                    pc.createAnswer().then(localDescCreated).catch(onError);
                  }
                }, onError);
              } else if (message.candidate) {
                // Add the new ICE candidate to our connections remote description
                pc.addIceCandidate(
                  new RTCIceCandidate(message.candidate), onSuccess, onError
                );
              }
            });
          }
          
          function localDescCreated(desc) {
            pc.setLocalDescription(
              desc,
              () => sendMessage({'sdp': pc.localDescription}),
              onError
            );

          }
          return (() => {
            pc.close()
            room.unsubscribe();
            localVideo.pause()
            localVideo.srcObject = null
            window.localStream.getTracks().forEach( (track) => {
              track.stop();
            });
            window.localStream.getAudioTracks().forEach( track => {
              track.stop()
            })
          })

    }, [])
    return (
        <MDBRow>
            <MDBCol md="6" xs="12" lg="12">
                <MDBCard>
                  <MDBCardBody>
                    <video muted id="callerVideo" autoPlay/>
                  </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <MDBCol md="6" xs="12" lg="12">
              <MDBCard>
                <MDBCardBody>
                  <video id="receiverVideo" autoPlay/>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
        </MDBRow>
    )
}

const mapStateToProps = state => (
    {
        user: state.user
    }
)

export default connect(mapStateToProps)(Video)