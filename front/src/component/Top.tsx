import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  height: 50px;
  text-align:center;
  border-bottom: 1px solid gray;
  line-height: 50px;
`

export default function Top() {

  return (
    <Div>
      <span>회의실</span>

    </Div>
  )
}
