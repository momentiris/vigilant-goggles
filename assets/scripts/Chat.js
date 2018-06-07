import socketIOClient from 'socket.io-client';
import Speech from './Speech.js';

class Chat {
  constructor() {
    // this.serverEndpoint = 'http://localhost:1337';
    this.serverEndpoint = 'https://fathomless-anchorage-14823.herokuapp.com/';
    this.connectClient();

    this.usernameField = document.querySelector('.username__input');
    this.messageField = document.querySelector('.message__input');
    this.sendMessageBtn = document.querySelector('.send__message');
    this.chatroom = document.querySelector('.chat__content');
    this.usernameBtn = document.querySelector('.change__username');
    this.userCount = document.querySelector('.usercount');
    this.speechBtn = document.querySelector('.speech');

    this.colors = {
      red: '#e75b5b',
      green: '#40b97b',
    }

    this.addEvents();
    this.recipients();
    this.speech = new Speech(this);
  }

  connectClient() {
    this.socket = socketIOClient(this.serverEndpoint);
  }

  emitMessage(e) {
    e.preventDefault();
    this.messageField.value &&
    this.socket.emit('new_message', { message: this.messageField.value });
    this.messageField.value = '';
  }

  emitSpeech(transcript) {
    this.socket.emit('new_message', { message: transcript});
  }

  toggleUsernameBtn(e) {
    e.target.value.length > 0 ?
    this.usernameBtn.classList.add('change__username-active') :
    this.usernameBtn.classList.remove('change__username-active')
  }

  recipients() {
    this.socket.on('new_connection', data => {
      this.usernameField.placeholder = data.username;
      const p = document.createElement('p');
      p.style.color = this.colors.green;
      p.innerHTML = `${data.username} joined the chat.`;
      this.chatroom.appendChild(p);
      this.username = data.username;
      this.userCount.innerHTML = data.userCount;
    })

    this.socket.on('disconnect', data => {
        this.userCount.innerHTML = data.userCount;
        const p = document.createElement('p');
        p.style.color = this.colors.red;
        p.innerHTML = `${data.username} disconnected from the chat.`;
        this.chatroom.appendChild(p);
        this.username = data.username;
    })

    this.socket.on('new_message', data => {
      const p = document.createElement('p');
      p.innerHTML = `${data.username}: ${data.message}`;
      this.chatroom.appendChild(p);
    })

    this.socket.on('username_changed', data => {
      const p = document.createElement('p');
      p.innerHTML = `${data.old} changed name to ${data.new}.`;
      this.chatroom.appendChild(p);
    })

  }

  addEvents() {
    this.sendMessageBtn.addEventListener('click', this.emitMessage.bind(this));
    this.messageField.addEventListener('keydown', e => e.key === 'Enter' && this.emitMessage(e));
    this.usernameField.addEventListener('keyup', this.toggleUsernameBtn.bind(this));

    this.speechBtn.addEventListener('click', e => {
      e.target.classList.contains('speech-active') ?
      this.speech.listen(false) : this.speech.listen(true);
      this.speechBtn.classList.toggle('speech-active');
    })

    this.usernameBtn.addEventListener('click', e => {
      this.socket.emit('change_username', { username: this.usernameField.value })
      this.usernameBtn.classList.remove('change__username-active');
    })
  };


}

export default Chat;
