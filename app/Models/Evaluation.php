<?php
  
  namespace App\Models;
  
  use Illuminate\Database\Eloquent\Concerns\HasUuids;
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;
  
  class Evaluation extends Model
  {
    use HasFactory, HasUuids;
    
    protected $fillable = [
      'exercise_evaluation_id',
      'sub_sub_criteria_id',
      'value',
    ];
    
    public function subSubCriteria()
    {
      return $this->belongsTo(SubSubCriteria::class);
    }
    
    public function exerciseEvaluation()
    {
      return $this->belongsTo(ExerciseEvaluation::class);
    }
  }
