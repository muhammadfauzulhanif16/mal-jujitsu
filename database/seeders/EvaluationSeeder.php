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
      $exercises = Exercise::all();
      $subSubCriterias = SubSubCriteria::all();
      
      foreach ($exercises as $exercise) {
        $exerciseEvaluation = ExerciseEvaluation::factory()->create([
          'exercise_id' => $exercise->id,
        ]);
        
        foreach ($subSubCriterias as $subSubCriteria) {
          Evaluation::factory()->create([
            'exercise_evaluation_id' => $exerciseEvaluation->id,
            'sub_sub_criteria_id' => $subSubCriteria->id,
          ]);
        }
      }
    }
  }
