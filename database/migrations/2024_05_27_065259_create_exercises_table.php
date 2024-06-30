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
      Schema::create('exercises', function (Blueprint $table) {
        $table->uuid('id')->primary();
        $table->string('name');
        $table->string('place');
//        $table->foreignUuid('athlete_id')->constrained('users')->cascadeOnUpdate()->cascadeOnDelete();
        $table->foreignUuid('coach_id')->constrained('users')->cascadeOnUpdate()->cascadeOnDelete();
        $table->date('date');
        $table->time('start_time');
        $table->time('end_time');
        $table->timestamps();
      });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
      Schema::dropIfExists('exercises');
    }
  };
