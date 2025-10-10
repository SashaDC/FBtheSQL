export async function seed(knex) {
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      username: 'kiwi305',
      first_name: 'Graham ',
      last_name: 'Rosco',
      email: 'rosco.rules@xtra.co.nz',
      avatar_url: '/images/avatar1.svg',
    },
    {
      id: 2,
      username: 'batman',
      first_name: 'Bruce',
      last_name: 'Wayne',
      email: 'flappy@hotmail.com',
      avatar_url: '/images/avatar2.svg',
    },
    {
      id: 3,
      username: 'ruben1901',
      first_name: 'Ruben ',
      last_name: 'Nova',
      email: 'nova@gmail.com',
      avatar_url: '/images/avatar3.svg',
    },
    {
      id: 4,
      username: 'solstice2',
      first_name: 'Erin ',
      last_name: 'Solstice',
      email: 'wandering@theinn.com',
      avatar_url: '/images/avatar4.svg',
    },
    {
      id: 5,
      username: 'theYoungOldMan',
      first_name: 'Benjamin ',
      last_name: 'Button',
      email: 'benjamin@gmail.com',
      avatar_url: '/images/avatar5.svg',
    },
  ])
}
