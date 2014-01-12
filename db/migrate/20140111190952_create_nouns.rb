class CreateNouns < ActiveRecord::Migration
  def change
    create_table :nouns do |t|
      t.string :noun, null:false

      t.timestamps
    end
  end
end
