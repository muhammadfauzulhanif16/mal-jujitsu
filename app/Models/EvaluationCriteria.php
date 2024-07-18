<?php
  
  namespace App\Models;
  
  use Illuminate\Database\Eloquent\Concerns\HasUuids;
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;
  
  class EvaluationCriteria extends Model
  {
    use HasFactory, HasUuids;
    
    protected $fillable = [
      'evaluation_id',
      'sub_sub_criteria_id',
      'value',
    ];
    
    public function subSubCriteria()
    {
      return $this->belongsTo(SubSubCriteria::class);
    }
    
    public function evaluation()
    {
      return $this->belongsTo(Evaluation::class);
    }
  }
