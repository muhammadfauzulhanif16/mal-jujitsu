<?php
  
  namespace Database\Seeders;
  
  use App\Models\Athlete;
  use App\Models\Coach;
  use App\Models\Exercise;
  use Illuminate\Database\Seeder;
  
  class ExerciseSeeder extends Seeder
  {
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      $athleteIds = Athlete::with('user')->get()->pluck('user.id')->toArray();
      $coachIds = Coach::with('user')->get()->pluck('user.id')->toArray();
      
      foreach (range(1, 16) as $_) {
        Exercise::factory()->create([
          'athlete_id' => $athleteIds[array_rand($athleteIds)],
          'coach_id' => $coachIds[array_rand($coachIds)],
        ]);
      }
    }
  }
