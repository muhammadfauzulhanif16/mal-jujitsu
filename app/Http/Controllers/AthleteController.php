<?php
  
  namespace App\Http\Controllers;
  
  use App\Models\Athlete;
  use App\Models\History;
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
          return [
            'id' => $athlete->user_id,
            'avatar' => str_contains($athlete->user->avatar, 'https') ? $athlete->user->avatar : ($athlete->user->avatar ? asset('storage/' . $athlete->user->avatar) : null),
            'full_name' => $athlete->user->full_name,
            'role' => $athlete->user->role,
          ];
        })->sortBy('full_name')->values(),
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
        
        History::create([
          'user_id' => Auth::id(),
          'content' => "Menambahkan atlet '{$user->full_name}'"
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
        'existing_emails' => User::pluck('email'),
        'auth' => ['user' => $authedUser],
        'total_unread_histories' => History::where('is_read', false)->count(),
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
        
        History::create([
          'user_id' => Auth::id(),
          'content' => "Memperbarui atlet '{$user->full_name}'"
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
        'athlete' => [
          'id' => $user->id,
          'avatar' => $user->avatar,
          'full_name' => $user->full_name,
          'role' => $user->role,
          'gender' => $user->gender,
          'birth_date' => $user->birth_date,
          'email' => $user->email,
          'weight' => $user->athlete->weight,
        ],
        'auth' => ['user' => $authedUser],
        'total_unread_histories' => History::where('is_read', false)->count(),
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
        'athlete' => [
          'id' => $user->id,
          'avatar' => $user->avatar,
          'full_name' => $user->full_name,
          'role' => $user->role,
          'gender' => $user->gender,
          'birth_date' => $user->birth_date,
          'email' => $user->email,
          'weight' => $user->athlete->weight,
        ],
        'existing_emails' => User::pluck('email'),
        'auth' => ['user' => $authedUser],
        'total_unread_histories' => History::where('is_read', false)->count(),
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
        
        History::create([
          'user_id' => Auth::id(),
          'content' => "Menghapus atlet '{$user->full_name}'"
        ]);
        
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
