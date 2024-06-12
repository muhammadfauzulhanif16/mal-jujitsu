<?php
  
  namespace Database\Seeders;
  
  use App\Models\Evaluation;
  use App\Models\Exercise;
  use App\Models\ExerciseEvaluation;
  use App\Models\SubSubCriteria;
  use Illuminate\Database\Seeder;
  
  class EvaluationSeeder extends Seeder
  {
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      $exerciseIds = Exercise::all()->pluck('id');
      $subSubCriteriaIds = SubSubCriteria::all()->pluck('id');
      
      ExerciseEvaluation::factory(random_int(1, 16))
        ->create(function () use (&$exerciseIds) {
          $randomExerciseId = $exerciseIds->random();
          
          $exerciseIds = $exerciseIds->filter(function ($exerciseId) use ($randomExerciseId) {
            return $exerciseId !== $randomExerciseId;
          });
          
          return [
            'exercise_id' => $randomExerciseId,
          ];
        })
        ->map(function ($exerciseEvaluation) use ($subSubCriteriaIds) {
          Evaluation::factory()
            ->count($subSubCriteriaIds->count())
            ->create([
              'exercise_evaluation_id' => $exerciseEvaluation->id,
              'sub_sub_criteria_id' => $subSubCriteriaIds->random(),
            ]);
        });
    }
  }
