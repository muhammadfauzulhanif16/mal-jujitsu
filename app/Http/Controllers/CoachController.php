<?php
  
  namespace App\Http\Controllers;
  
  use App\Http\Requests\UpdateCoachRequest;
  use App\Models\Coach;
  use App\Models\User;
  use Exception;
  use Illuminate\Http\Request;
  use Illuminate\Support\Carbon;
  use Illuminate\Support\Facades\Hash;
  
  class CoachController extends Controller
  {
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      return Inertia('Coach/Index', [
        'coaches' => Coach::with('user')->get(),
        'meta' => session('meta')
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
          'birth_date' => Carbon::parse($request->birth_date)->format('Y-m-d'),
          'role' => $request->role,
          'email' => $request->email,
          'password' => Hash::make($request->password),
        ]);
        
        if ($request->hasFile('avatar')) {
          $avatar = $request->file('avatar');
          $path = $avatar->store('avatars', 'public');
          $user->update([
            'avatar' => asset('storage/' . $path),
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
      return Inertia('Coach/Create');
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCoachRequest $request, Coach $coach)
    {
    
    }
    
    /**
     * Display the specified resource.
     */
    public function show(Coach $coach)
    {
      return Inertia('Coach/Show', [
        'coach' => $coach->load('user')
      ]);
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Coach $coach)
    {
      return Inertia('Coach/Edit', [
        'coach' => $coach->load('user')
      ]);
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Coach $coach)
    {
      return $coach->delete();
    }
  }
