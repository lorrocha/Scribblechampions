class CreateAdjectives < ActiveRecord::Migration
  def change
    create_table :adjectives do |t|
      t.string :adjective, null:false

      t.timestamps
    end
  end
end
