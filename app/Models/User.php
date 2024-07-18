<?php
  
  namespace App\Models;
  
  // use Illuminate\Contracts\Auth\MustVerifyEmail;
  use Illuminate\Database\Eloquent\Concerns\HasUuids;
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Foundation\Auth\User as Authenticatable;
  use Illuminate\Notifications\Notifiable;
  
  class User extends Authenticatable
  {
    use HasFactory, Notifiable, HasUuids;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
      'full_name',
      'gender',
      'avatar',
      'birth_date',
      'role',
      'email',
      'password',
    ];
    
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
      'password',
      'remember_token',
    ];
    
    public function athlete()
    {
      return $this->hasOne(Athlete::class);
    }
    
    public function coach()
    {
      return $this->hasOne(Coach::class);
    }
    
    public function evaluations()
    {
      return $this->hasMany(Evaluation::class, 'athlete_id', 'id');
    }
    
    public function exercises()
    {
      return $this->hasMany(ExerciseAthlete::class, 'athlete_id', 'id');
    }
    
    public function tournaments()
    {
      return $this->hasMany(Tournament::class, 'athlete_id', 'id');
    }
    
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
      return [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
      ];
    }
  }
