<?php
  
  namespace App\Models;
  
  use Illuminate\Database\Eloquent\Concerns\HasUuids;
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;
  
  class ExerciseEvaluation extends Model
  {
    use HasFactory, HasUuids;
    
    protected $fillable = [
      'exercise_id',
      'note',
    ];
    
    public function exercise()
    {
      return $this->belongsTo(Exercise::class);
    }
    
    public function evaluations()
    {
      return $this->hasMany(Evaluation::class);
    }
  }
