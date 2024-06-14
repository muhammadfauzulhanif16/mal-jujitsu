<?php
  
  namespace Database\Seeders;
  
  use App\Models\Tournament;
  use Illuminate\Database\Seeder;
  
  class TournamentSeeder extends Seeder
  {
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      Tournament::factory(random_int(1, 160))->create();
    }
  }
