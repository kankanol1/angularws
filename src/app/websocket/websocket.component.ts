import {Component, OnInit} from '@angular/core';
// import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';
import {Items} from "../entity/items";
import {Atems} from "../entity/atems";

const Stomp = require('stompjs');
const  SockJS =require('sockjs-client');

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})


export class WebsocketComponent implements OnInit {
  public stompClient;
  public serverUrl = "http://localhost:8080/websocket";
  public room;
  public sender;//发送者
  public type;//消息的类型
  public message;//消息内容
  public messageAll;//群发消息的内容
  items = [];
  atems = [];

  constructor() {
  }

  ngOnInit(): void {
    // this.connect();
  }

  connect() {
    if (this.sender === undefined) {
      alert("发送者不可为空")
      return
    }
    if (this.room === undefined) {
      alert("房间号不可为空")
      return;
    }


    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/topic/' + that.room, (message) => {
        if (message.body) {
          const mb = JSON.parse(message.body)
          const sender = mb.sender
          const content = mb.content
          const type = mb.type
          const newitem = new Items(type, sender, content)
          that.items.push(newitem)
        } else {
          return
        }
      })

      that.stompClient.subscribe('/all', message => {
        if (message.body) {
          const mb = JSON.parse(message.body)
          const sender = mb.sender
          const content = mb.content
          const type = mb.type
          const newatem = new Atems(type, sender, content)
          that.atems.push(newatem)
        } else {
          return
        }
      })
    })
  }

  disconnect() {
    if (this.stompClient !== undefined) {
      this.stompClient.disconnect()
    } else {
      alert("当前还有连接websocket");
    }
    this.stompClient = undefined
    alert("Disconnected");
  }

  sendMessage() {
    if (this.stompClient === undefined) {
      alert("websocket还未连接");
      return;
    }
    if (this.type === undefined) {
      alert("消息类型不能为空");
      return;
    }

    if (this.message === undefined) {
      alert("消息内容不可为空")
      return;
    }

    this.stompClient.send('/app/chat', {}, JSON.stringify({
      'sender': this.sender,
      'room': this.room,
      'type': this.type,
      'content': this.message
    }))
  }

  sendMessageToAll() {
    if (this.stompClient === undefined) {
      alert("websocket还未连接")
      return
    }
    if (this.messageAll === undefined) {
      alert("群发消息内容不能为空")
      return
    }
    this.stompClient.send(
      '/app/chatAll',
      {},
      JSON.stringify({
        'sender': this.sender,
        'room': "00000",
        'type': "00000",
        'content': this.messageAll
      })
    );
  }

}
