import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest';
import GameCard from './GameCard';
import { mockPokemonFetch } from './testUtils';
import * as api from '../../api';
import * as gameCardUtils from './GameCardUtils';

describe('GameCard', () => {

  vi.spyOn(gameCardUtils, 'selectFour').mockReturnValue([
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
    { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
    { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
  ])

  vi.spyOn(api, 'getPokemonDetails').mockReturnValue(
    new Promise((resolve) =>
      resolve({
        "name": "bulbasaur",
        "sprites": {
          "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
        }
      }),
    ) as any,
  )

  beforeEach(() => {
    render(<GameCard initialPokemon={mockPokemonFetch["results"]} />)
  })

  it('renders correct amount of options on screen load', async () => {
    const options = await screen.findAllByRole('button');
    expect(options).toHaveLength(5);
  })

  it('removes an option after clicking to remove an option', async () => {
    let removeBtn;
    await waitFor(async () => {
      removeBtn = screen.getByText('Remove an incorrect option for half points?');
      expect(removeBtn).toBeInTheDocument();
    })
    if (removeBtn) fireEvent.click(removeBtn);
    const options = await screen.findAllByRole('button');

    expect(options.length).toEqual(4);
  })

  it('can only remove one options per round', async () => {
    let removeBtn;
    await waitFor(async () => {
      removeBtn = screen.getByText('Remove an incorrect option for half points?');
      expect(removeBtn).toBeInTheDocument();
    })
    if (removeBtn) {
      fireEvent.click(removeBtn);
      fireEvent.click(removeBtn);
    }
    const options = await screen.findAllByRole('button');
    screen.debug();
    expect(options.length).toEqual(4);
  })

  it('a point is added for a correct answer', async () => {
    const options = await screen.findAllByRole('button');
    fireEvent.click(options[0]);
    const score = screen.getByText("Score: 1");

    expect(score).toBeInTheDocument();
  })

  it('a half point is added for a correct answer after removing an option is clicked', async () => {
    let removeBtn;
    await waitFor(async () => {
      removeBtn = screen.getByText('Remove an incorrect option for half points?');
      expect(removeBtn).toBeInTheDocument();
    })
    if (removeBtn) fireEvent.click(removeBtn);
    const options = await screen.findAllByRole('button');
    fireEvent.click(options[0]);
    const score = screen.getByText("Score: 0.5");

    expect(score).toBeInTheDocument();
  })
})