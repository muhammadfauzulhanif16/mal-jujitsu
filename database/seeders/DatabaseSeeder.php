<?php
  
  namespace Database\Seeders;
  
  use App\Models\Athlete;
  use App\Models\Coach;
  use App\Models\User;
  use Illuminate\Database\Seeder;
  
  class DatabaseSeeder extends Seeder
  {
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
      User::factory(8)->create()->each(function ($user) {
        if (in_array($user->role, ['Pengelola Tim', 'Pelatih Fisik', 'Pelatih Teknik'])) {
          Coach::factory()->create(['user_id' => $user->id]);
        } elseif (in_array($user->role, ['Ne-Waza', 'Fighting'])) {
          Athlete::factory()->create(['user_id' => $user->id]);
        }
      });
    }
  }
