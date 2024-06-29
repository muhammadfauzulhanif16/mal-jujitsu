<?php
  
  namespace App\Models;
  
  use Illuminate\Database\Eloquent\Concerns\HasUuids;
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;
  
  class History extends Model
  {
    use HasFactory, HasUuids;
    
    protected $fillable = ['user_id', 'content','is_read'];
    
    public function user()
    {
      return $this->belongsTo(User::class);
    }
  }
