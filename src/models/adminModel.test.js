const Admin = require('./adminModel');

describe('Admin Model', () => {
  it('should create a new Admin', async () => {
    const admin = new Admin({ name: 'Admin1', email: 'admin1@example.com' });
    expect(admin.name).toBe('Admin1');
    expect(admin.email).toBe('admin1@example.com');
  });
});
