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
          <Card key={`${id}_${name}`}>
            <Title onClick={() => onPokemonNameClick(id)} >{id}. {name}</Title>
            <Empty />
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
  display: flex;
`
  
const Title = styled.h3`
  font-size: 16px;
  color: var(--black);
  font-weight: 500;
  
  &: hover {
    cursor: pointer;
    color: var(--primary);
    font-weight: bold;
  }
`

const Empty = styled.div`
  flex: 1;
`

export default Pokemons;