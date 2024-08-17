<?php
  
  namespace App\Http\Controllers;
  
  use App\Imports\TrainingSchedulesImport;
  use App\Models\Athlete;
  use App\Models\Coach;
  use App\Models\Exercise;
  use App\Models\ExerciseAthlete;
  use App\Models\History;
  use Exception;
  use Illuminate\Http\Request;
  use Illuminate\Support\Carbon;
  use Illuminate\Support\Facades\Auth;
  
  class ExerciseController extends Controller
  {
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      
      return Inertia('Exercise/Index', [
        'exercises' => Exercise::all()->map(function ($exercise) {
          $exercise->coach = Coach::where('user_id', $exercise->coach_id)->first()->user;
          $exercise->coach->avatar = str_contains($exercise->coach->avatar, 'https') ? $exercise->coach->avatar : ($exercise->coach->avatar ? asset('storage/' . $exercise->coach->avatar) : null);
          $exercise->coach = $exercise->coach->only(['full_name', 'avatar', 'role']);
          $exercise->athletes = ExerciseAthlete::where('exercise_id', $exercise->id)->get()->map(function ($exerciseAthlete) {
            $athlete = Athlete::where('user_id', $exerciseAthlete->athlete_id)->first()->user;
            $athlete->avatar = str_contains($athlete->avatar, 'https') ? $athlete->avatar : ($athlete->avatar ? asset('storage/' . $athlete->avatar) : null);
            return $athlete->only(['id', 'full_name', 'avatar', 'role']);
          });
          return $exercise;
        }),
        
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'total_unread_histories' => History::where('is_read', false)->count(),
      ]);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      try {
        $exercise = Exercise::create([
          'name' => $request->name,
          'place' => $request->place,
          'coach_id' => $request->coach_id,
          'date' => Carbon::parse($request->date)->format('Y-m-d'),
          'start_time' => Carbon::parse($request->start_time)->format('H:i:s'),
          'end_time' => Carbon::parse($request->end_time)->format('H:i:s'),
        ]);
        
        foreach ($request->athlete_ids as $athlete_id) {
          ExerciseAthlete::create([
            'exercise_id' => $exercise->id,
            'athlete_id' => $athlete_id
          ]);
        }
        
        History::create([
          'user_id' => Auth::id(),
          'content' => "Menambahkan latihan '{$request->name}'"
        ]);
        
        return to_route('exercises.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil menambahkan latihan',
          'message' => "Latihan '{$request->name}' berhasil ditambahkan!"
        ]);
      } catch (Exception $e) {
        return to_route('exercises.index')->with('meta', [
          'status' => false,
          'title' => 'Gagal menambahkan Latihan',
          'message' => $e->getMessage()
        ]);
      }
    }
    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Exercise/Create', [
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'athletes' => Athlete::all()->map(function ($athlete) {
          $athlete->user->avatar = str_contains($athlete->user->avatar, 'https') ? $athlete->user->avatar : ($athlete->user->avatar ? asset('storage/' . $athlete->user->avatar) : null);
          return [
            ...$athlete->user->only(['id', 'avatar', 'full_name', 'role']),
          ];
        })->sortBy('full_name')->values(),
        
        'coaches' => Coach::all()->map(function ($coach) {
          $coach->user->avatar = str_contains($coach->user->avatar, 'https') ? $coach->user->avatar : ($coach->user->avatar ? asset('storage/' . $coach->user->avatar) : null);
          return [
            ...$coach->user->only(['id', 'avatar', 'full_name', 'role']),
          ];
        })->sortBy('full_name')->values(),
        'total_unread_histories' => History::where('is_read', false)->count(),
      ]);
    }
    
    /**
     * Display the specified resource.
     */
    public function show(Exercise $exercise)
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Exercise/Show', [
        'exercise' => [
          ...$exercise->toArray(),
          'coach' => function () use ($exercise) {
            $coach = Coach::where('user_id', $exercise->coach_id)->first()->user;
            $coach->avatar = str_contains($coach->avatar, 'https') ? $coach->avatar : ($coach->avatar ? asset('storage/' . $coach->avatar) : null);
            return $coach->only(['id', 'avatar', 'full_name', 'role']);
          },
          'athletes' => ExerciseAthlete::where('exercise_id', $exercise->id)->get()->map(function ($exerciseAthlete) {
            $athlete = Athlete::where('user_id', $exerciseAthlete->athlete_id)->first()->user;
            $athlete->avatar = str_contains($athlete->avatar, 'https') ? $athlete->avatar : ($athlete->avatar ? asset('storage/' . $athlete->avatar) : null);
            return $athlete->only(['id', 'avatar', 'full_name', 'role']);
          }),
        ],
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'athletes' => Athlete::all()->map(function ($athlete) {
          $athlete->user->avatar = str_contains($athlete->user->avatar, 'https') ? $athlete->user->avatar : ($athlete->user->avatar ? asset('storage/' . $athlete->user->avatar) : null);
          return [
            ...$athlete->user->only(['id', 'avatar', 'full_name', 'role']),
          ];
        })->sortBy('full_name')->values(),
        
        'coaches' => Coach::all()->map(function ($coach) {
          $coach->user->avatar = str_contains($coach->user->avatar, 'https') ? $coach->user->avatar : ($coach->user->avatar ? asset('storage/' . $coach->user->avatar) : null);
          return [
            ...$coach->user->only(['id', 'avatar', 'full_name', 'role']),
          ];
        })->sortBy('full_name')->values(),
        'total_unread_histories' => History::where('is_read', false)->count(),
      ]);
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exercise $exercise)
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Exercise/Edit', [
        'exercise' => [
          ...$exercise->toArray(),
          'coach' => function () use ($exercise) {
            $coach = Coach::where('user_id', $exercise->coach_id)->first()->user;
            $coach->avatar = str_contains($coach->avatar, 'https') ? $coach->avatar : ($coach->avatar ? asset('storage/' . $coach->avatar) : null);
            return $coach->only(['id', 'avatar', 'full_name', 'role']);
          },
          'athletes' => ExerciseAthlete::where('exercise_id', $exercise->id)->get()->map(function ($exerciseAthlete) {
            $athlete = Athlete::where('user_id', $exerciseAthlete->athlete_id)->first()->user;
            $athlete->avatar = str_contains($athlete->avatar, 'https') ? $athlete->avatar : ($athlete->avatar ? asset('storage/' . $athlete->avatar) : null);
            return $athlete->only(['id', 'avatar', 'full_name', 'role']);
          }),
        ],
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'athletes' => Athlete::all()->map(function ($athlete) {
          $athlete->user->avatar = str_contains($athlete->user->avatar, 'https') ? $athlete->user->avatar : ($athlete->user->avatar ? asset('storage/' . $athlete->user->avatar) : null);
          return [
            ...$athlete->user->only(['id', 'avatar', 'full_name', 'role']),
          ];
        })->sortBy('full_name')->values(),
        
        'coaches' => Coach::all()->map(function ($coach) {
          $coach->user->avatar = str_contains($coach->user->avatar, 'https') ? $coach->user->avatar : ($coach->user->avatar ? asset('storage/' . $coach->user->avatar) : null);
          return [
            ...$coach->user->only(['id', 'avatar', 'full_name', 'role']),
          ];
        })->sortBy('full_name')->values(),
        'total_unread_histories' => History::where('is_read', false)->count(),
      ]);
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exercise $exercise)
    {
      try {
        ExerciseAthlete::where('exercise_id', $exercise->id)->delete();
        
        $exercise->update([
          'name' => $request->name,
          'place' => $request->place,
          'coach_id' => $request->coach_id,
          'date' => Carbon::parse($request->date)->format('Y-m-d'),
          'start_time' => Carbon::parse($request->start_time)->format('H:i:s'),
          'end_time' => Carbon::parse($request->end_time)->format('H:i:s'),
        ]);
        
        foreach ($request->athlete_ids as $athlete_id) {
          ExerciseAthlete::create([
            'exercise_id' => $exercise->id,
            'athlete_id' => $athlete_id
          ]);
        }
        
        History::create([
          'user_id' => Auth::id(),
          'content' => "Mengubah latihan '{$request->name}'"
        ]);
        
        return to_route('exercises.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil mengubah latihan',
          'message' => "Latihan '{$request->name}' berhasil diubah!"
        ]);
      } catch (Exception $e) {
        return to_route('exercises.index')->with('meta', [
          'status' => false,
          'title' => 'Gagal mengubah latihan',
          'message' => $e->getMessage()
        ]);
      }
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exercise $exercise)
    {
      try {
        $exercise->delete();
        
        History::create([
          'user_id' => Auth::id(),
          'content' => "Menghapus latihan '{$exercise->name}'"
        ]);
        
        return to_route('exercises.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil menghapus latihan',
          'message' => "Latihan '{$exercise->name}' berhasil dihapus!"
        ]);
      } catch (Exception $e) {
        return to_route('exercises.index')->with('meta', [
          'status' => false,
          'title' => 'Gagal menghapus latihan',
          'message' => $e->getMessage()
        ]);
      }
    }
    
    public function training_schedule_store(Request $request)
    {
      try {
        (new TrainingSchedulesImport)->import($request->file('file'));
        
        return to_route('exercises.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil menambahkan jadwal latihan',
          'message' => 'Jadwal latihan berhasil ditambahkan!'
        ]);
      } catch (Exception $e) {
        return to_route('exercises.index')->with('meta', [
          'status' => false,
          'title' => 'Gagal menambahkan jadwal latihan',
          'message' => $e->getMessage()
        ]);
      }
    }
  }
