<?php
  
  use Illuminate\Database\Migrations\Migration;
  use Illuminate\Database\Schema\Blueprint;
  use Illuminate\Support\Facades\Schema;
  
  return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
      Schema::create('exercise_athletes', function (Blueprint $table) {
        $table->foreignUuid('exercise_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
        $table->foreignUuid('athlete_id')->constrained('athletes', 'user_id',)->cascadeOnUpdate()->cascadeOnDelete();
      });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
      Schema::dropIfExists('exercise_athletes');
    }
  };
