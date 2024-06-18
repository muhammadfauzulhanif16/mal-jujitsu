<?php
  
  namespace Database\Factories;
  
  use App\Models\History;
  use App\Models\User;
  use Illuminate\Database\Eloquent\Factories\Factory;
  
  /**
   * @extends Factory<History>
   */
  class HistoryFactory extends Factory
  {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
      $userIds = User::all()->pluck('id')->toArray();
      
      return [
        'user_id' => $this->faker->randomElement($userIds),
        'content' => $this->faker->sentence(),
      ];
    }
  }
