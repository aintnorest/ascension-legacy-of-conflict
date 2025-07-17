import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharacterCreation from '../character-creation/CharacterCreation';
import { BASE_STATS_TABLE, STAT_COSTS_AND_MAX, ATTACK_TEMPLATES, REACTION_ACTIONS } from '../rulesLogic';

describe('Character Creation Integration Tests', () => {
  test('rulesLogic data consistency across all components', () => {
    // This test validates that all the imported rulesLogic data structures are consistent
    
    // BASE_STATS_TABLE should be properly structured
    expect(BASE_STATS_TABLE).toBeDefined();
    expect(Array.isArray(BASE_STATS_TABLE)).toBe(true);
    BASE_STATS_TABLE.forEach(entry => {
      expect(entry).toHaveProperty('min');
      expect(entry).toHaveProperty('max');
      expect(entry).toHaveProperty('value');
      expect(entry).toHaveProperty('sizeCost');
    });
    
    // STAT_COSTS_AND_MAX should have all required stats
    expect(STAT_COSTS_AND_MAX).toBeDefined();
    ['wounds', 'defense', 'attackSkill', 'strides'].forEach(stat => {
      expect(STAT_COSTS_AND_MAX).toHaveProperty(stat);
      expect(STAT_COSTS_AND_MAX[stat]).toHaveProperty('costs');
      expect(STAT_COSTS_AND_MAX[stat]).toHaveProperty('maxUpgrades');
    });
    
    // ATTACK_TEMPLATES should be properly structured
    expect(ATTACK_TEMPLATES).toBeDefined();
    Object.values(ATTACK_TEMPLATES).forEach(template => {
      expect(template).toHaveProperty('name');
      expect(template).toHaveProperty('icon');
      expect(template).toHaveProperty('baseCosts');
    });
    
    // REACTION_ACTIONS should be properly structured
    expect(REACTION_ACTIONS).toBeDefined();
    Object.values(REACTION_ACTIONS).forEach(reaction => {
      expect(reaction).toHaveProperty('name');
      expect(reaction).toHaveProperty('cost');
      expect(reaction).toHaveProperty('category');
    });
  });

  test('character creation workflow with size selection', async () => {
    const user = userEvent.setup();
    render(<CharacterCreation />);
    
    // Should start with navigation buttons
    expect(screen.getByText('Choose Size')).toBeInTheDocument();
    
    // Navigate to size selection
    await user.click(screen.getByText('Choose Size'));
    
    // Should show size selection interface
    expect(screen.getByLabelText('Model Base Size:')).toBeInTheDocument();
    
    // Enter a size and select it
    const sizeInput = screen.getByPlaceholderText('mm');
    await user.type(sizeInput, '50');
    await user.click(screen.getByText('Select'));
    
    // Should enable previously disabled buttons
    const statsButton = screen.getByText('Edit Base Stats');
    expect(statsButton).not.toBeDisabled();
  });

  test('components render without errors using rulesLogic', () => {
    // This test ensures that all components can render with rulesLogic data
    render(<CharacterCreation />);
    
    expect(screen.getByText('Choose Size')).toBeInTheDocument();
    expect(screen.getByText('Edit Base Stats')).toBeInTheDocument();
    expect(screen.getByText('Add Attack Action')).toBeInTheDocument();
    expect(screen.getByText('Add Reaction')).toBeInTheDocument();
  });
});
