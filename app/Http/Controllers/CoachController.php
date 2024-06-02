<?php
  
  namespace App\Http\Controllers;
  
  use App\Models\Coach;
  use App\Models\User;
  use Exception;
  use Illuminate\Http\Request;
  use Illuminate\Support\Carbon;
  use Illuminate\Support\Facades\Auth;
  use Illuminate\Support\Facades\Hash;
  use Illuminate\Support\Facades\Storage;
  
  class CoachController extends Controller
  {
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Coach/ExercisesByAthlete', [
        'coaches' => Coach::with('user')->get()->map(function ($coach) {
          $coach->user->avatar = str_contains($coach->user->avatar, 'https') ? $coach->user->avatar : ($coach->user->avatar ? asset('storage/' . $coach->user->avatar) : null);
          return $coach;
        }),
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
        
        $user->coach()->create([
          'user_id' => $user->id,
        ]);
        
        return to_route('coaches.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil menambahkan pelatih',
          'message' => "Pelatih '{$request->full_name}' berhasil ditambahkan!"
        ]);
      } catch (Exception $e) {
        return to_route('coaches.index')->with('meta', [
          'status' => false,
          'title' => 'Gagal menambahkan pelatih',
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
      
      return Inertia('Coach/Create', [
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
          'password' => $request->password ? Hash::make($request->password) : $user->password
        ]);
        
        if ($request->hasFile('avatar')) {
          if ($user->avatar) {
            Storage::disk('public')->delete(str_replace('storage/', '', $user->avatar));
          }
          
          $user->update([
            'avatar' => $request->file('avatar')->store('avatars', 'public'),
          ]);
        }
        
        return redirect()->route('coaches.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil memperbarui pelatih',
          'message' => "Pelatih '{$request->full_name}' berhasil diperbarui!"
        ]);
      } catch (Exception $e) {
        return redirect()->route('coaches.index')->with('meta', [
          'status' => false,
          'title' => 'Gagal memperbarui pelatih',
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
      
      return Inertia('Coach/Show', [
        'user' => $user,
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
      
      return Inertia('Coach/Edit', [
        'user' => $user->load('coach'),
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
        
        return to_route('coaches.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil menghapus pelatih',
          'message' => "Pelatih '{$user->full_name}' berhasil dihapus!"
        ]);
      } catch (Exception $e) {
        return to_route('coaches.index')->with('meta', [
          'status' => false,
          'title' => 'Gagal menghapus pelatih',
          'message' => $e->getMessage()
        ]);
      }
    }
  }
