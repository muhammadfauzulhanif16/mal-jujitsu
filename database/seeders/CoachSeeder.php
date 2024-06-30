<?php
  
  namespace Database\Seeders;
  
  use App\Models\Coach;
  use App\Models\User;
  use Illuminate\Database\Seeder;
  
  class CoachSeeder extends Seeder
  {
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      $roles = ['Manajer Tim', 'Pelatih Fisik', 'Pelatih Teknik'];
      
      User::factory(random_int(1, 16))->create()->map(function ($user) use ($roles) {
        $user->role = $roles[array_rand($roles)];
        $user->save();
        
        Coach::factory()->create(['user_id' => $user->id]);
      });
    }
  }
