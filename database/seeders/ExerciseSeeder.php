<?php
  
  namespace Database\Seeders;
  
  use App\Models\Exercise;
  use Illuminate\Database\Seeder;
  
  class ExerciseSeeder extends Seeder
  {
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      Exercise::factory(random_int(1, 16))->create();
    }
  }
