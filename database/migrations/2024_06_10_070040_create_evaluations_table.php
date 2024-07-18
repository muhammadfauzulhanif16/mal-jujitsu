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
      Schema::create('evaluations', function (Blueprint $table) {
        $table->uuid('id')->primary();
        $table->foreignUuid('athlete_id')->constrained('users')->cascadeOnUpdate()->cascadeOnDelete();
        $table->text('note')->nullable();
        $table->unsignedInteger('period');
        $table->date('start_date');
        $table->date('end_date');
        $table->timestamps();
      });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
      Schema::dropIfExists('exercise_evaluations');
    }
  };
