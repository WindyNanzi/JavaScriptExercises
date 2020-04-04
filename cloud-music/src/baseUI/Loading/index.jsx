import React from 'react'
import styled, { keyframes } from 'styled-components'

const loading = keyframes`
  0%, 100% {
    transform: scale(0.0);
  }
  50% {
    transform: scale(1.0);
  }
`

const LoadingWrapper = styled.div`

`