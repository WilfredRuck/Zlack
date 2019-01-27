# == Schema Information
#
# Table name: channels
#
#  id          :bigint(8)        not null, primary key
#  title       :string           not null
#  description :text
#  is_direct   :boolean          not null
#  is_private  :boolean          not null
#  creator_id  :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Channel < ApplicationRecord
  validates :title, presence: true;
  validates :description, length: { maximum: 50 }
  validates :is_direct, :is_private, inclusion: { in: [ true, false ] }

  belongs_to :owner,
  class_name: 'User',
  foreign_key: :creator_id

  has_many :messages,
  foreign_key: :channel_id

  has_many :subscriptions

  has_many :members,
  through: :subscriptions,
  source: :user

  after_initialize :set_booleans

  def set_booleans
    self.is_private || self.is_private = false;
    self.is_direct || self.is_direct = false;
  end
end
