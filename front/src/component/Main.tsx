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
  overflow-y: scroll;
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

const EnterButton = styled.button`
  display: block;
  width: 300px;
  height: 50px;
  margin: 0 auto;
`
const NicknameInput = styled.input`
  display: block;
  width: 300px;
  height: 50px;
  margin: 0 auto;
`

export default function Main() {
  const [nickname, setNickname] = useState('');
  const [entered, setEntered] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  }

  const onSubmitNickname = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("enter", nickname)
    setEntered(true);
  }


  const paintMessage = (m: string) => {
    setMessages(() => (
      [...messages].concat([m])
    ))
  }

  const onSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("sendMessage", message, nickname);
    paintMessage(`${nickname}: ${message}`);
    e.currentTarget.reset();
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  socket.on("paintMessage", (msg, nickname) => {
    paintMessage(`${nickname}: ${msg}`);
  })

  socket.on("alertMessage", (msg) => {
    paintMessage(msg)
  })

  return (
    <Wrapper>
      <LogScreen>
        {entered
          ? <ul style={{ margin: '0', listStyle: 'none' }}>
            {messages.map((aMessage) => (<li><div>{aMessage}</div></li>))}
          </ul>
          : <form onSubmit={onSubmitNickname}>
            <NicknameInput onChange={onChangeNickname} type="text" placeholder="닉네임을 입력해주세요" required />
            <EnterButton type='submit'>입장</EnterButton>
          </form>}
      </LogScreen>
      <MessageSection>
        <form onSubmit={onSubmitMessage} >
          <input ref={inputRef} onChange={onChangeInput} type="text" />
          <button type='submit'></button>
        </form>
      </MessageSection>
    </Wrapper>
  )
}
