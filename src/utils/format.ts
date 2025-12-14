// Utility functions for formatting

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (date: Date | string): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

/**
 * Parse price string to number, handling various formats
 * Removes currency symbols, commas, and other non-numeric characters
 */
export const parsePrice = (price: string): number => {
  // Remove currency symbols, spaces, commas and extract the numeric value
  const numericString = price.replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(numericString);
  return isNaN(parsed) ? 0 : parsed;
};
