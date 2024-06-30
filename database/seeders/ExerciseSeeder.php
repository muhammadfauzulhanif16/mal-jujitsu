<?php
  
  namespace Database\Seeders;
  
  use App\Models\Athlete;
  use App\Models\Exercise;
  use App\Models\ExerciseAthlete;
  use Illuminate\Database\Seeder;
  
  class ExerciseSeeder extends Seeder
  {
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      Exercise::factory(random_int(1, 16))->create()->each(function (Exercise $exercise): void {
        $athleteIds = Athlete::pluck('user_id')->toArray();
        shuffle($athleteIds);
        $athleteIds = array_slice($athleteIds, 0, random_int(1, 16));
        
        foreach ($athleteIds as $athleteId) {
          ExerciseAthlete::create([
            'exercise_id' => $exercise->id,
            'athlete_id' => $athleteId,
          ]);
        }
      });
    }
  }
