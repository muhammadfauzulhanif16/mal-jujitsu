<?php
  
  namespace Database\Seeders;
  
  use App\Models\History;
  use Illuminate\Database\Seeder;
  
  class HistorySeeder extends Seeder
  {
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      History::factory(random_int(1, 160))->create();
    }
  }
