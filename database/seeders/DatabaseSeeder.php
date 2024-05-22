<?php
  
  namespace Database\Seeders;
  
  use App\Models\User;
  use Illuminate\Database\Seeder;
  use Illuminate\Support\Facades\Hash;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
  
  class DatabaseSeeder extends Seeder
  {
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
      // User::factory(10)->create();

//      User::factory()->create([
//        'name' => 'Test User',
//        'email' => 'test@example.com',
//      ]);
      
      foreach ((['Admin', 'Pelatih', 'Atlet']) as $user) {
        User::create([
          'name' => $user,
          'role' => $user,
          'email' => strtolower($user) . '@mail.id',
          'password' => Hash::make(strtolower($user)),
        ]);
      }
    }
  }
