<?php
  
  namespace App\Models;
  
  use Illuminate\Database\Eloquent\Concerns\HasUuids;
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;
  
  class Tournament extends Model
  {
    use HasFactory, HasUuids;
    
    protected $fillable = [
      'name',
      'place',
      'date',
      'athlete_id',
      'medal',
      'point',
    ];
    
    
    public function athlete()
    {
      return $this->belongsTo(Athlete::class, 'athlete_id', 'user_id');
    }
    
    protected function casts(): array
    {
      return [
//        'date' => 'datetime:d-m-Y',
      ];
    }
  }
