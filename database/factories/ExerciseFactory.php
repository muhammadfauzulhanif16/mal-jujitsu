<?php
  
  namespace Database\Factories;
  
  use App\Models\Athlete;
  use App\Models\Coach;
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
      $athleteIds = Athlete::all()->pluck('user_id')->toArray();
      $coachIds = Coach::all()->pluck('user_id')->toArray();
      
      return [
//        'athlete_id' => $this->faker->randomElement($athleteIds),
        'coach_id' => $this->faker->randomElement($coachIds),
        'name' => $this->faker->word(),
        'place' => $this->faker->address,
        'date' => $this->faker->dateTimeThisYear(),
        'start_time' => Carbon::parse($this->faker->time())->format('H:i:s'),
        'end_time' => Carbon::parse($this->faker->time())->format('H:i:s'),
      ];
    }
  }
