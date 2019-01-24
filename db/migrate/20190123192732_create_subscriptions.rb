class CreateSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.integer :channel_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :subscriptions, [:channel_id, :user_id]
  end
end
