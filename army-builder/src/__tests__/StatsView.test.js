import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StatsView from '../character-creation/StatsView';

// Mock props based on actual component interface
const mockUpdateBaseStats = jest.fn();

const defaultProps = {
  attackSkill: 0,
  defense: 0,
  size: 1, // Small size
  statsCost: 0,
  strides: 0,
  updateBaseStats: mockUpdateBaseStats,
  wounds: 0,
};

describe('StatsView Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with correct title', () => {
    render(<StatsView {...defaultProps} />);
    
    expect(screen.getByText('Edit Base Stats')).toBeInTheDocument();
  });

  test('displays base stats correctly for selected size', () => {
    render(<StatsView {...defaultProps} />);
    
    // Should show base stats for size 1 (Small) - be more specific
    expect(screen.getByRole('heading', { name: /Wounds/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Defense/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Attack Skill/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Strides/ })).toBeInTheDocument();
  });

  test('shows upgrade options with costs', () => {
    render(<StatsView {...defaultProps} />);
    
    // Should show upgrade options with point costs - be more specific
    expect(screen.getByText('Base Wounds 1')).toBeInTheDocument();
    expect(screen.getAllByText('0 pts')).toHaveLength(4); // One for each stat category
  });

  test('calls updateBaseStats when stats are changed', () => {
    render(<StatsView {...defaultProps} />);
    
    // Click on a stat upgrade option - find wounds upgrade with correct text
    const woundsUpgrade = screen.getByText('Wounds 2 (+1)');
    fireEvent.click(woundsUpgrade.closest('div'));
    
    // Should trigger the update function (when update button is clicked)
    const updateButton = screen.getByText('Update Stats');
    fireEvent.click(updateButton);
    
    expect(mockUpdateBaseStats).toHaveBeenCalled();
  });

  test('handles character without size selected', () => {
    const propsWithoutSize = { ...defaultProps, size: null };
    render(<StatsView {...propsWithoutSize} />);

    // Should still render the component title
    expect(screen.getByText('Edit Base Stats')).toBeInTheDocument();
  });

  test('displays total cost correctly', () => {
    render(<StatsView {...defaultProps} />);
    
    expect(screen.getByText('Total Cost:')).toBeInTheDocument();
    expect(screen.getByText(/0 points/)).toBeInTheDocument();
  });

  test('update and reset buttons are disabled when no changes', () => {
    render(<StatsView {...defaultProps} />);
    
    const updateButton = screen.getByText('Update Stats');
    const resetButton = screen.getByText('Reset');
    
    expect(updateButton).toBeDisabled();
    expect(resetButton).toBeDisabled();
  });
});
