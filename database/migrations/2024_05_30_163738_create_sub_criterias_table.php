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
      Schema::create('sub_criterias', function (Blueprint $table) {
        $table->uuid('id')->primary();
        $table->foreignUuid('criteria_id')->constrained();
        $table->string('name');
        $table->timestamps();
      });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
      Schema::dropIfExists('sub_criterias');
    }
  };
