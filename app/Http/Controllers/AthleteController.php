<?php
  
  namespace App\Http\Controllers;
  
  use App\Models\Athlete;
  use App\Models\ExerciseEvaluation;
  use App\Models\User;
  use Exception;
  use Illuminate\Http\Request;
  use Illuminate\Support\Carbon;
  use Illuminate\Support\Facades\Auth;
  use Illuminate\Support\Facades\Hash;
  use Illuminate\Support\Facades\Storage;
  
  class AthleteController extends Controller
  {
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Athlete/Index', [
        'athletes' => Athlete::with('user')->get()->map(function ($athlete) {
          $athlete->user->avatar = str_contains($athlete->user->avatar, 'https') ? $athlete->user->avatar : ($athlete->user->avatar ? asset('storage/' . $athlete->user->avatar) : null);
          return $athlete;
        }),
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser]
      ]);
    }
    
    public function evaluation_index(User $user)
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Athlete/Evalution/Index', [
        'evaluations' => ExerciseEvaluation::with('exercise.athlete')->whereHas('exercise.athlete', function ($query) use ($user) {
          $query->where('id', $user->id);
        })->get(),
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
        $user = User::create([
          'full_name' => $request->full_name,
          'gender' => $request->gender,
          'birth_date' => Carbon::parse($request->birth_date)->format('Y-m-d'),
          'role' => $request->role,
          'email' => $request->email,
          'password' => Hash::make($request->password),
        ]);
        
        if ($request->hasFile('avatar')) {
          $user->update([
            'avatar' => $request->file('avatar')->store('avatars', 'public'),
          ]);
        }
        
        $user->athlete()->create([
          'user_id' => $user->id,
          'weight' => $request->weight,
        ]);
        
        return to_route('athletes.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil menambahkan atlet',
          'message' => "Atlet '{$request->full_name}' berhasil ditambahkan!"
        ]);
      } catch (Exception $e) {
        return to_route('athletes.index')->with('meta', [
          'status' => false,
          'title' => 'Gagal menambahkan atlet',
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
      
      return Inertia('Athlete/Create', [
        'users' => User::all(),
        'auth' => ['user' => $authedUser]
      ]);
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
      try {
        $user->update([
          'full_name' => $request->full_name,
          'gender' => $request->gender,
          'birth_date' => Carbon::parse($request->birth_date)->format('Y-m-d'),
          'role' => $request->role,
          'email' => $request->email,
          'password' => Hash::make($request->password),
        ]);
        
        if ($request->hasFile('avatar')) {
          if ($user->avatar) {
            Storage::disk('public')->delete(str_replace('storage/', '', $user->avatar));
          }
          
          $user->update([
            'avatar' => $request->file('avatar')->store('avatars', 'public'),
          ]);
        }
        
        $user->athlete()->update([
          'weight' => $request->weight,
        ]);
        
        return redirect()->route('athletes.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil memperbarui atlet',
          'message' => "Atlet '{$request->full_name}' berhasil diperbarui!"
        ]);
      } catch (Exception $e) {
        return redirect()->route('athletes.index')->with('meta', [
          'status' => false,
          'title' => 'Gagal memperbarui atlet',
          'message' => $e->getMessage()
        ]);
      }
    }
    
    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      $user->avatar = str_contains($user->avatar, 'https') ? $user->avatar : ($user->avatar ? asset('storage/' . $user->avatar) : null);
      
      return Inertia('Athlete/Show', [
        'user' => $user->load('athlete'),
        'auth' => ['user' => $authedUser]
      ]);
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      $user->avatar = str_contains($user->avatar, 'https') ? $user->avatar : ($user->avatar ? asset('storage/' . $user->avatar) : null);
      
      return Inertia('Athlete/Edit', [
        'user' => $user->load('athlete'),
        'users' => User::all(),
        'auth' => ['user' => $authedUser]
      ]);
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
      try {
        if ($user->avatar) {
          Storage::disk('public')->delete(str_replace('storage/', '', $user->avatar));
        }
        
        $user->delete();
        
        return to_route('athletes.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil menghapus atlet',
          'message' => "Atlet '{$user->full_name}' berhasil dihapus!"
        ]);
      } catch (Exception $e) {
        return to_route('athletes.index')->with('meta', [
          'status' => false,
          'title' => 'Gagal menghapus atlet',
          'message' => $e->getMessage()
        ]);
      }
    }
  }
