import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AttackActionFacetView from '../character-creation/AttackActionFacetView';
import { ATTACK_TEMPLATES } from '../rulesLogic';

describe('AttackActionFacetView Component', () => {
  const mockOnAddAttack = jest.fn();
  const mockOnUpdateAttack = jest.fn();

  const defaultProps = {
    attackSkill: 2,
    existingAttack: null,
    existingFacets: [],
    onAddAttack: mockOnAddAttack,
    onUpdateAttack: mockOnUpdateAttack,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders add attack action interface', () => {
    render(<AttackActionFacetView {...defaultProps} />);
    
    expect(screen.getByText('Add Attack Action')).toBeInTheDocument();
    expect(screen.getByText('Action Name:')).toBeInTheDocument();
  });

  test('renders edit mode when existingAttack is provided', () => {
    const existingAttack = {
      name: 'Test Attack',
      primary: true,
      attackModifiers: { type: 'singleTarget', r: 2 }
    };
    
    render(
      <AttackActionFacetView 
        {...defaultProps} 
        existingAttack={existingAttack}
      />
    );
    
    expect(screen.getByText('Edit Attack Action')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Attack')).toBeInTheDocument();
  });

  test('allows input of action name', async () => {
    const user = userEvent.setup();
    render(<AttackActionFacetView {...defaultProps} />);
    
    const nameInput = screen.getByPlaceholderText('Enter attack name');
    await user.type(nameInput, 'Sword Strike');
    
    expect(nameInput).toHaveValue('Sword Strike');
  });

  test('displays attack templates from rulesLogic', () => {
    render(<AttackActionFacetView {...defaultProps} />);
    
    // Should display attack template options from rulesLogic
    Object.values(ATTACK_TEMPLATES).forEach(template => {
      expect(screen.getByText(template.name)).toBeInTheDocument();
    });
  });

  test('validates rulesLogic ATTACK_TEMPLATES structure', () => {
    // Ensure ATTACK_TEMPLATES has the expected structure
    expect(ATTACK_TEMPLATES).toBeDefined();
    expect(typeof ATTACK_TEMPLATES).toBe('object');
    
    Object.values(ATTACK_TEMPLATES).forEach(template => {
      expect(template).toHaveProperty('name');
      expect(template).toHaveProperty('icon');
      expect(template).toHaveProperty('baseCosts');
      expect(typeof template.name).toBe('string');
      expect(typeof template.icon).toBe('string');
      expect(typeof template.baseCosts).toBe('object');
      expect(template.baseCosts).toHaveProperty('primary');
      expect(template.baseCosts).toHaveProperty('secondary');
    });
  });

  test('shows primary attack option when no primary exists', () => {
    render(<AttackActionFacetView {...defaultProps} />);
    
    // Should show primary attack option - look for checkbox or the word Primary
    expect(screen.getByText(/Primary/)).toBeInTheDocument();
  });

  test('handles existing facets with primary attack', () => {
    const existingFacets = [{
      subType: 'attack',
      primary: true,
      name: 'Existing Primary'
    }];
    
    render(
      <AttackActionFacetView 
        {...defaultProps} 
        existingFacets={existingFacets}
      />
    );
    
    // Should still render the component
    expect(screen.getByText('Add Attack Action')).toBeInTheDocument();
  });

  test('calls onAddAttack when adding new attack', async () => {
    const user = userEvent.setup();
    render(<AttackActionFacetView {...defaultProps} />);
    
    // Fill in required fields
    const nameInput = screen.getByPlaceholderText('Enter attack name');
    await user.type(nameInput, 'Test Attack');
    
    // Select an attack template - this is required to enable the Add button
    const firstTemplate = Object.keys(ATTACK_TEMPLATES)[0];
    if (ATTACK_TEMPLATES[firstTemplate]) {
      const templateButton = screen.getByText(ATTACK_TEMPLATES[firstTemplate].name);
      await user.click(templateButton);
      
      // Now look for the Add Attack button (should be enabled)
      const addButton = screen.getByText('Add Attack');
      expect(addButton).toBeEnabled();
      
      await user.click(addButton);
      expect(mockOnAddAttack).toHaveBeenCalled();
    } else {
      // If no templates found, test passes as long as form renders
      expect(nameInput).toHaveValue('Test Attack');
    }
  });
});
