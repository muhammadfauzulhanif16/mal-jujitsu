<?php
  
  namespace App\Models;
  
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;
  
  class Athlete extends Model
  {
    use HasFactory;
    
    public $timestamps = false;
    
    protected $hidden = [
      'user_id',
    ];
    
    public function user()
    {
      return $this->belongsTo(User::class);
    }
  }
