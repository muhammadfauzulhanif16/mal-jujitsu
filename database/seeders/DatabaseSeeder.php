<?php
  
  namespace Database\Seeders;
  
  use App\Models\User;
  use Illuminate\Database\Seeder;
  use Illuminate\Support\Facades\Hash;
  
  class DatabaseSeeder extends Seeder
  {
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
      User::create([
        'full_name' => 'Admin',
        'email' => 'admin@jujitsu.id',
        'role' => 'Pelatih',
        'password' => Hash::make('admin@jujitsu.id'),
      ]);
      
      $this->call([
        CriteriaSeeder::class,
      ]);
      
      if (env('WITH_FAKER')) {
        $this->call([
          CoachSeeder::class,
          AthleteSeeder::class,
          ExerciseSeeder::class,
//          ExerciseEvaluationSeeder::class,
          TournamentSeeder::class,
          HistorySeeder::class,
        ]);
      }
    }
  }
