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
      Schema::create('sub_sub_criterias', function (Blueprint $table) {
        $table->uuid('id')->primary();
        $table->foreignUuid('sub_criteria_id')->constrained();
        $table->string('name');
        $table->string('description')->nullable();
        $table->string('type');
        $table->boolean('required')->default(true);
        $table->string('unit')->nullable();
        $table->string('male_benchmark')->nullable()->default('-');
        $table->string('female_benchmark')->nullable()->default('-');
        $table->timestamps();
      });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
      Schema::dropIfExists('sub_sub_criterias');
    }
  };
