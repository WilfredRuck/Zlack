# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(username:'DemoUser', email: 'demouser@gmail.com', password: 'demouser')
Channel.create(title:"App Academy 2019", creator_id: User.first.id)
Channel.create(title:"Student Union", creator_id: User.first.id)
Channel.create(title:"CopsR'US", creator_id: User.first.id)
Subscription.create(channel_id: Channel.first.id, user_id: User.first.id)
Message.create(body: "demo message", channel_id: Channel.first.id, author_id: User.first.id)
