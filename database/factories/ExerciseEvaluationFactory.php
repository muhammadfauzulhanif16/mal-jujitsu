<?php
  
  namespace Database\Factories;
  
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
      return [
        'note' => $this->faker->sentence,
      ];
    }
  }
