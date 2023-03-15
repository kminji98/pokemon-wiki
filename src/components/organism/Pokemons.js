import styled from "styled-components";

const Pokemons = ({pokemons = [], onPokemonNameClick}) => {
  const getPokemonIdx = (url) => {
    let urlToArr = url.split("/");
    return urlToArr[urlToArr.length - 2];
  }

  return (
    <Cards>
      {pokemons && pokemons?.map((pokemon) => {
        const name = pokemon.name;
        const id = getPokemonIdx(pokemon.url);
        return(
          <Card>
            <Title onClick={() => onPokemonNameClick(id)} >{id}. {name}</Title>
          </Card>
        )
      })}
    </Cards>
  )
}

const Cards = styled.div`
  flex: 1;

`
const Card = styled.div`
  flex: 1;

`
  
const Title = styled.h3`
  margin-bottom: 24px;
  font-size: 16px;
  color: var(--black);
  font-weight: 500;
  
  &: hover {
    cursor: pointer;
    color: var(--primary);
    font-weight: bold;
  }
`

export default Pokemons;