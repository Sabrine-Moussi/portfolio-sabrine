import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Test unitaire pour valider que l'application se charge correctement
test('renders portfolio header with name', () => {
  render(<App />);
  const nameElements = screen.getAllByText(/Sabrine/i);
  expect(nameElements[0]).toBeInTheDocument();
});

// Test unitaire pour valider la présence de la section navigation
test('renders navigation menu', () => {
  render(<App />);
  const aboutLinks = screen.getAllByText(/À propos/i);
  expect(aboutLinks[0]).toBeInTheDocument();
});

// Test unitaire pour valider la section expérience
test('renders experience section', () => {
  render(<App />);
  const experienceLinks = screen.getAllByText(/Expérience/i);
  expect(experienceLinks[0]).toBeInTheDocument();
});
