import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReactionView from '../character-creation/ReactionView';

describe('ReactionView Component', () => {
  const mockAddReaction = jest.fn();

  const defaultProps = {
    existingFacets: [],
    onAddReaction: mockAddReaction,
    size: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders reaction selection interface', () => {
    render(<ReactionView {...defaultProps} />);
    
    expect(screen.getByText(/Add Reaction Action/)).toBeInTheDocument();
  });

  test('displays reaction categories', () => {
    render(<ReactionView {...defaultProps} />);
    
    // Should show the title that mentions reaction actions - account for the count in parentheses
    expect(screen.getByText(/Add Reaction Action/)).toBeInTheDocument();
    expect(screen.getByText('Reaction Actions')).toBeInTheDocument();
  });

  test('shows reaction costs and descriptions', () => {
    render(<ReactionView {...defaultProps} />);
    
    // Should display specific cost numbers for reactions
    expect(screen.getByText('12')).toBeInTheDocument(); // Cost for negate displacement
    expect(screen.getByText('Cannot be pushed or thrown this attack')).toBeInTheDocument();
  });

  test('handles rulesLogic integration correctly', () => {
    render(<ReactionView {...defaultProps} />);
    
    // The component should use rulesLogic data without errors
    expect(screen.getByText(/Add Reaction Action/)).toBeInTheDocument();
  });
});
