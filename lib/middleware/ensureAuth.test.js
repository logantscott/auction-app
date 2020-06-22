  
const { usernamePasswordReader } = require('./ensureAuth');

// username:password
describe('ensureAuth middleware', () => {
  // 1. read the header -> return obj with username/password
  // 2. check the password in middleware

  it('can read a username/password from the header', () => {
    const authorization = 'Basic $2a$14$9SenJ5E7gmBQQ9ZuLEfpsunakI4XiCocNhnRbYs6vRAEstRjWwdo6';
    expect(usernamePasswordReader(authorization)).toEqual({
      username: 'logan@test.com',
      password: '1234'
    });
  });
});
