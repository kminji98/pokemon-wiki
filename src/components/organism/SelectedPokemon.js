import styled from "styled-components";

const SelectedPokemon = ({pokemon = {}, bases = [], nexts = [], notFoundPokemonId = '', onPokemonNameClick = () => {}}) => {
  const getCapitalizedString = (str = '') => { return (str.charAt(0).toUpperCase() + str.slice(1)); }

  return (
    <Wrap key={`selected_${pokemon.id}`}>
      { notFoundPokemonId &&  <NotFound>Cannot find "No.{ notFoundPokemonId }". Try other number!</NotFound> }
      <Card>

        <TextWrap>
          { pokemon.id && <Id>No. { pokemon.id }</Id> }
          <Title>{ getCapitalizedString( pokemon.name ) }</Title>
        </TextWrap>
        { pokemon.sprites?.front_default && <PokemonImg alt={ pokemon.name } title={ pokemon.name }  src={ pokemon.sprites.front_default } /> }
      </Card>
      <EvolutionWrap>
        {
          bases.length > 0 &&
            <BaseWrap>
              BASE LEVEL :
              { bases.map((base, i) => {
                const baseName = getCapitalizedString( base.name );
                return (
                    <LinkWrap key={`${base.id}_${baseName}`} >
                      <Link onClick={() => onPokemonNameClick(base.id)}>{base.id}. { baseName }</Link>
                      {bases.length-1 !== i && <Arrow> {'>'} </Arrow>}
                    </LinkWrap>
                  )}) 
              }
            </BaseWrap>
        }

        {
          nexts.length > 0 &&
            <NextWrap>
              NEXT LEVEL :
              { nexts.map((next, i) => {
                const nextName = getCapitalizedString(next.name);

                return (
                    <LinkWrap key={`${next.id}_${nextName}`} >
                      <Link onClick={() => onPokemonNameClick(next.id)}>{ next.id }. { nextName }</Link>
                      {nexts.length-1 !== i && <Arrow> {'>'} </Arrow>}
                    </LinkWrap>
                  )}) 
              }
              
            </NextWrap>
        }

      </EvolutionWrap>
    </Wrap>
  )
}

const Wrap = styled.div`
  flex: 3;
  padding-left: 50px;
  top: 23%;
  right: 30%;
  position: fixed;

  @media (max-width: 767px){
    position: unset;
    padding: 0 30px 50px 30px;
  }
`

const Card = styled.div`
  width: 500px;
  display: flex;
  align-items: center;
`

const TextWrap = styled.div`
  margin-right: 20px;
`

const Title = styled.h1`
  font-size: 48px;
`

const Id = styled.h2`
  font-size: 48px;
`

const PokemonImg = styled.img`
  width: 240px;
`

const Link = styled.div`
  text-decoration: underline;
  cursor: pointer;
  color: var(--navy);
  font-size: 24px;
  margin: 0 20px;
`

const EvolutionWrap = styled.div`
  font-size: 18px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const BaseWrap = styled.div`
  display: flex;
  align-items: center;
`

const NextWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`

const Arrow = styled.div``

const NotFound = styled.div`
  color: red;
  font-size: 24px;
  font-weight: 700;
`

const LinkWrap = styled.div`
  display: flex;
  align-items: center;
`

export default SelectedPokemon;