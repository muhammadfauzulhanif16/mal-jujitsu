<?php
  
  namespace App\Http\Controllers;
  
  use App\Models\Athlete;
  use App\Models\Coach;
  use App\Models\Exercise;
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
        'exercises' => Exercise::with(['athlete', 'coach'])->get(),
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser]
      ]);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      try {
        Exercise::create([
          'name' => $request->name,
          'place' => $request->place,
          'athlete_id' => $request->athlete_id,
          'coach_id' => $request->coach_id,
          'date' => Carbon::parse($request->date)->format('Y-m-d'),
          'start_time' => Carbon::parse($request->start_time)->format('H:i:s'),
          'end_time' => Carbon::parse($request->end_time)->format('H:i:s'),
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
          return $athlete->user->full_name;
        })->values(),
        'coaches' => Coach::with('user')->get()->sortBy(function ($coach) {
          return $coach->user->full_name;
        })->values(),
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
        'athletes' => Athlete::with('user')->get()->sortBy(function ($athlete) {
          return $athlete->user->full_name;
        })->values(),
        'coaches' => Coach::with('user')->get()->sortBy(function ($coach) {
          return $coach->user->full_name;
        })->values(),
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
        'athletes' => Athlete::with('user')->get()->sortBy(function ($athlete) {
          return $athlete->user->full_name;
        })->values(),
        'coaches' => Coach::with('user')->get()->sortBy(function ($coach) {
          return $coach->user->full_name;
        })->values(),
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
