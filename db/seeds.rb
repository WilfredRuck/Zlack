# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(email: "demouser@gmail.com", password: "demouser")
Channel.create(title: "App-Academy-Alumni", description: "A place for App Academy alumni to communicate and share knowledge", creator_id: User.first.id)
Channel.create(title: "FBI", description: "A secret, but public, group of selected individuals", creator_id: User.first.id)
Channel.create(title: "Jobs-NY", description: "A place to share job openings in NY", creator_id: User.first.id)
Subscription.create(channel_id: Channel.first.id, user_id: User.first.id)