<?php
  
  namespace Database\Seeders;
  
  use App\Models\Evaluation;
  use App\Models\Exercise;
  use App\Models\ExerciseEvaluation;
  use App\Models\SubSubCriteria;
  use Illuminate\Database\Seeder;
  
  class ExerciseEvaluationSeeder extends Seeder
  {
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      ExerciseEvaluation::factory(random_int(1, Exercise::count()))->create()->each(function ($exerciseEvaluation) {
        if ($exerciseEvaluation) {
          $subSubCriteriaIds = SubSubCriteria::all()->pluck('id')->toArray();
          $evaluationsData = array_map(function ($subSubCriteriaId) use ($exerciseEvaluation) {
            return [
              'exercise_evaluation_id' => $exerciseEvaluation->id,
              'sub_sub_criteria_id' => $subSubCriteriaId,
            ];
          }, $subSubCriteriaIds);
          
          Evaluation::factory()->createMany($evaluationsData);
        }
      });
    }
  }
