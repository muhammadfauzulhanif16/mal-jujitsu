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
      'athlete_id',
      'medal',
    ];
    
    protected $hidden = [
      'athlete_id',
    ];
    
    public function athlete()
    {
      return $this->belongsTo(User::class);
    }
  }
