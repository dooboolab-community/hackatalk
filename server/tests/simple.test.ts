import { createTestContext } from './createTestContext';

it('simple test with createTestContext', async () => {
  const { prisma, client } = await createTestContext();

  prisma.user.findUnique.mockImplementation(() => ({
    id: '123',
  }));

  const res = await client.request(`
    query {
      me { id }
    }
  `);

  // Test res here.
  console.log(res);
});
