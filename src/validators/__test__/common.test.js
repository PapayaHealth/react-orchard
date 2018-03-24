import * as validators from '../common';

describe('email', () => {
  it('should return undefined if valid email', () => {
    expect(validators.email('test@test.com')).toEqual(void 0);
  });

  it('should return message if invalid email', () => {
    expect(validators.email('someemail'))
      .toEqual(expect.stringMatching('Invalid email address'));
  });
});

describe('required', () => {
  it('should return undefined if value supplied', () => {
    expect(validators.required('arstrst')).toEqual(void 0);
  });

  it('should return message if no value supplied', () => {
    expect(validators.required(void 0))
      .toEqual(expect.stringMatching('Required'));
  });
});