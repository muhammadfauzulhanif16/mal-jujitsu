<?php
  
  namespace App\Models;
  
  use Illuminate\Database\Eloquent\Concerns\HasUuids;
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;
  
  class SubSubCriteria extends Model
  {
    use HasFactory, HasUuids;
    
    protected $fillable = ['sub_criteria_id', 'name', 'description', 'type'];
    
    public function subCriteria()
    {
      return $this->belongsTo(SubCriteria::class);
    }
    
    public function evaluation()
    {
      return $this->hasOne(Evaluation::class);
    }
  }
