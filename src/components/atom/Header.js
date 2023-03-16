import styled from 'styled-components';
import { useState } from 'react';

const Header = ({ onSearch = () => {} }) => {
  const [number, setNumber] = useState();


  const onSearchKeyPress = e => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
      setNumber('');
    }
  };

  return(
    <HeaderWrap>
      <HeaderTitle>Pokemon Wiki</HeaderTitle>
      <SearchWrap>
        Press Enter to search
        <Input type={"number"} placeholder="Search pokemon's number!" value={number} onChange={e=> { setNumber(e.target.value); }} onKeyPress={onSearchKeyPress} />
      </SearchWrap>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  font-weight: bold;
  background-color: var(--navy);
  color: var(--primary);
  padding: 0px 30px;
  position: fixed;
  justify-content: space-between;
`
  
const HeaderTitle = styled.h2`
  font-size: 32px;
`

const SearchWrap = styled.div`
  margin-right: 60px;
`

const Input = styled.input`
  height: 30px;
  margin-left: 20px;
  padding: 0 10px;
  font-size: 18px;
  width: 240px;
`


export default Header;