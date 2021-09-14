import React, { useState, useRef } from 'react'
import styled from 'styled-components';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000')

const Wrapper = styled.div`
  height: 650px;
`
const LogScreen = styled.div`
  height: 90%;
  background-color: lightgray;
`
const MessageSection = styled.div`
  height:10%;
  form{
    display:flex;
    justify-content:center;
    align-items:center;
    height:100%;

    input{
      height:30px;
      width:400px;
      margin-right:10px
    }

    button{
      height:30px;
      width:40px;
    }
  }
`

export default function Main() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);


  const paintMessage = (m: string) => {
    console.log(m)
    setMessages(() => (
      [...messages].concat([m])
    ))

  }

  const onSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("sendMessage", message);
    paintMessage(message);
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const onEnter = () => {
    socket.emit("enter")
  }

  socket.on("paintMessage", (msg) => {
    paintMessage(msg)
  })

  return (
    <Wrapper>
      <LogScreen>
        <button onClick={onEnter}>입장</button>
        <ul style={{ margin: '0', listStyle: 'none' }}>
          {messages.map((aMessage) => (<li><div>{aMessage}</div></li>))}
        </ul>
      </LogScreen>
      <MessageSection>
        <form onSubmit={onSubmitMessage} >
          <input onChange={onChangeInput} type="text" />
          <button type='submit'></button>
        </form>
      </MessageSection>
    </Wrapper>
  )
}
