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
      $exerciseIds = Exercise::all()->pluck('id')->toArray();
      
      return [
        'exercise_id' => $this->faker->unique()->randomElement($exerciseIds),
        'note' => $this->faker->sentence,
      ];
    }
  }
