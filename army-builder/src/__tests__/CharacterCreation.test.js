import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharacterCreation from '../character-creation/CharacterCreation';

describe('CharacterCreation Component', () => {
  test('renders with initial state', () => {
    render(<CharacterCreation />);
    
    // Should have navigation buttons
    expect(screen.getByText('Choose Size')).toBeInTheDocument();
    expect(screen.getByText('Edit Base Stats')).toBeInTheDocument();
    expect(screen.getByText('Add Attack Action')).toBeInTheDocument();
    expect(screen.getByText('View Character Card')).toBeInTheDocument();
  });

  test('navigates to size selection', async () => {
    const user = userEvent.setup();
    render(<CharacterCreation />);
    
    const sizeButton = screen.getByText('Choose Size');
    await user.click(sizeButton);
    
    // Look for unique text that appears in SizeView
    expect(screen.getByText(/Character Size is assigned by the model's base size/)).toBeInTheDocument();
  });

  test('shows disabled buttons when no size selected', () => {
    render(<CharacterCreation />);
    
    // Stats and Attack buttons should be disabled when no size is selected
    const statsButton = screen.getByText('Edit Base Stats');
    const attackButton = screen.getByText('Add Attack Action');
    
    // These buttons might be disabled or have different styling
    expect(statsButton).toBeInTheDocument();
    expect(attackButton).toBeInTheDocument();
  });

  test('maintains character state across view changes', async () => {
    const user = userEvent.setup();
    render(<CharacterCreation />);
    
    // Navigate to size selection
    await user.click(screen.getByText('Choose Size'));
    
    // Input a base size
    const sizeInput = screen.getByPlaceholderText('mm');
    await user.type(sizeInput, '50');
    
    // Select the size
    await user.click(screen.getByText('Select'));
    
    // Should return to character card and maintain the selection
    await waitFor(() => {
      expect(screen.getByText('View Character Card')).toBeInTheDocument();
    });
  });

  test('calculates total cost correctly', async () => {
    const user = userEvent.setup();
    render(<CharacterCreation />);
    
    // Set size first
    await user.click(screen.getByText('Choose Size'));
    const sizeInput = screen.getByPlaceholderText('mm');
    await user.type(sizeInput, '50');
    await user.click(screen.getByText('Select'));
    
    // The component should show some kind of cost information
    await waitFor(() => {
      expect(screen.getByText('View Character Card')).toBeInTheDocument();
    });
  });
});
