<?php
  
  namespace Database\Factories;
  
  use App\Models\Athlete;
  use App\Models\Tournament;
  use Carbon\Carbon;
  use Illuminate\Database\Eloquent\Factories\Factory;
  
  /**
   * @extends Factory<Tournament>
   */
  class TournamentFactory extends Factory
  {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
      $athleteIds = Athlete::all()->pluck('user_id')->toArray();
      
      return [
        'athlete_id' => $this->faker->randomElement($athleteIds),
        'name' => $this->faker->word(),
        'place' => $this->faker->address,
        'date' => Carbon::parse($this->faker->date())->format('Y-m-d'),
        'medal' => $this->faker->randomElement(['Emas', 'Perak', 'Perunggu']),
      ];
    }
  }
