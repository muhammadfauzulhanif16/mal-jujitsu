<?php
  
  namespace Database\Factories;
  
  use App\Models\Exercise;
  use App\Models\ExerciseEvaluation;
  use Illuminate\Database\Eloquent\Factories\Factory;
  
  /**
   * @extends Factory<ExerciseEvaluation>
   */
  class ExerciseEvaluationFactory extends Factory
  {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
      static $exercises = null;
      
      if ($exercises === null) {
        $exercises = Exercise::all();
      }
      
      if ($exercises->isEmpty()) {
        return [];
      }
      
      $exercise = $exercises->random();
      $exercises = $exercises->filter(function ($e) use ($exercise) {
        return $e->id !== $exercise->id;
      });
      
      return [
        'athlete_id' => $exercise->athlete_id,
        'exercise_id' => $exercise->id,
        'note' => $this->faker->word,
      ];
    }
  }
