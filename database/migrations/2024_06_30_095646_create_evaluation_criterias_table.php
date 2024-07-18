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
      Schema::create('evaluation_criterias', function (Blueprint $table) {
        $table->uuid('id')->primary();
        $table->foreignUuid('evaluation_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
        $table->foreignUuid('sub_sub_criteria_id')->constrained();
        $table->string('value')->nullable()->default('-');
        $table->timestamps();
      });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
      Schema::dropIfExists('evaluations');
    }
  };
