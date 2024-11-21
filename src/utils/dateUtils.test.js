const { checkTimeOverlap } = require('../utils/dateUtils');

describe('Date Utils - checkTimeOverlap', () => {
    it('should return true if the times overlap', () => {
        const specificDate = { date: '2024-11-17', start: '10:00', end: '12:00' };
        const blockedDate = { date: '2024-11-17', start: '11:00', end: '13:00' };

        expect(checkTimeOverlap(specificDate, blockedDate)).toBe(true);
    });

    it('should return false if the times do not overlap', () => {
        const specificDate = { date: '2024-11-17', start: '08:00', end: '09:00' };
        const blockedDate = { date: '2024-11-17', start: '10:00', end: '11:00' };

        expect(checkTimeOverlap(specificDate, blockedDate)).toBe(false);
    });

    it('should handle cases where specificDate has no start or end time', () => {
        const specificDate = { date: '2024-11-17' }; // Default start: '00:00', end: '23:59'
        const blockedDate = { date: '2024-11-17', start: '10:00', end: '11:00' };

        expect(checkTimeOverlap(specificDate, blockedDate)).toBe(true);
    });

    it('should handle cases where blockedDate has no start or end time', () => {
        const specificDate = { date: '2024-11-17', start: '10:00', end: '12:00' };
        const blockedDate = { date: '2024-11-17' }; // Default start: '00:00', end: '23:59'

        expect(checkTimeOverlap(specificDate, blockedDate)).toBe(true);
    });

    it('should return false if the dates are different', () => {
        const specificDate = { date: '2024-11-17', start: '10:00', end: '12:00' };
        const blockedDate = { date: '2024-11-18', start: '10:00', end: '12:00' };

        expect(checkTimeOverlap(specificDate, blockedDate)).toBe(false);
    });
});
