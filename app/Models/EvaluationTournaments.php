<?php
  
  namespace App\Models;
  
  use Illuminate\Database\Eloquent\Concerns\HasUuids;
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;
  
  class EvaluationTournaments extends Model
  {
    use HasFactory, HasUuids;
    
    public $timestamps = false;
    
    protected $fillable = [
      'evaluation_id',
      'tournament_id',
    ];
    
    public function evaluation()
    {
      return $this->belongsTo(Evaluation::class);
    }
    
    public function tournament()
    {
      return $this->belongsTo(Tournament::class);
    }
  }
