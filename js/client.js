const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
const audio = new Audio('sound.mp3');

const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    };
};

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const name = prompt("Enter Your Virtual Name :");
socket.emit("new-user-joined", name);

socket.on('user-joined', name =>{
    audio.play()
    append(`${name} Joined The Chat!`, 'middle');
});

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('leave', name =>{
    audio.play();
    append(`${name} Left The Chat.`, 'middle');
});


