import styled from 'styled-components/native';
import SearchBar from './SearchBar';

const StyledView = styled.View`
  z-index: 10;
  display: flex;
  flex-direction: row;
  background-color: #E65451;
  height: 100px;
  justify-content: center;
  align-items: center;
`

export default function Header() {

  return (
    <StyledView>
      <SearchBar/>
    </StyledView>
  );
}