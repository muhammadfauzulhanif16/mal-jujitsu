<?php
  
  namespace App\Http\Controllers;
  
  use App\Models\Athlete;
  use App\Models\Coach;
  use App\Models\Exercise;
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
      
      $exercises = [];
      
      if (in_array($authedUser->role, ['Ne-Waza', 'Fighting'])) {
        $exercises = Exercise::with(['coach.user', 'athlete.user'])
          ->where('athlete_id', $authedUser->id)
          ->get()
          ->map(function ($exercise) {
            $athlete = $exercise->athlete->user;
            $athlete->avatar = str_contains($athlete->avatar, 'https') ? $athlete->avatar : (str_contains($athlete->avatar, 'storage/') ? $athlete->avatar : ($athlete->avatar ? asset('storage/' . $athlete->avatar) : null));
            
            $coach = $exercise->coach->user;
            $coach->avatar = str_contains($coach->avatar, 'https') ? $coach->avatar : (str_contains($coach->avatar, 'storage/') ? $coach->avatar : ($coach->avatar ? asset('storage/' . $coach->avatar) : null));
            
            return [
              'athlete' => [
                'avatar' => $athlete->avatar,
                'full_name' => $athlete->full_name,
              ],
              'coach' => [
                'avatar' => $coach->avatar,
                'full_name' => $coach->full_name,
              ],
              'exercise' => $exercise->toArray(),
            ];
          })->sortBy('exercise.name')->values();
      } else {
        $exercises = Exercise::with(['coach.user', 'athlete.user'])
          ->get()
          ->map(function ($exercise) {
            $athlete = $exercise->athlete->user;
            $athlete->avatar = str_contains($athlete->avatar, 'https') ? $athlete->avatar : (str_contains($athlete->avatar, 'storage/') ? $athlete->avatar : ($athlete->avatar ? asset('storage/' . $athlete->avatar) : null));
            
            $coach = $exercise->coach->user;
            $coach->avatar = str_contains($coach->avatar, 'https') ? $coach->avatar : (str_contains($coach->avatar, 'storage/') ? $coach->avatar : ($coach->avatar ? asset('storage/' . $coach->avatar) : null));
            
            return [
              'athlete' => [
                'avatar' => $athlete->avatar,
                'full_name' => $athlete->full_name,
              ],
              'coach' => [
                'avatar' => $coach->avatar,
                'full_name' => $coach->full_name,
              ],
              'exercise' => $exercise->toArray(),
            ];
          })->sortBy('exercise.name')->values();
      }
      
      return Inertia('Exercise/Index', [
        'exercises' => $exercises,
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'unread_histories' => History::where('is_read', false)->get(),
      ]);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      try {
        foreach ($request->athlete_ids as $athlete_id) {
          Exercise::create([
            'name' => $request->name,
            'place' => $request->place,
            'athlete_id' => $athlete_id,
            'coach_id' => $request->coach_id,
            'date' => Carbon::parse($request->date)->format('Y-m-d'),
            'start_time' => Carbon::parse($request->start_time)->format('H:i:s'),
            'end_time' => Carbon::parse($request->end_time)->format('H:i:s'),
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
        'athletes' => Athlete::with('user')->get()->sortBy(function ($athlete) {
          $athlete->user->avatar = str_contains($athlete->user->avatar, 'https') ? $athlete->user->avatar : ($athlete->user->avatar ? asset('storage/' . $athlete->user->avatar) : null);
          return $athlete;
        })->sortBy('user.full_name')->values(),
        'coaches' => Coach::with('user')->get()->sortBy(function ($coach) {
          $coach->user->avatar = str_contains($coach->user->avatar, 'https') ? $coach->user->avatar : ($coach->user->avatar ? asset('storage/' . $coach->user->avatar) : null);
          return $coach;
        })->sortBy('user.full_name')->values(),
        'unread_histories' => History::where('is_read', false)->get(),
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
        'exercise' => $exercise->load(['athlete', 'coach']),
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'athletes' => Athlete::with('user')->get()->map(function ($athlete) {
          $athlete->user->avatar = str_contains($athlete->user->avatar, 'https') ? $athlete->user->avatar : ($athlete->user->avatar ? asset('storage/' . $athlete->user->avatar) : null);
          return $athlete;
        })->sortBy('user.full_name')->values(),
        'coaches' => Coach::with('user')->get()->map(function ($coach) {
          $coach->user->avatar = str_contains($coach->user->avatar, 'https') ? $coach->user->avatar : ($coach->user->avatar ? asset('storage/' . $coach->user->avatar) : null);
          return $coach;
        })->sortBy('user.full_name')->values(),
        'unread_histories' => History::where('is_read', false)->get(),
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
        'exercise' => $exercise->load(['athlete', 'coach']),
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'athletes' => Athlete::with('user')->get()->map(function ($athlete) {
          $athlete->user->avatar = str_contains($athlete->user->avatar, 'https') ? $athlete->user->avatar : ($athlete->user->avatar ? asset('storage/' . $athlete->user->avatar) : null);
          return $athlete;
        })->sortBy('user.full_name')->values(),
        'coaches' => Coach::with('user')->get()->map(function ($coach) {
          $coach->user->avatar = str_contains($coach->user->avatar, 'https') ? $coach->user->avatar : ($coach->user->avatar ? asset('storage/' . $coach->user->avatar) : null);
          return $coach;
        })->sortBy('user.full_name')->values(),
        'unread_histories' => History::where('is_read', false)->get(),
      ]);
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exercise $exercise)
    {
      try {
        $exercise->update([
          'name' => $request->name,
          'place' => $request->place,
          'athlete_id' => $request->athlete_id,
          'coach_id' => $request->coach_id,
          'date' => Carbon::parse($request->date)->format('Y-m-d'),
          'start_time' => Carbon::parse($request->start_time)->format('H:i:s'),
          'end_time' => Carbon::parse($request->end_time)->format('H:i:s'),
        ]);
        
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
  }
