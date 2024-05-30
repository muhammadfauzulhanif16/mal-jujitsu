<?php
  
  namespace App\Models;
  
  use Illuminate\Database\Eloquent\Concerns\HasUuids;
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;
  
  class Evaluation extends Model
  {
    use HasFactory, HasUuids;
    
    public function evaluation()
    {
      return $this->belongsTo(Evaluation::class);
    }
  }
