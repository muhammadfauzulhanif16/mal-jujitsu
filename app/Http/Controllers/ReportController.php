<?php
  
  namespace App\Http\Controllers;
  
  use App\Http\Requests\StoreReportRequest;
  use App\Http\Requests\UpdateReportRequest;
  use App\Models\Athlete;
  use App\Models\ExerciseEvaluation;
  use App\Models\Report;
  use Illuminate\Support\Facades\Auth;
  
  class ReportController extends Controller
  {
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $authedUser = Auth::user()->load('athlete');
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Report/Index', [
        'reports' => Athlete::with(['user', 'tournaments', 'evaluations'])
          ->has('evaluations')
          ->has('tournaments')
          ->get(),
        'auth' => ['user' => $authedUser],
        'evaluations' => (Auth::user()->role === 'Ne-WaZa' || Auth::user()->role === 'Fighting') ? ExerciseEvaluation::where('athlete_id', $authedUser->athlete->id)->get() : null,
      ]);
    }
    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
      //
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReportRequest $request)
    {
      //
    }
    
    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
      //
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Report $report)
    {
      //
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReportRequest $request, Report $report)
    {
      //
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
      //
    }
  }
