<?php
  
  namespace App\Http\Controllers;
  
  use App\Http\Requests\StoreEvaluationRequest;
  use App\Http\Requests\UpdateEvaluationRequest;
  use App\Models\Criteria;
  use App\Models\Evaluation;
  use App\Models\Exercise;
  use Illuminate\Support\Facades\Auth;
  
  class EvaluationController extends Controller
  {
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Evaluation/Index', [
//        'exercises' => Exercise::with(['athlete', 'coach'])->get(),
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser]
      ]);
    }
    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Evaluation/Create', [
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'exercises' => Exercise::with(['athlete'])->get(),
        'criterias' => Criteria::with(['subCriterias.subSubCriterias'])->get()
      ]);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEvaluationRequest $request)
    {
      //
    }
    
    /**
     * Display the specified resource.
     */
    public function show(Evaluation $evaluation)
    {
      //
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Evaluation $evaluation)
    {
      //
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEvaluationRequest $request, Evaluation $evaluation)
    {
      //
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Evaluation $evaluation)
    {
      //
    }
  }
