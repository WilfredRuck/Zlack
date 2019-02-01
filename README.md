# 6lack

<a href="http://zlack-app.herokuapp.com">6lack</a> is a single-page messaging app inspired by Slack. It is built on Rails back-end and React/Redux front-end and utilizes RESTful architecture. It employs Action Cable to establish a live connection amongst users in each channel.

## Screenshots

![6lack_channel_preview](https://i.ibb.co/SXmzFYr/chatroom.png)
<p align="center">Channel preview</p><br />


![6lack_channel_form](https://i.ibb.co/rG2z9Bk/channel-form.png)
<p align="center">New channel form</p><br />

## Technical Specifications

6lack was built using Ruby 2.3.3, Rails framework 5.2.2, React, and Redux.

### Live Chat

One of the hardest issues I dealt with was making 6lack messages update live for all users logged in. Originally, I was updating the messaging through the Messages Controller and the Create action, which worked fine for a single user but not multiple. To get this working, I used Rails built-in functionality, ActionCable. Through this, I was able to create a message every time a user 'spoke' to a specific channel, passing in the associated data. I structured 6lack to subscribe a user to a channel once they create a message. This subscription will only happen once as there is a uniqueness check for channels and users.

```Ruby
class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_for 'chat_channel'
  end

  def speak(data)
    message = Message.create(body: data['message']['body'], channel_id: data['message']['channel_id'], author_id: data['message']['author_id'])
    Subscription.create(channel_id: data['message']['channel_id'], user_id: data['message']['author_id'])
    socket = { message: message.body }
    ChatChannel.broadcast_to('chat_channel', socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

end

```

```Ruby
class Subscription < ApplicationRecord
  validates_uniqueness_of :channel_id, scope: [:user_id]

  belongs_to :channel
  belongs_to :user
end
```


### Channels

The next biggest challenge was displaying the list of channels and direct messaging on the sidebar. I use the same model, Channel, to create a channel or direct message, which made it difficult to select all of one kind and display appropriately. To combat this, I added a `is_direct` boolean attribute to my Channel model, allowing me to identify the difference between a regular channel and a direct message. Also, direct messages should only display for users invited. Since I have a through association for my channels and users, I was able to retrieve the ids of all users associated with a given channel/direct message and cross check it with the current user's id.

```Javascript
const channels = this.props.channels.map(channel => {
  if (!channel.direct) {
    return(<ChannelNavItem key={channel.id} channel={channel} />)
  }
})

const dms = this.props.channels.map(channel => {
  if ((channel.direct) && (channel.memberIds.includes(this.props.currentUser.id))) {
    return(<ChannelNavItem key={channel.id} channel={channel} />)
  }
})
```

### Future Features

* Create a slide-in/slide-out widget to display all users in a given channel
* Users can set up direct messaging with multiple users
* Allow users to upload files, gifs, and emojis into chat

## Author

[WilfredRuck](https://github.com/WilfredRuck) - *Public code repos*