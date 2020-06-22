  
const { usernamePasswordReader } = require('./ensureAuth');

// username:password
describe('ensureAuth middleware', () => {
  // 1. read the header -> return obj with username/password
  // 2. check the password in middleware

  it('can read a username/password from the header', () => {
    const authorization = 'Basic bG9nYW5AdGVzdC5jb206MTIzNA==';
    expect(usernamePasswordReader(authorization)).toEqual({
      username: 'logan@test.com',
      password: '1234'
    });
  });
});
