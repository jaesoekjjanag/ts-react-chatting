import React from 'react';
import styled from 'styled-components'
import Main from './component/Main';
import Top from './component/Top'

const Wrapper = styled.div`
  border: 1px solid gray;
  width: 500px;
  height: 700px;
  margin: 0 auto;
`


function App() {
  return (
    <Wrapper>
      <Top />
      <Main />
    </Wrapper>
  );
}

export default App;
