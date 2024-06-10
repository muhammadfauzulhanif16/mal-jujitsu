<?php
  
  namespace Database\Seeders;
  
  use App\Models\Athlete;
  use App\Models\Tournament;
  use Illuminate\Database\Seeder;
  
  class TournamentSeeder extends Seeder
  {
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      $athleteIds = Athlete::with('user')->get()->pluck('user.id')->toArray();
      
      foreach (range(1, 16) as $_) {
        Tournament::factory()->create([
          'athlete_id' => $athleteIds[array_rand($athleteIds)],
        ]);
      }
    }
  }
