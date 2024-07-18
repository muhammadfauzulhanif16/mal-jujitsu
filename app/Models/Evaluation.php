<?php
  
  namespace App\Models;
  
  use Illuminate\Database\Eloquent\Concerns\HasUuids;
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;
  
  class Evaluation extends Model
  {
    use HasFactory, HasUuids;
    
    protected $fillable = [
      'athlete_id',
      'note',
      'period',
      'start_date',
      'end_date',
    ];
    
    public function athlete()
    {
      return $this->belongsTo(Athlete::class, 'athlete_id', 'user_id');
    }
    
    public function athletes()
    {
      return $this->hasMany(Athlete::class, 'user_id', 'athlete_id');
    }
    
    public function exercises()
    {
      return $this->hasMany(EvaluationExercises::class);
    }
    
    public function tournaments()
    {
      return $this->hasMany(EvaluationTournaments::class);
    }
    
    public function evaluationCriterias()
    {
      return $this->hasMany(EvaluationCriteria::class);
    }
  }
