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

//    public function athleteRole($roles)
//    {
//      return $this->state([
//        'role' => $this->faker->randomElement($roles),
//      ]);
//    }
    
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
      $role = $this->faker->randomElement(['Pengelola Tim', 'Pelatih Fisik', 'Pelatih Teknik', 'Ne-Waza', 'Fighting System']);
      $gender = $this->faker->randomElement(['male', 'female']);
      $full_name = $this->faker->firstName($gender);
      
      $gender = $gender === 'male' ? 'Laki-laki' : 'Perempuan';
      
      return [
        'id' => $this->faker->uuid,
        'full_name' => $full_name,
        'gender' => $gender,
        'avatar' => $this->faker->imageUrl(),
        'birth_date' => $this->faker->dateTimeThisCentury->format('Y-m-d'),
        'role' => $role,
        'email' => $this->faker->unique()->safeEmail,
        'password' => Hash::make('password'),
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
