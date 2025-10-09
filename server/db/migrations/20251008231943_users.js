export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('account_name')
    table.string('full_name')
    table.string('email').unique().notNullable()
    table.string('avatar_url')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('users')
}
