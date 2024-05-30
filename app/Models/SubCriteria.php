<?php
  
  namespace App\Models;
  
  use Illuminate\Database\Eloquent\Concerns\HasUuids;
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;
  
  class SubCriteria extends Model
  {
    use HasFactory, HasUuids;
    
    protected $fillable = ['criteria_id', 'name'];
    
    public function criteria()
    {
      return $this->belongsTo(Criteria::class);
    }
    
    public function subSubCriterias()
    {
      return $this->hasMany(SubSubCriteria::class);
    }
  }
