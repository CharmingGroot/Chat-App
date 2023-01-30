"use strict";
const socket = io();
const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    send();
  }
})

function send() {
  const param = {
    name: nickname.value,
    msg: chatInput.value
  }
  socket.emit("chatting", param);
}

sendButton.addEventListener("click", send);

socket.on("chatting", (data) => {
  const { name, msg, time } = data;
  const item = new LiModel(name, msg, time);
  item.makeLi();
  // console.log(data);
  displayContainer.scrollTo(0, displayContainer.scrollHeight);


});

function LiModel(name, msg, time) {
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeLi = () => {

    const li = document.createElement("li");
    li.classList.add(nickname.value == this.name ? "sent" : "recieved");
    const dom = `<span class="profile">
    <span class="user">${this.name}</span>
    <img class="image" src="data:image/png;base64,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" alt="any">
  </span>
  <span class="message">${this.msg}</span>
  <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li);
  }
}