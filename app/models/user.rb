# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string
#  email           :string
#  avatar          :string
#  password_digest :string
#  session_token   :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :email, :avatar, :password_digest, :session_token, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :channels,
  foreign_key: :creator_id

  has_many :messages,
  foreign_key: :author_id

  has_many :subscriptions

  has_many :chatrooms,
  through: :subscriptions,
  source: :channel

  
  attr_reader :password

  after_initialize :ensure_session_token, :assign_avatar, :assign_username

  LINKS = [
    "https://i.ibb.co/J5mGCy3/fox.png",
    "https://i.ibb.co/b2N6bsD/frog.png",
    "https://i.ibb.co/DYM8GGZ/pig.png",
    "https://i.ibb.co/9hzZkx3/monkey.png",
    "https://i.ibb.co/5rX2RYG/cow.png",
    "https://i.ibb.co/dQWQd2Y/wolf.png",
    "https://i.ibb.co/9ns4nHv/dog.png",
    "https://i.ibb.co/XX8XHc0/cat.png"
  ]

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.is_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def assign_avatar
    self.avatar ||= LINKS.sample
  end

  def assign_username
    if (self.email != "")
      self.username ||= self.email.split("@").first.capitalize
    else
      self.username = ""
    end
  end

end
