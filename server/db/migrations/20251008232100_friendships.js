export async function up(knex) {
  return knex.schema.createTable('friendships', (table) => {
    table.increments('id').primary()
    table
      .integer('user_1')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE')
    table
      .integer('user_2')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE')
    table.unique(['user_1', 'user_2'])
  })
}

export async function down(knex) {
  return knex.schema.dropTable('friendships')
}
