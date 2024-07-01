<?php
  
  namespace App\Http\Controllers;
  
  use App\Models\Criteria;
  use App\Models\Evaluation;
  use App\Models\Exercise;
  use App\Models\ExerciseAthlete;
  use App\Models\ExerciseEvaluation;
  use App\Models\History;
  use Exception;
  use Illuminate\Http\Request;
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
        'evaluations' => ExerciseEvaluation::with('exercise', 'athlete.user')->get()->map(function ($exerciseEvaluation) {
          $avatar = $exerciseEvaluation->athlete->user->avatar;
          if ($avatar) {
            if (str_contains($avatar, 'https')) {
              $exerciseEvaluation->athlete->user->avatar = $avatar;
            } else {
              $exerciseEvaluation->athlete->user->avatar = str_contains($avatar, 'storage/') ? $avatar : asset('storage/' . $avatar);
            }
          } else {
            $exerciseEvaluation->athlete->user->avatar = null;
          }
          return $exerciseEvaluation;
        })->groupBy('exercise_id')->map(function ($exerciseAthletes) {
          return [
            ...$exerciseAthletes->first()->exercise->toArray(),
            'athletes' => $exerciseAthletes->map(function ($exerciseAthlete) {
              return $exerciseAthlete->athlete->user->only('id', 'avatar', 'full_name', 'role');
            }),
          ];
        })->values(),
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'total_unread_histories' => History::where('is_read', false)->count(),
      ]);
    }
    
    public function users_index(Exercise $exercise)
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Evaluation/User/Index', [
        'exercise' => $exercise,
        'athletes' => ExerciseEvaluation::where('exercise_id', $exercise->id)->with('athlete.user')->get()->map(function ($exerciseEvaluation) {
          $exerciseEvaluation->athlete->user->avatar = $exerciseEvaluation->athlete->user->avatar ? (str_contains($exerciseEvaluation->athlete->user->avatar, 'https') ? $exerciseEvaluation->athlete->user->avatar : asset('storage/' . $exerciseEvaluation->athlete->user->avatar)) : null;
          return [
            'exercise_evaluation_id' => $exerciseEvaluation->id,
            ...$exerciseEvaluation->athlete->user->only('id', 'avatar', 'full_name', 'role')
          ];
        }),
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
        $exercise_evaluation = ExerciseEvaluation::create([
          'athlete_id' => $request->athlete_id,
          'exercise_id' => $request->exercise_id,
          'note' => $request->note,
        ]);
        
        History::create([
          'user_id' => Auth::id(),
          'content' => "Menambahkan penilaian latihan '{$exercise_evaluation->exercise->name}'",
        ]);
        
        foreach ($request->evaluations as $evaluation) {
          Evaluation::create([
            'exercise_evaluation_id' => $exercise_evaluation->id,
            'sub_sub_criteria_id' => $evaluation['sub_sub_criteria_id'],
            'value' => $evaluation['value'] !== '' ? $evaluation['value'] : '-',
          ]);
        }
        
        return to_route('evaluations.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil menambahkan penilaian',
          'message' => "Penilaian berhasil ditambahkan!"
        ]);
      } catch (Exception $e) {
        return to_route('evaluations.index')->with('meta', [
          'status' => false,
          'title' => 'Gagal menambahkan penilaian',
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
      
      $evaluations = Exercise::all()->map(function ($exercise) {
        return [
          'exercise_id' => $exercise->id,
          'athletes' => ExerciseEvaluation::where('exercise_id', $exercise->id)->get()->pluck('athlete_id'),
        ];
      });
      
      $exercises = ExerciseAthlete::with('exercise', 'athlete.user')
        ->where(function ($query) use ($evaluations) {
          foreach ($evaluations as $evaluation) {
            $query->where(function ($query) use ($evaluation) {
              $query->where('exercise_id', '!=', $evaluation['exercise_id'])
                ->orWhereNotIn('athlete_id', $evaluation['athletes']);
            });
          }
        })
        ->get()
        ->groupBy('exercise_id')
        ->map(function ($exerciseAthletes) {
          return [
            ...$exerciseAthletes->first()->exercise->toArray(),
            'athletes' => $exerciseAthletes->map(function ($exerciseAthlete) {
              $exerciseAthlete->athlete->user->avatar = $exerciseAthlete->athlete->user->avatar ? (str_contains($exerciseAthlete->athlete->user->avatar, 'https') ? $exerciseAthlete->athlete->user->avatar : asset('storage/' . $exerciseAthlete->athlete->user->avatar)) : null;
              return $exerciseAthlete->athlete->user->only('id', 'avatar', 'full_name', 'role');
            }),
          ];
        })->values();
      
      return Inertia('Evaluation/Create', [
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'exercises' => $exercises,
        'criterias' => Criteria::with(['subCriterias.subSubCriterias'])->get(),
        'total_unread_histories' => History::where('is_read', false)->count(),
      ]);
    }
    
    /**
     * Display the specified resource.
     */
    public function show(ExerciseEvaluation $exerciseEvaluation)
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      $evaluationAthleteIds = ExerciseEvaluation::with('exercise')->get()->pluck('athlete.user.id')->unique();
      
      $exercises = ExerciseAthlete::with('exercise', 'athlete.user')
        ->whereNotIn('athlete_id', $evaluationAthleteIds)
        ->get()
        ->groupBy('exercise_id')
        ->map(function ($exerciseAthletes) {
          return [
            ...$exerciseAthletes->first()->exercise->toArray(),
            'athletes' => $exerciseAthletes->map(function ($exerciseAthlete) {
              $exerciseAthlete->athlete->user->avatar = $exerciseAthlete->athlete->user->avatar ? (str_contains($exerciseAthlete->athlete->user->avatar, 'https') ? $exerciseAthlete->athlete->user->avatar : asset('storage/' . $exerciseAthlete->athlete->user->avatar)) : null;
              return $exerciseAthlete->athlete->user->only('id', 'avatar', 'full_name', 'role');
            }),
          ];
        })->values();
      
      return Inertia('Evaluation/Show', [
        'exercise_evaluation' => [
          ...$exerciseEvaluation->only('id', 'note'),
          'evaluations' => $exerciseEvaluation->evaluations->map(function ($evaluation) {
            return [
              'sub_sub_criteria_id' => $evaluation->sub_sub_criteria_id,
              'value' => $evaluation->value,
            ];
          }),
          'exercise' => $exerciseEvaluation->exercise->only(['id', 'name', 'date']),
          'athlete' => [
            ...$exerciseEvaluation->athlete->user->only('id', 'full_name', 'role'),
            'avatar' => str_contains($exerciseEvaluation->athlete->user->avatar, 'https') ? $exerciseEvaluation->athlete->user->avatar : ($exerciseEvaluation->athlete->user->avatar ? asset('storage/' . $exerciseEvaluation->athlete->user->avatar) : null),
          ]
        ],
        'criterias' => Criteria::with(['subCriterias.subSubCriterias'])->get(),
        'exercises' => $exercises,
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'total_unread_histories' => History::where('is_read', false)->count(),
      ]);
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExerciseEvaluation $exerciseEvaluation)
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      $evaluationAthleteIds = ExerciseEvaluation::with('exercise')->get()->pluck('athlete.user.id')->unique();
      
      $exercises = ExerciseAthlete::with('exercise', 'athlete.user')
        ->whereNotIn('athlete_id', $evaluationAthleteIds)
        ->get()
        ->groupBy('exercise_id')
        ->map(function ($exerciseAthletes) {
          return [
            ...$exerciseAthletes->first()->exercise->toArray(),
            'athletes' => $exerciseAthletes->map(function ($exerciseAthlete) {
              $exerciseAthlete->athlete->user->avatar = $exerciseAthlete->athlete->user->avatar ? (str_contains($exerciseAthlete->athlete->user->avatar, 'https') ? $exerciseAthlete->athlete->user->avatar : asset('storage/' . $exerciseAthlete->athlete->user->avatar)) : null;
              return $exerciseAthlete->athlete->user->only('id', 'avatar', 'full_name', 'role');
            }),
          ];
        })->values();
      
      return Inertia('Evaluation/Edit', [
        'exercise_evaluation' => [
          ...$exerciseEvaluation->only('id', 'note'),
          'evaluations' => $exerciseEvaluation->evaluations->map(function ($evaluation) {
            return [
              'sub_sub_criteria_id' => $evaluation->sub_sub_criteria_id,
              'value' => $evaluation->value,
            ];
          }),
          'exercise' => $exerciseEvaluation->exercise->only(['id', 'name', 'date']),
          'athlete' => [
            ...$exerciseEvaluation->athlete->user->only('id', 'full_name', 'role'),
            'avatar' => str_contains($exerciseEvaluation->athlete->user->avatar, 'https') ? $exerciseEvaluation->athlete->user->avatar : ($exerciseEvaluation->athlete->user->avatar ? asset('storage/' . $exerciseEvaluation->athlete->user->avatar) : null),
          ]
        ],
        'criterias' => Criteria::with(['subCriterias.subSubCriterias'])->get(),
        'exercises' => $exercises,
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'total_unread_histories' => History::where('is_read', false)->count(),
      ]);
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ExerciseEvaluation $exerciseEvaluation)
    {
      try {
        $exerciseEvaluation->update([
          'athlete_id' => $request->athlete_id,
          'exercise_id' => $request->exercise_id,
          'note' => $request->note,
        ]);
        
        $exerciseEvaluation->evaluations()->delete();
        
        foreach ($request->evaluations as $evaluation) {
          Evaluation::create([
            'exercise_evaluation_id' => $exerciseEvaluation->id,
            'sub_sub_criteria_id' => $evaluation['sub_sub_criteria_id'],
            'value' => $evaluation['value'],
          ]);
        }
        
        History::create([
          'user_id' => Auth::id(),
          'content' => "Mengubah penilaian latihan '{$exerciseEvaluation->exercise->name}'",
        ]);
        
        return to_route('evaluations.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil mengubah penilaian',
          'message' => "Penilaian latihan '{$exerciseEvaluation->exercise->name}' berhasil diubah!"
        ]);
        
      } catch (Exception $e) {
        return to_route('evaluations.index')->with('meta', [
          'status' => false,
          'title' => 'Gagal mengubah penilaian',
          'message' => $e->getMessage()
        ]);
      }
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExerciseEvaluation $exerciseEvaluation)
    {
      try {
        $exerciseEvaluation->delete();
        
        History::create([
          'user_id' => Auth::id(),
          'content' => "Menghapus penilaian latihan '{$exerciseEvaluation->exercise->name}'",
        ]);
        
        return to_route('evaluations.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil menghapus penilaian',
          'message' => "Penilaian latihan '{$exerciseEvaluation->exercise->name}' berhasil dihapus!"
        ]);
      } catch (Exception $e) {
        return to_route('evaluations.index')->with('meta', [
          'status' => false,
          'title' => 'Gagal menghapus penilaian',
          'message' => $e->getMessage()
        ]);
      }
    }
  }
