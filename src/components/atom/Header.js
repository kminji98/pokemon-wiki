import styled from 'styled-components';

const Header = ({}) => {

  return(
    <HeaderWrap>
      Pokemon Wiki
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  font-size: 32px;
  text-align: center;
  font-weight: bold;
  background-color: var(--navy);
  color: var(--primary);
  padding-left: 30px;
`




export default Header;