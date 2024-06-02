<?php
  
  namespace App\Http\Controllers;
  
  use App\Models\Athlete;
  use App\Models\Tournament;
  use Exception;
  use Illuminate\Http\Request;
  use Illuminate\Support\Carbon;
  use Illuminate\Support\Facades\Auth;
  
  class TournamentController extends Controller
  {
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Tournament/ExercisesByAthlete', [
        'tournaments' => Tournament::with('athlete')->get(),
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
        Tournament::create([
          'name' => $request->name,
          'place' => $request->place,
          'date' => Carbon::parse($request->date)->format('Y-m-d'),
          'athlete_id' => $request->athlete_id,
          'medal' => $request->medal,
        ]);
        
        return to_route('tournaments.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil menambahkan turnamen',
          'message' => "Turnamen '{$request->name}' berhasil ditambahkan!"
        ]);
      } catch (Exception $e) {
        return to_route('tournaments.index')->with('meta', [
          'status' => false,
          'title' => 'Gagal menambahkan turnamen',
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
      
      return Inertia('Tournament/Create', [
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'athletes' => Athlete::with('user')->get()->sortBy(function ($athlete) {
          return $athlete->user->full_name;
        })->values(),
      ]);
    }
    
    /**
     * Display the specified resource.
     */
    public function show(Tournament $tournament)
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Tournament/Show', [
        'tournament' => $tournament->load('athlete'),
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'athletes' => Athlete::with('user')->get()->sortBy(function ($athlete) {
          return $athlete->user->full_name;
        })->values(),
      ]);
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tournament $tournament)
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Tournament/Edit', [
        'tournament' => $tournament->load('athlete'),
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'athletes' => Athlete::with('user')->get()->sortBy(function ($athlete) {
          return $athlete->user->full_name;
        })->values(),
      ]);
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tournament $tournament)
    {
      try {
        $tournament->update([
          'name' => $request->name,
          'place' => $request->place,
          'date' => Carbon::parse($request->date)->format('Y-m-d'),
          'athlete_id' => $request->athlete_id,
          'medal' => $request->medal,
        ]);
        
        return to_route('tournaments.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil memperbarui turnamen',
          'message' => "Turnamen '{$request->name}' berhasil diperbarui!"
        ]);
      } catch (Exception $e) {
        return to_route('tournaments.index')->with('meta', [
          'status' => false,
          'title' => 'Gagal memperbarui turnamen',
          'message' => $e->getMessage()
        ]);
      }
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tournament $tournament)
    {
      try {
        $tournament->delete();
        
        return to_route('tournaments.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil menghapus turnamen',
          'message' => "Turnamen '{$tournament->name}' berhasil dihapus!"
        ]);
      } catch (Exception $e) {
        return to_route('tournaments.index')->with('meta', [
          'status' => false,
          'title' => 'Gagal menghapus turnamen',
          'message' => $e->getMessage()
        ]);
      }
    }
  }
