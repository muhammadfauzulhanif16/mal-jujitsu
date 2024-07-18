<?php
  
  namespace App\Models;
  
  use Illuminate\Database\Eloquent\Concerns\HasUuids;
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;
  
  class EvaluationExercises extends Model
  {
    use HasFactory, HasUuids;
    
    public $timestamps = false;
    
    protected $fillable = [
      'evaluation_id',
      'exercise_id',
    ];
    
    public function evaluation()
    {
      return $this->belongsTo(Evaluation::class);
    }
    
    public function exercise()
    {
      return $this->belongsTo(Exercise::class);
    }
  }
