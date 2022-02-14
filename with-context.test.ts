import { MockContext, Context, createMockContext } from './contexts/test';
import { createUser, updateUsername } from './with-context';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

const user = {
  id: 1,
  name: 'Rich',
  email: 'hello@prisma.io',
  acceptTermsAndConditions: true,
};

describe('Test users with dependency injection', () => {
  test('should create new user ', async () => {
    mockCtx.prisma.user.create.mockResolvedValue(user);

    await expect(createUser(user, ctx)).resolves.toEqual(user);
  });

  test('should update a users name ', async () => {
    const updatedUser = {
      ...user,
      name: 'John Rich',
    };

    mockCtx.prisma.user.update.mockResolvedValue(updatedUser);
    await expect(updateUsername(updatedUser, ctx)).resolves.toEqual(
      updatedUser,
    );
  });

  test('should fail if user does not accept terms', async () => {
    const falseUser = {
      ...user,
      acceptTermsAndConditions: false,
    };
    const mockedError = new Error('User must accept terms!');

    mockCtx.prisma.user.create.mockRejectedValue(mockedError);
    await expect(createUser(falseUser, ctx)).rejects.toEqual(mockedError);
  });
});
