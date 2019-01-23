class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :avatar
      t.string :password_digest
      t.string :session_token

      t.timestamps
    end

    add_index :users, [:username, :email, :session_token], unique: true
  end
end
