const checkTimeOverlap = (specificDate, blockedDate) => {
    const specificStart = new Date(`${specificDate.date}T${specificDate.start || '00:00'}`);
    const specificEnd = new Date(`${specificDate.date}T${specificDate.end || '23:59'}`);
    const blockedStart = new Date(`${blockedDate.date}T${blockedDate.start || '00:00'}`);
    const blockedEnd = new Date(`${blockedDate.date}T${blockedDate.end || '23:59'}`);
  
    return specificStart < blockedEnd && specificEnd > blockedStart; // Overlap condition
  };
  
  module.exports = { checkTimeOverlap };
  