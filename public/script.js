

const socket = io('/')

const myVideo=document.createElement('video')
const videoGrid = document.getElementById('video-grid')
myVideo.muted = true

var peer = new Peer(undefined,{
    path:'/peerjs',
    host:'/',
    port:'3030'
});

let myVideoStream
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
    
}).then(stream=>{
    myVideoStream=stream
    addVideoStream(myVideo,stream)


    peer.on('call',call=>{
        call.answer(stream)
        const video=document.createElement('video')
        call.on('stream',userVideoStream =>{
            addVideoStream(video,userVideoStream)
        })

    })



    socket.on('user-connected',(userId)=>{
        connecToNewUser(userId,stream)
    })
    
})
peer.on('open',id=>{
    socket.emit('join-room',ROOM_ID,id)
})
//socket.emit('join-room',ROOM_ID)


// calling via peer
const connecToNewUser=(userId,stream)=>{
    const call = peer.call(userId,stream)
    const video = document.createElement('video')
    call.on('stream',userVideoStream =>{
        addVideoStream(video,userVideoStream)
    })
}



const addVideoStream = (video,stream)=>{
    video.srcObject = stream
    //alert('now')
    video.addEventListener('loadmetadata',()=>{
        video.play()
        //alert('now')
    })
    videoGrid.append(video)
    video.play()
    
}