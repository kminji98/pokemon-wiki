import styled from "styled-components";

const Pokemons = ({pokemons = []}) => {
  const getPokemonNo = (url) => {
    let urlToArr = url.split("/");
    return urlToArr[urlToArr.length - 2];
  }

  return (
    <Cards>
      {pokemons?.map((pokemon) => {
        const name = pokemon.name;
        const no = getPokemonNo(pokemon.url);
        return(
          <Card>
            <Title>[{no}] {name}</Title>
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

  &: hover {
    cursor: pointer;
  }
`

const Title = styled.h3`
  margin-bottom: 24px;
  font-size: 12px;
  color: var(--black);

  &: hover {
    color: var(--primary);
  }
`

export default Pokemons;