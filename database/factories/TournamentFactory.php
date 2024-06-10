<?php
  
  namespace Database\Factories;
  
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
      return [
        'name' => $this->faker->word(),
        'place' => $this->faker->address,
        'date' => Carbon::parse($this->faker->date())->format('Y-m-d'),
        'medal' => $this->faker->randomElement(['Emas', 'Perak', 'Perunggu']),
      ];
    }
  }
