import styled from "styled-components/native"

const StyledView = styled.View`
  z-index: 10;
  display: flex;
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100px;
  justify-content: center;
  align-items: center;
  border-bottom-color: black;
  border-bottom-width: 2px;
`

export default function Header({ children }) {
  return <StyledView>{children}</StyledView>
}
