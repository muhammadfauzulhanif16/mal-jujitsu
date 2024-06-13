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
    ];
    
    
    public function athlete()
    {
      return $this->belongsTo(User::class);
    }
    
    protected function casts(): array
    {
      return [
        'date' => 'datetime:d-m-Y',
      ];
    }
  }
