<?php
  
  namespace App\Http\Controllers;
  
  use App\Http\Requests\StoreReportRequest;
  use App\Http\Requests\UpdateReportRequest;
  use App\Models\Criteria;
  use App\Models\Evaluation;
  use App\Models\Exercise;
  use App\Models\History;
  use App\Models\Report;
  use App\Models\SubCriteria;
  use App\Models\SubSubCriteria;
  use App\Models\Tournament;
  use App\Models\User;
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
        'evaluations' => in_array($authedUser->role, ['Ne-Waza', 'Fighting'])
          ? Evaluation::with(['exercises', 'tournaments'])->where('athlete_id', $authedUser->id)
            ->get()->map(function ($evaluation) {
              $evaluationArray = $evaluation->toArray();
              $evaluationArray['exercises'] = $evaluation->exercises->map(function ($exercise) {
                $exerciseDetail = Exercise::find($exercise->exercise_id);
                return array_merge($exercise->toArray(), $exerciseDetail ? $exerciseDetail->toArray() : []);
              })->toArray();
              $evaluationArray['tournaments'] = $evaluation->tournaments->map(function ($tournament) {
                $tournamentDetail = Tournament::find($tournament->tournament_id);
                return array_merge($tournament->toArray(), $tournamentDetail ? $tournamentDetail->toArray() : []);
              })->toArray();
              $evaluationArray['criterias'] = $evaluation->evaluationCriterias->groupBy([
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
              })->sortBy(function ($criteria) {
                // If the criteria name is 'Fisik', return a high value to sort it at the end
                return $criteria['name'] === 'Fisik' ? 1 : 0;
              })->values();
              
              return $evaluationArray;
            })->toArray()
          : [],
        'athletes' => Evaluation::distinct()->get(['athlete_id'])
          ->pluck('athlete_id')
          ->map(function ($athleteId) {
            $user = User::where('id', $athleteId)->first(['id', 'avatar', 'full_name', 'role']);
            if ($user) {
              $user->avatar = str_contains($user->avatar, 'https') ? $user->avatar : ($user->avatar ? asset('storage/' . $user->avatar) : null);
              // Count the evaluations for the athlete
              $totalEvaluations = Evaluation::where('athlete_id', $athleteId)->count();
              // Add the total evaluations to the user object/array
              $user->total_evaluations = $totalEvaluations;
              return $user;
            }
            return null;
          })->filter()->values()->toArray(),
        'total_unread_histories' => History::where('is_read', false)->count(),
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
    public function show(User $user)
    {
      $authedUser = Auth::user()->load('athlete');
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      $user->avatar = str_contains($user->avatar, 'https') ? $user->avatar : ($user->avatar ? asset('storage/' . $user->avatar) : null);
      $user['weight'] = $user->athlete->weight;
      
      return Inertia('Report/Show', [
        'evaluations' => in_array($authedUser->role, ['Ne-Waza', 'Fighting'])
          ? [] : Evaluation::with(['exercises', 'tournaments'])->where('athlete_id', $user->id)
            ->get()->map(function ($evaluation) {
              $evaluationArray = $evaluation->toArray();
              $evaluationArray['exercises'] = $evaluation->exercises->map(function ($exercise) {
                $exerciseDetail = Exercise::find($exercise->exercise_id);
                return array_merge($exercise->toArray(), $exerciseDetail ? $exerciseDetail->toArray() : []);
              })->toArray();
              $evaluationArray['tournaments'] = $evaluation->tournaments->map(function ($tournament) {
                $tournamentDetail = Tournament::find($tournament->tournament_id);
                return array_merge($tournament->toArray(), $tournamentDetail ? $tournamentDetail->toArray() : []);
              })->toArray();
              $evaluationArray['criterias'] = $evaluation->evaluationCriterias->groupBy([
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
              })->sortBy(function ($criteria) {
                // If the criteria name is 'Fisik', return a high value to sort it at the end
                return $criteria['name'] === 'Fisik' ? 1 : 0;
              })->values();
              
              return $evaluationArray;
            })->toArray(),
        'athlete' => $user,
        'total_unread_histories' => History::where('is_read', false)->count(),
      ]);
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
