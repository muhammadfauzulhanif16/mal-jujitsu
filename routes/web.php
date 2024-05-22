<?php
  
  use App\Http\Controllers\AthleteController;
  use App\Http\Controllers\CoachController;
  use App\Http\Controllers\ProfileController;
  use Illuminate\Support\Facades\Route;
  use Inertia\Inertia;
  
  Route::fallback(fn() => to_route(auth()->check() ? 'dashboard' : 'login'));
  
  Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
      return Inertia::render('Dashboard', [
        'meta' => session('meta'),
      ]);
    })->name('dashboard');
    
    Route::group(['prefix' => 'athletes'], function () {
      Route::get('', [AthleteController::class, 'index'])->name('athletes.index');
      Route::get('create', [AthleteController::class, 'create'])->name('athletes.create');
      Route::post('', [AthleteController::class, 'store'])->name('athletes.store');
      Route::get('{athlete}', [AthleteController::class, 'show'])->name('athletes.show');
      Route::get('{athlete}/edit', [AthleteController::class, 'edit'])->name('athletes.edit');
      Route::patch('{athlete}', [AthleteController::class, 'update'])->name('athletes.update');
      Route::delete('{athlete}', [AthleteController::class, 'destroy'])->name('athletes.destroy');
    });
    
    Route::group(['prefix' => 'coaches'], function () {
      Route::get('', [CoachController::class, 'index'])->name('coaches.index');
      Route::get('create', [CoachController::class, 'create'])->name('coaches.create');
      Route::post('', [CoachController::class, 'store'])->name('coaches.store');
      Route::get('{coach}', [CoachController::class, 'show'])->name('coaches.show');
      Route::get('{coach}/edit', [CoachController::class, 'edit'])->name('coaches.edit');
      Route::patch('{coach}', [CoachController::class, 'update'])->name('coaches.update');
      Route::delete('{coach}', [CoachController::class, 'destroy'])->name('coaches.destroy');
    });
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
  });
  
  
  require __DIR__ . '/auth.php';
