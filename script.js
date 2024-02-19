const johnSelector = document.querySelector("#john-selector");
const janeSelector = document.querySelector("#jane-selector");
const chatHeader = document.querySelector(".chat-header");
const chatmessage = document.querySelector(".chat-message");
const form = document.querySelector(".chat-input-form");
const chatInput = document.querySelector(".chat-input");
const clearBtn = document.querySelector(".chat-clear-btn");
const messages = JSON.parse(localStorage.getItem("msg")) || [];
const createChatMessage = (message)=> `
            <div class="message ${message.sender === "John" ? "bg-blue" : "bg-grey"}">
            <div class="message-sender">${message.sender}</div>
            <div class="message-text">${message.text}</div>
            <div class="message-time">${message.timestamp}</div>
            </div>

`

window.onload = ()=>{
     messages.forEach(message=>{
        chatmessage.innerHTML += createChatMessage(message);
     })
}
let messageSenderName = "John";
const updateMessageSender = (name)=>{
      messageSenderName = name;
     chatHeader.innerHTML = `${name} chatting...`;
     chatInput.placeholder = `Type here,${name}...`;

     if(name === "John"){
         johnSelector.classList.add("active-btn");
         janeSelector.classList.remove("active-btn");
     }
     if(name === "Jane"){
         janeSelector.classList.add("active-btn");
         johnSelector.classList.remove("active-btn");
     }
}

johnSelector.onclick = ()=> updateMessageSender("John");
janeSelector.onclick = ()=> updateMessageSender("Jane");


const sendMessage = (e)=>{
     e.preventDefault();
     const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
     const message = {
        sender : messageSenderName,
        text : chatInput.value,
        timestamp
     }
   
    messages.push(message);
   localStorage.setItem("msg",JSON.stringify(messages))

     chatmessage.innerHTML += createChatMessage(message);
     
     form.reset();

     chatmessage.scrollTop = chatmessage.scrollHeight;
}

form.addEventListener("submit",sendMessage);

clearBtn.addEventListener("click",()=>{
     localStorage.clear();
     chatmessage.innerHTML = "";
})