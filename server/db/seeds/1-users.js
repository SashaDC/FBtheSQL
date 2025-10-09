export async function seed(knex) {
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      account_name: 'kiwi305',
      full_name: 'Graham Rosco',
      email: 'rosco.rules@xtra.co.nz',
      avatar_url: '/images/avatar1.svg',
    },
    {
      id: 2,
      account_name: 'batman',
      full_name: 'Bruce Wayne',
      email: 'flappy@hotmail.com',
      avatar_url: '/images/avatar2.svg',
    },
    {
      id: 3,
      account_name: 'ruben1901',
      full_name: 'Ruben Nova',
      email: 'nova@gmail.com',
      avatar_url: '/images/avatar3.svg',
    },
    {
      id: 4,
      account_name: 'solstice2',
      full_name: 'Erin Solstice',
      email: 'wandering@theinn.com',
      avatar_url: '/images/avatar4.svg',
    },
    {
      id: 5,
      account_name: 'theYoungOldMan',
      full_name: 'Benjamin Button',
      email: 'benjamin@gmail.com',
      avatar_url: '/images/avatar5.svg',
    },
  ])
}
