<?php
  
  namespace App\Models;
  
  use Illuminate\Database\Eloquent\Concerns\HasUuids;
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;
  
  class ExerciseEvaluation extends Model
  {
    use HasFactory, HasUuids;
    
    protected $fillable = [
      'athlete_id',
      'exercise_id',
      'note',
    ];
    
    public function exercise()
    {
      return $this->belongsTo(Exercise::class, 'exercise_id', 'id');
    }
    
    public function evaluations()
    {
      return $this->hasMany(Evaluation::class, 'exercise_evaluation_id', 'id');
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
