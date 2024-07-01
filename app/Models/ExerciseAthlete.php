<?php
  
  namespace App\Models;
  
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;
  
  class ExerciseAthlete extends Model
  {
    use HasFactory;
    
    public $timestamps = false;
    
    protected $fillable = [
      'exercise_id',
      'athlete_id',
    ];
    
    public function exercise()
    {
      return $this->belongsTo(Exercise::class);
    }
    
    public function athlete()
    {
      return $this->belongsTo(Athlete::class, 'athlete_id', 'user_id');
    }
    
    public function athletes()
    {
      return $this->hasMany(Athlete::class, 'user_id', 'athlete_id');
    }
  }
