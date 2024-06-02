<?php
  
  use App\Http\Controllers\AthleteController;
  use App\Http\Controllers\CoachController;
  use App\Http\Controllers\EvaluationController;
  use App\Http\Controllers\ExerciseController;
  use App\Http\Controllers\ProfileController;
  use App\Http\Controllers\TournamentController;
  use Illuminate\Support\Facades\Auth;
  use Illuminate\Support\Facades\Route;
  use Inertia\Inertia;
  
  Route::fallback(fn() => to_route(auth()->check() ? 'dashboard' : 'login'));
  
  Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia::render('Dashboard', [
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser]
      ]);
    })->name('dashboard');
    
    Route::group(['prefix' => 'athletes'], function () {
      Route::get('', [AthleteController::class, 'index'])->name('athletes.index');
      Route::get('create', [AthleteController::class, 'create'])->name('athletes.create');
      Route::post('', [AthleteController::class, 'store'])->name('athletes.store');
      Route::get('{user}', [AthleteController::class, 'show'])->name('athletes.show');
      Route::get('{user}/edit', [AthleteController::class, 'edit'])->name('athletes.edit');
      Route::put('{user}', [AthleteController::class, 'update'])->name('athletes.update');
      Route::delete('{user}', [AthleteController::class, 'destroy'])->name('athletes.destroy');
    });
    
    Route::group(['prefix' => 'coaches'], function () {
      Route::get('', [CoachController::class, 'index'])->name('coaches.index');
      Route::get('create', [CoachController::class, 'create'])->name('coaches.create');
      Route::post('', [CoachController::class, 'store'])->name('coaches.store');
      Route::get('{user}', [CoachController::class, 'show'])->name('coaches.show');
      Route::get('{user}/edit', [CoachController::class, 'edit'])->name('coaches.edit');
      Route::put('{user}', [CoachController::class, 'update'])->name('coaches.update');
      Route::delete('{user}', [CoachController::class, 'destroy'])->name('coaches.destroy');
    });
    
    Route::group(['prefix' => 'exercises'], function () {
      Route::get('', [ExerciseController::class, 'index'])->name('exercises.index');
      Route::get('create', [ExerciseController::class, 'create'])->name('exercises.create');
      Route::post('', [ExerciseController::class, 'store'])->name('exercises.store');
      Route::get('{exercise}', [ExerciseController::class, 'show'])->name('exercises.show');
      Route::get('{exercise}/edit', [ExerciseController::class, 'edit'])->name('exercises.edit');
      Route::put('{exercise}', [ExerciseController::class, 'update'])->name('exercises.update');
      Route::delete('{exercise}', [ExerciseController::class, 'destroy'])->name('exercises.destroy');
    });
    
    Route::group(['prefix' => 'tournaments'], function () {
      Route::get('', [TournamentController::class, 'index'])->name('tournaments.index');
      Route::get('create', [TournamentController::class, 'create'])->name('tournaments.create');
      Route::post('', [TournamentController::class, 'store'])->name('tournaments.store');
      Route::get('{tournament}', [TournamentController::class, 'show'])->name('tournaments.show');
      Route::get('{tournament}/edit', [TournamentController::class, 'edit'])->name('tournaments.edit');
      Route::put('{tournament}', [TournamentController::class, 'update'])->name('tournaments.update');
      Route::delete('{tournament}', [TournamentController::class, 'destroy'])->name('tournaments.destroy');
    });
    
    Route::group(['prefix' => 'evaluations'], function () {
      Route::get('', [EvaluationController::class, 'index'])->name('evaluations.index');
      Route::get('users/{user}/exercises', [EvaluationController::class, 'users_index'])->name('evaluations.users.index');
      Route::get('create', [EvaluationController::class, 'create'])->name('evaluations.create');
      Route::post('', [EvaluationController::class, 'store'])->name('evaluations.store');
      Route::get('users/{user}/exercises/{exercise}', [EvaluationController::class, 'show'])->name('evaluations.show');
      Route::get('users/{user}/exercises/{exercise}', [EvaluationController::class, 'edit'])->name('evaluations.edit');
      Route::put('users/{user}/exercises/{exercise}', [EvaluationController::class, 'update'])->name('evaluations.update');
      Route::delete('users/{user}/exercises/{exercise}', [EvaluationController::class, 'destroy'])->name('evaluations.destroy');
    });
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
  });
  
  
  require __DIR__ . '/auth.php';
