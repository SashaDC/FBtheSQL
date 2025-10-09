export async function seed(knex) {
  await knex('friendships').del()
  await knex('friendships').insert([
    {
      id: 1,
      user_1: 1,
      user_2: 2,
    },
    {
      id: 2,
      user_1: 2,
      user_2: 3,
    },
    {
      id: 3,
      user_1: 1,
      user_2: 4,
    },
    {
      id: 4,
      user_1: 3,
      user_2: 4,
    },
    {
      id: 5,
      user_1: 1,
      user_2: 3,
    },
  ])
}
