<?php
  
  namespace Database\Factories;
  
  use App\Models\User;
  use Illuminate\Database\Eloquent\Factories\Factory;
  use Illuminate\Support\Facades\Hash;
  
  /**
   * @extends Factory<User>
   */
  class UserFactory extends Factory
  {
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;
    
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
      $gender = $this->faker->randomElement(['male', 'female']);
      $full_name = $this->faker->firstName($gender) . ' ' . $this->faker->lastName;
      $gender = $gender === 'male' ? 'Laki-laki' : 'Perempuan';
      
      return [
        'full_name' => $full_name,
        'gender' => $gender,
        'avatar' => $this->faker->imageUrl(640, 480, $full_name, false,),
        'birth_date' => $this->faker->dateTimeThisCentury->format('Y-m-d'),
        'email' => strtolower(str_replace(' ', '.', $full_name)) . '@jujistu.id',
        'password' => Hash::make(strtolower(str_replace(' ', '.', $full_name)) . '@jujistu.id'),
      ];
    }
    
    /**
     * Indicate that the model's email address should be unverified.
     */
//    public function unverified(): static
//    {
//        return $this->state(fn (array $attributes) => [
//            'email_verified_at' => null,
//        ]);
//    }
  }
