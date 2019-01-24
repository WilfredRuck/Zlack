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

require 'test_helper'

class ChannelTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
