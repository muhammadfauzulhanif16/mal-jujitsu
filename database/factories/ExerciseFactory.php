<?php
  
  namespace Database\Factories;
  
  use App\Models\Exercise;
  use Carbon\Carbon;
  use Illuminate\Database\Eloquent\Factories\Factory;
  
  /**
   * @extends Factory<Exercise>
   */
  class ExerciseFactory extends Factory
  {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
      return [
        'name' => $this->faker->word(),
        'place' => $this->faker->address,
        'date' => Carbon::parse($this->faker->date())->format('Y-m-d'),
        'start_time' => Carbon::parse($this->faker->time())->format('H:i:s'),
        'end_time' => Carbon::parse($this->faker->time())->format('H:i:s'),
      ];
    }
  }
