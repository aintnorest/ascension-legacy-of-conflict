import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SizeView from '../character-creation/SizeView';
import { BASE_STATS_TABLE } from '../rulesLogic';

describe('SizeView Component', () => {
  const mockSetSize = jest.fn();

  beforeEach(() => {
    mockSetSize.mockClear();
  });

  test('renders size selection interface', () => {
    render(<SizeView setSize={mockSetSize} />);
    
    expect(screen.getByText('Choose Size')).toBeInTheDocument();
    expect(screen.getByText('Model Base Size:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('mm')).toBeInTheDocument();
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  test('displays all size categories from rulesLogic', () => {
    render(<SizeView setSize={mockSetSize} />);
    
    // Verify that the table displays all entries from BASE_STATS_TABLE
    // Check for the range text which should be unique
    BASE_STATS_TABLE.forEach(row => {
      expect(screen.getByText(`${row.min}-${row.max}mm`)).toBeInTheDocument();
    });
  });

  test('allows user to input base size', async () => {
    const user = userEvent.setup();
    render(<SizeView setSize={mockSetSize} />);
    
    const input = screen.getByPlaceholderText('mm');
    await user.type(input, '75');
    
    expect(input).toHaveValue(75);
  });

  test('selects correct size category based on input', async () => {
    const user = userEvent.setup();
    render(<SizeView setSize={mockSetSize} />);
    
    const input = screen.getByPlaceholderText('mm');
    const selectButton = screen.getByText('Select');
    
    // Test with a size that should match a specific category
    await user.type(input, '50');
    await user.click(selectButton);
    
    // Find the expected size category for 50mm
    const expectedSize = BASE_STATS_TABLE.find(row => 50 >= row.min && 50 <= row.max);
    expect(mockSetSize).toHaveBeenCalledWith(expectedSize, 50);
  });

  test('handles edge cases for size boundaries', async () => {
    const user = userEvent.setup();
    render(<SizeView setSize={mockSetSize} />);
    
    const input = screen.getByPlaceholderText('mm');
    const selectButton = screen.getByText('Select');
    
    // Test minimum boundary
    const minSize = BASE_STATS_TABLE[0];
    await user.clear(input);
    await user.type(input, minSize.min.toString());
    await user.click(selectButton);
    
    expect(mockSetSize).toHaveBeenCalledWith(minSize, minSize.min);
  });

  test('highlights selected size in table', () => {
    const selectedSize = BASE_STATS_TABLE[1].value; // Use second entry for testing
    render(<SizeView setSize={mockSetSize} size={selectedSize} />);
    
    // The selected row should have a different background color in the first table
    // Find the table with "Base Size" header to target the first table specifically
    const baseSizeHeader = screen.getByText('Base Size');
    const firstTable = baseSizeHeader.closest('table');
    
    const highlightedRows = within(firstTable).getAllByRole('row').filter(row => 
      row.classList.contains('bg-sky-200')
    );
    expect(highlightedRows).toHaveLength(1);
  });

  test('displays size input value when mm prop is provided', () => {
    const testMm = 85;
    render(<SizeView setSize={mockSetSize} mm={testMm} />);
    
    const input = screen.getByPlaceholderText('mm');
    expect(input).toHaveValue(testMm);
  });

  test('validates that rulesLogic BASE_STATS_TABLE is properly structured', () => {
    // This test ensures the data structure from rulesLogic is what the component expects
    expect(BASE_STATS_TABLE).toBeDefined();
    expect(Array.isArray(BASE_STATS_TABLE)).toBe(true);
    expect(BASE_STATS_TABLE.length).toBeGreaterThan(0);
    
    // Test that each entry has required properties
    BASE_STATS_TABLE.forEach(entry => {
      expect(entry).toHaveProperty('min');
      expect(entry).toHaveProperty('max');
      expect(entry).toHaveProperty('value');
      expect(typeof entry.min).toBe('number');
      expect(typeof entry.max).toBe('number');
      expect(typeof entry.value).toBe('number');
    });
  });
});
