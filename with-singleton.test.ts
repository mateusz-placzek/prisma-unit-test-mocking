/* MOCKING DON'T WORK WITH THIS PATTERN */
// It will call proper database
import { createUser, updateUsername } from './with-singleton'
import prismaMock from './singleton'

const user = {
	id: 2,
	name: 'Smith',
	email: 'smith@prisma.io',
	acceptTermsAndConditions: true,
};

describe('Test users with singleton pattern', () => {
	test('should create new user ', async () => {
		prismaMock.user.create.mockResolvedValue(user);
		await expect(createUser(user)).resolves.toEqual(user);
	});

	test('should update a users name ', async () => {
		const updatedUser = {
			...user,
			name: 'John Smith',
		}

		prismaMock.user.update.mockResolvedValue(updatedUser)
		await expect(updateUsername(updatedUser)).resolves.toEqual(updatedUser)
	});

	test('should fail if user does not accept terms', async () => {
		const falseUser = {
			...user,
			acceptTermsAndConditions: false
		};
		const mockedError = new Error('User must accept terms!');

		prismaMock.user.create.mockRejectedValue(mockedError)
		await expect(createUser(falseUser)).rejects.toEqual(mockedError);
	});
});
