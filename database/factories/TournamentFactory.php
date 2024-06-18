<?php
  
  namespace Database\Factories;
  
  use App\Models\Athlete;
  use App\Models\Tournament;
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
      
      $medals = [
        'Emas' => 3,
        'Perak' => 2,
        'Perunggu' => 1,
      ];
      
      $medal = array_rand($medals);
      
      return [
        'athlete_id' => $this->faker->randomElement($athleteIds),
        'name' => $this->faker->word(),
        'place' => $this->faker->address,
        'date' => $this->faker->dateTimeThisYear(),
        'medal' => $medal,
        'point' => $medals[$medal],
      ];
    }
  }
