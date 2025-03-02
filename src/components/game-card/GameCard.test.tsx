import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest';
import GameCard from './GameCard';
import * as api from '../../api';

describe('GameCard', () => {

  vi.spyOn(api, 'getRandomPokemon').mockReturnValue(
    new Promise((resolve) => {
      resolve({
        id: 1,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        names: ['bulbasaur', 'charizard', 'arbok', 'spearow']
      })
    })
  )

  vi.spyOn(api, 'checkIfCorrect').mockReturnValue(
    new Promise((resolve) => {
      resolve({
        name: 'bulbasaur',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        isCorrect: true
      })
    })
  )

  beforeEach(() => {
    render(<GameCard />)
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

    await waitFor(async () => {
      const options = await screen.findAllByRole('button');
      expect(options.length).toEqual(4);
    })
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

    await waitFor(async () => {
      const options = await screen.findAllByRole('button');
      expect(options.length).toEqual(4);
    })
  })

  it('a point is added for a correct answer', async () => {
    const options = await screen.findAllByRole('button');
    fireEvent.click(options[0]);
    await waitFor(() => {
      const score = screen.getByText("Score: 1");
      expect(score).toBeInTheDocument();
    })
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

    await waitFor(() => {
      const score = screen.getByText("Score: 0.5");
      expect(score).toBeInTheDocument();
    })
  })
})