# CLI-Based Golf Card Game

This is a simplified CLI-based Golf card game implemented in JavaScript, where two players compete to achieve the lowest score. The game follows modified Golf card game rules with unique scoring mechanics, including handling pairs of cards and special card values.

## Table of Contents

- [Project Overview](#project-overview)
- [Rules](#rules)
- [Features](#features)
- [Installation](#installation)

## Project Overview

This project is a command-line interface (CLI) version of a Golf card game for two players. The goal of the game is to minimize your score by drawing, replacing, or discarding cards. Pairs of cards are worth `0` points, with some special rules for certain cards such as `7`s and `Jacks`. The game ends when all players have flipped all their cards.

## Rules

- **Players**: Two players are dealt four cards each.
- **Objective**: The goal is to end the game with the lowest score.
- **Scoring**:
  - Number cards are worth their face value.
  - Special cards:
    - `7`: Worth `0` points.
    - `Jack`: Worth `-1` points.
    - `Queen`: Worth `12` points.
    - `King`: Worth `13` points.
  - **Pairs**:
    - Pairs of two matching cards (except for `7`s and `Jacks`) are worth `0` points.
    - If there are more than two matching cards, the pair rule does not apply, and the cards retain their original values.

## Features

- Two-player game with turns displayed via the terminal.
- Players can draw cards from the deck or take cards from the discard pile.
- Handle special cards (`7`, `Jack`, `Queen`, `King`).
- Pair matching system where exactly two matching cards are scored as `0`.
- Game ends when all players have revealed their cards.
- Simple score calculation based on the card values and pairs.

## Installation
Clone the repository to your local machine:
   ```bash
   git clone https://github.com/wardkadan1/cli-golf-card-game.git
