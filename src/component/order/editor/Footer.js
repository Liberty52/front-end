import React from "react"
import { styled } from "baseui"
import Common from "./Common"

const Container = styled("div", ({ $theme }) => ({
    background: $theme.colors.white,
  }))

const Footer = () => {

  return (
    <Container>
      <Common />
    </Container>
  )
}

export default Footer
