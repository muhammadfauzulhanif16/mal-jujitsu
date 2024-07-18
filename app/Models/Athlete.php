<?php
  
  namespace App\Models;
  
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;
  
  class Athlete extends Model
  {
    use HasFactory;
    
    public $timestamps = false;
    
    protected $fillable = [
      'user_id',
      'weight',
    ];
    
    public function user()
    {
      return $this->belongsTo(User::class);
    }
    
    public function tournaments()
    {
      return $this->hasMany(Tournament::class, 'athlete_id', 'user_id');
    }
    
    public function exercises()
    {
      return $this->hasMany(ExerciseAthlete::class, 'athlete_id', 'user_id');
    }
    
    public function evaluations()
    {
      return $this->hasMany(Evaluation::class, 'athlete_id', 'user_id');
    }
  }
