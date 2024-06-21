<?php

namespace Database\Seeders;

use App\Models\Athlete;
use App\Models\User;
use Illuminate\Database\Seeder;

class AthleteSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $roles = ['Ne-Waza', 'Fighting',];

    User::factory(random_int(1, 16))->create()->map(function ($user) use ($roles) {
      $user->role = $roles[array_rand($roles)];
      $user->save();

      Athlete::factory()->create(['user_id' => $user->id]);
    });
  }
}
