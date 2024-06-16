<?php
  
  namespace App\Http\Controllers;
  
  use App\Http\Requests\StoreReportRequest;
  use App\Http\Requests\UpdateReportRequest;
  use App\Models\Athlete;
  use App\Models\Criteria;
  use App\Models\ExerciseEvaluation;
  use App\Models\Report;
  use App\Models\SubCriteria;
  use App\Models\SubSubCriteria;
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

//      $evaluations = null;
      $tournaments = null;
      
      if (in_array($authedUser->role, ['Ne-Waza', 'Fighting'])) {
        $evaluations = ExerciseEvaluation::where('athlete_id', $authedUser->id)->with('evaluations')->get();
        $tournaments = $authedUser->athlete->tournaments;
      }
      
      
      return Inertia('Report/Index', [
        'reports' => in_array($authedUser->role, ['Ne-Waza', 'Fighting']) ? null : Athlete::with(['user', 'tournaments', 'evaluations'])
          ->has('evaluations')
          ->has('tournaments')
          ->get(),
        'auth' => ['user' => $authedUser],
        'exerciseEvaluations' => ExerciseEvaluation::where('athlete_id', $authedUser->id)
          ->with(['exercise', 'evaluations.subSubCriteria.subCriteria.criteria'])
          ->get()
          ->map(function ($evaluation) {
            return [
              'exercise' => $evaluation->exercise,
              'criterias' => $evaluation->evaluations->filter(function ($evaluation) {
                return $evaluation->subSubCriteria->subCriteria->criteria != null;
              })->groupBy([
                function ($evaluation) {
                  return $evaluation->subSubCriteria->subCriteria->criteria->id;
                },
                function ($evaluation) {
                  return $evaluation->subSubCriteria->subCriteria->id;
                },
                function ($evaluation) {
                  return $evaluation->subSubCriteria->id;
                }
              ])->map(function ($subSubCriteriaGroup, $criteriaId) {
                $criteria = Criteria::find($criteriaId)->toArray();
                
                return [
                  ...$criteria,
                  'sub_criterias' => $subSubCriteriaGroup->map(function ($subCriteriaGroup, $subCriteriaId) {
                    $sub_criteria = SubCriteria::find($subCriteriaId)->toArray();
                    
                    return [
                      ...$sub_criteria,
                      'sub_sub_criterias' => $subCriteriaGroup->map(function ($evaluationGroup, $subSubCriteriaId) {
                        $sub_sub_criteria = SubSubCriteria::find($subSubCriteriaId)->toArray();
                        
                        return [
                          ...$sub_sub_criteria,
                          'evaluation' => $evaluationGroup->first()
                        ];
                      })->values()
                    ];
                  })->values()
                ];
              })->sortBy('name')->values()
            ];
          }),
        'tournaments' => [],
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
