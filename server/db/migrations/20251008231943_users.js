export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('username').unique().notNullable()
    table.string('first_name')
    table.string('last_name')
    table.string('email').unique().notNullable()
    table.string('avatar_url')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('users')
}
