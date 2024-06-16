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
//      $exerciseIds = Exercise::pluck('id')->unique()->toArray();
      
      $exerciseEvaluations = ExerciseEvaluation::factory(random_int(1, Exercise::count()))->create();
      foreach ($exerciseEvaluations as $exerciseEvaluation) {
        $exerciseEvaluation->athlete_id = $exerciseEvaluation->exercise->athlete_id;
        $exerciseEvaluation->save();
      }

//      $exerciseAndAthleteIds = $exerciseEvaluations->map(function ($exerciseEvaluation) {
//        return [
//          'exercise_id' => $exerciseEvaluation->exercise_id,
//          'athlete_id' => $exerciseEvaluation->athlete_id,
//        ];
//      })->toArray();

//      dd($exerciseAndAthleteIds);
//        ->state(function (array $attributes) use ($exerciseIds) {
//          $exerciseId = $exerciseIds[array_rand($exerciseIds)];
//
//          $exercise = Exercise::find($exerciseId);
//
//          return [
//            'exercise_id' => $exercise->id,
//            'athlete_id' => $exercise->athlete_id,
//          ];
//        })->create();

//      dd($exerciseEvaluations->pluck('exercise_id')->toArray());
      
      foreach ($exerciseEvaluations as $exerciseEvaluation) {
        $athleteRole = $exerciseEvaluation->exercise->athlete->user->role;
        
        $withAthleteRole = SubSubCriteria::whereHas('subCriteria', function ($query) use ($athleteRole) {
          $query->where('name', $athleteRole);
        })->with('subCriteria')->get();
        
        $withoutAthleteRole = SubSubCriteria::whereDoesntHave('subCriteria.criteria', function ($query) {
          $query->where('name', 'Teknik Bertanding');
        })->get();
        
        $allSubSubCriteriaIds = $withAthleteRole->concat($withoutAthleteRole)->pluck('id');
        
        $evaluationsData = $allSubSubCriteriaIds->map(function ($subSubCriteriaId) use ($exerciseEvaluation) {
          return [
            'exercise_evaluation_id' => $exerciseEvaluation->id,
            'sub_sub_criteria_id' => $subSubCriteriaId,
          ];
        })->toArray();
        
        Evaluation::factory()->createMany($evaluationsData);
      }
    }
  }
