import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Test unitaire pour valider que l'application se charge correctement
test('renders portfolio header with name', () => {
  render(<App />);
  const nameElement = screen.getByText(/Sabrine/i);
  expect(nameElement).toBeInTheDocument();
});

// Test unitaire pour valider la présence de la section navigation
test('renders navigation menu', () => {
  render(<App />);
  const aboutLink = screen.getByText(/À propos/i);
  expect(aboutLink).toBeInTheDocument();
});

// Test unitaire pour valider la section expérience
test('renders experience section', () => {
  render(<App />);
  const experienceLink = screen.getByText(/Expérience/i);
  expect(experienceLink).toBeInTheDocument();
});
