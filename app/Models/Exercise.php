<?php
  
  namespace App\Models;
  
  use Illuminate\Database\Eloquent\Concerns\HasUuids;
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;
  
  class Exercise extends Model
  {
    use HasFactory, HasUuids;
    
    protected $fillable = [
      'name',
      'place',
//      'athlete_id',
      'coach_id',
      'date',
      'start_time',
      'end_time',
    ];

//    protected $hidden = [
//      'athlete_id',
//      'coach_id',
//    ];
    
    
    public function athlete()
    {
      return $this->belongsTo(Athlete::class, 'athlete_id', 'user_id');
    }
    
    public function coach()
    {
      return $this->belongsTo(Coach::class, 'coach_id', 'user_id');
    }
    
    
    public function evaluations()
    {
      return $this->hasMany(Evaluation::class);
    }

//    public function exerciseEvaluation()
//    {
//      return $this->hasOne(ExerciseEvaluation::class);
//    }
    
    protected function casts(): array
    {
      return [
//        'date' => 'datetime:d-m-Y',
//        'start_time' => 'datetime:H.i.s',
//        'end_time' => 'datetime:H.i.s',
      ];
    }
  }
