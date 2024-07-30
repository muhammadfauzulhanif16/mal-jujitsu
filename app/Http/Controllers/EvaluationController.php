<?php
  
  namespace App\Http\Controllers;
  
  use App\Models\Athlete;
  use App\Models\Criteria;
  use App\Models\Evaluation;
  use App\Models\EvaluationCriteria;
  use App\Models\EvaluationExercises;
  use App\Models\EvaluationTournaments;
  use App\Models\ExerciseAthlete;
  use App\Models\History;
  use App\Models\Tournament;
  use App\Models\User;
  use Exception;
  use Illuminate\Http\Request;
  use Illuminate\Support\Carbon;
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
//        'evaluations' => ExerciseEvaluation::with('exercise', 'athlete.user')->get()->map(function ($exerciseEvaluation) {
//          $avatar = $exerciseEvaluation->athlete->user->avatar;
//          if ($avatar) {
//            if (str_contains($avatar, 'https')) {
//              $exerciseEvaluation->athlete->user->avatar = $avatar;
//            } else {
//              $exerciseEvaluation->athlete->user->avatar = str_contains($avatar, 'storage/') ? $avatar : asset('storage/' . $avatar);
//            }
//          } else {
//            $exerciseEvaluation->athlete->user->avatar = null;
//          }
//          return $exerciseEvaluation;
//        })->groupBy('exercise_id')->map(function ($exerciseAthletes) {
//          return [
//            ...$exerciseAthletes->first()->exercise->toArray(),
//            'athletes' => $exerciseAthletes->map(function ($exerciseAthlete) {
//              return $exerciseAthlete->athlete->user->only('id', 'avatar', 'full_name', 'role');
//            }),
//          ];
//        })->values(),
        
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
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'total_unread_histories' => History::where('is_read', false)->count(),
      ]);
    }
    
    public function users_index(User $user)
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Evaluation/User/Index', [
        'evaluations' => Evaluation::with(['exercises', 'tournaments'])
          ->where('athlete_id', $user->id)
          ->get()
          ->map(function ($evaluation) {
            return [
              'id' => $evaluation->id,
              'period' => $evaluation->period,
              'start_date' => $evaluation->start_date,
              'end_date' => $evaluation->end_date,
              'total_exercises' => $evaluation->exercises->count(),
              'total_tournaments' => $evaluation->tournaments->count(),
            ];
          })->values(),
        'athlete' => $user,
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
        $athlete = User::find($request->athlete_id);
        $evaluations = Evaluation::where('athlete_id', $request->athlete_id)
          ->first();
        
        $evaluation = Evaluation::create([
          'athlete_id' => $request->athlete_id,
          'note' => $request->note,
          'period' => is_null($evaluations) ? 1 : ($evaluations->count() + 1),
          'start_date' => Carbon::parse($request->time_period[0])->format('Y-m-d'),
          'end_date' => Carbon::parse($request->time_period[1])->format('Y-m-d'),
        ]);
        
        History::create([
          'user_id' => Auth::id(),
          'content' => "Menambahkan penilaian atlet '{$athlete->full_name}' (periode " . (is_null($evaluations) ? 1 : ($evaluations->count())) . ': ' . Carbon::parse($request->time_period[0])->format('M Y') . ' - ' . Carbon::parse($request->time_period[1])->format('M Y') . ')',
        ]);
        
        foreach ($request->evaluations as $criteria) {
          EvaluationCriteria::create([
            'evaluation_id' => $evaluation->id,
            'sub_sub_criteria_id' => $criteria['sub_sub_criteria_id'],
            'value' => $criteria['value'] !== '' ? $criteria['value'] : '-',
          ]);
        }
        
        foreach ($request->exercises as $exercise) {
          EvaluationExercises::create([
            'evaluation_id' => $evaluation->id,
            'exercise_id' => $exercise['id']
          ]);
        }
        
        foreach ($request->tournaments as $tournament) {
          EvaluationTournaments::create([
            'evaluation_id' => $evaluation->id,
            'tournament_id' => $tournament['id']
          ]);
        }
        
        return to_route('evaluations.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil menambahkan penilaian',
          'message' => "Penilaian atlet '{$athlete->full_name}' (periode " . (is_null($evaluations) ? 1 : ($evaluations->count())) . ': ' . Carbon::parse($request->time_period[0])->format('F Y') . ' - ' . Carbon::parse($request->time_period[1])->format('F Y') . ') berhasil ditambahkan!'
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
      
      return Inertia('Evaluation/Create', [
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'exercises' => ExerciseAthlete::with('exercise')->get()->groupBy('exercise_id')->map(function ($exerciseAthletes) {
          return [
            ...$exerciseAthletes->first()->exercise->toArray(),
            'athletes' => $exerciseAthletes->map(function ($exerciseAthlete) {
              $exerciseAthlete->athlete->user->avatar = $exerciseAthlete->athlete->user->avatar ? (str_contains($exerciseAthlete->athlete->user->avatar, 'https') ? $exerciseAthlete->athlete->user->avatar : asset('storage/' . $exerciseAthlete->athlete->user->avatar)) : null;
              return $exerciseAthlete->athlete->user->only('id', 'avatar', 'full_name', 'role');
            }),
          ];
        })->values(),
        'tournaments' => Tournament::all(),
        'athletes' => Athlete::all()->map(function ($athlete) {
          $athlete->user->avatar = $athlete->user->avatar
            ? (str_contains($athlete->user->avatar, 'https') ? $athlete->user->avatar : asset('storage/' . $athlete->user->avatar))
            : null;
          return $athlete->user->only('id', 'avatar', 'full_name', 'role');
        })->sortBy('full_name')->values(),
        'criterias' => Criteria::with(['subCriterias.subSubCriterias'])->get(),
        'total_unread_histories' => History::where('is_read', false)->count(),
      ]);
    }
    
    /**
     * Display the specified resource.
     */
    public function show(Evaluation $evaluation)
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Evaluation/Show', [
        'evaluation_criterias' => $evaluation->evaluationCriterias,
        'evaluation' => $evaluation,
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'exercises' => ExerciseAthlete::with('exercise')->get()->groupBy('exercise_id')->map(function ($exerciseAthletes) {
          return [
            ...$exerciseAthletes->first()->exercise->toArray(),
            'athletes' => $exerciseAthletes->map(function ($exerciseAthlete) {
              $exerciseAthlete->athlete->user->avatar = $exerciseAthlete->athlete->user->avatar ? (str_contains($exerciseAthlete->athlete->user->avatar, 'https') ? $exerciseAthlete->athlete->user->avatar : asset('storage/' . $exerciseAthlete->athlete->user->avatar)) : null;
              return $exerciseAthlete->athlete->user->only('id', 'avatar', 'full_name', 'role');
            }),
          ];
        })->values(),
        'tournaments' => Tournament::all(),
        'athletes' => Athlete::all()->map(function ($athlete) {
          $athlete->user->avatar = $athlete->user->avatar
            ? (str_contains($athlete->user->avatar, 'https') ? $athlete->user->avatar : asset('storage/' . $athlete->user->avatar))
            : null;
          return $athlete->user->only('id', 'avatar', 'full_name', 'role');
        })->sortBy('full_name')->values(),
        'criterias' => Criteria::with(['subCriterias.subSubCriterias'])->get(),
        'total_unread_histories' => History::where('is_read', false)->count(),
      ]);
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Evaluation $evaluation)
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Evaluation/Edit', [
        'evaluation' => $evaluation,
        'evaluation_criterias' => $evaluation->evaluationCriterias,
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'exercises' => ExerciseAthlete::with('exercise')->get()->groupBy('exercise_id')->map(function ($exerciseAthletes) {
          return [
            ...$exerciseAthletes->first()->exercise->toArray(),
            'athletes' => $exerciseAthletes->map(function ($exerciseAthlete) {
              $exerciseAthlete->athlete->user->avatar = $exerciseAthlete->athlete->user->avatar ? (str_contains($exerciseAthlete->athlete->user->avatar, 'https') ? $exerciseAthlete->athlete->user->avatar : asset('storage/' . $exerciseAthlete->athlete->user->avatar)) : null;
              return $exerciseAthlete->athlete->user->only('id', 'avatar', 'full_name', 'role');
            }),
          ];
        })->values(),
        'tournaments' => Tournament::all(),
        'athletes' => Athlete::all()->map(function ($athlete) {
          $athlete->user->avatar = $athlete->user->avatar
            ? (str_contains($athlete->user->avatar, 'https') ? $athlete->user->avatar : asset('storage/' . $athlete->user->avatar))
            : null;
          return $athlete->user->only('id', 'avatar', 'full_name', 'role');
        })->sortBy('full_name')->values(),
        'criterias' => Criteria::with(['subCriterias.subSubCriterias'])->get(),
        'total_unread_histories' => History::where('is_read', false)->count(),
      ]);
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Evaluation $evaluation)
    {
      try {
        $evaluation->delete();
        
        $athlete = User::find($request->athlete_id);
        $evaluations = Evaluation::where('athlete_id', $request->athlete_id)
          ->first();
        
        $evaluation = Evaluation::create([
          'athlete_id' => $request->athlete_id,
          'note' => $request->note,
          'period' => is_null($evaluations) ? 1 : ($evaluations->count() + 1),
          'start_date' => Carbon::parse($request->time_period[0])->format('Y-m-d'),
          'end_date' => Carbon::parse($request->time_period[1])->format('Y-m-d'),
        ]);
        
        History::create([
          'user_id' => Auth::id(),
          'content' => "Mengubah penilaian atlet '{$athlete->full_name}' (periode " . (is_null($evaluations) ? 1 : ($evaluations->count())) . ': ' . Carbon::parse($request->time_period[0])->format('M Y') . ' - ' . Carbon::parse($request->time_period[1])->format('M Y') . ')',
        ]);
        
        foreach ($request->evaluations as $criteria) {
          EvaluationCriteria::create([
            'evaluation_id' => $evaluation->id,
            'sub_sub_criteria_id' => $criteria['sub_sub_criteria_id'],
            'value' => $criteria['value'] !== '' ? $criteria['value'] : '-',
          ]);
        }
        
        foreach ($request->exercises as $exercise) {
          EvaluationExercises::create([
            'evaluation_id' => $evaluation->id,
            'exercise_id' => $exercise['id']
          ]);
        }
        
        foreach ($request->tournaments as $tournament) {
          EvaluationTournaments::create([
            'evaluation_id' => $evaluation->id,
            'tournament_id' => $tournament['id']
          ]);
        }
        
        return to_route('evaluations.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil mengubah penilaian',
          'message' => "Penilaian atlet '{$athlete->full_name}' (periode " . (is_null($evaluations) ? 1 : ($evaluations->count())) . ': ' . Carbon::parse($request->time_period[0])->format('F Y') . ' - ' . Carbon::parse($request->time_period[1])->format('F Y') . ') berhasil diubah!'
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
//    public function destroy(Evaluation $evaluation)
//    {
//      try {
//        $evaluation->delete();
//
//        History::create([
//          'user_id' => Auth::id(),
//          'content' => "Menghapus penilaian atlet '{$evaluation->athlete->user->full_name}' (periode " . $evaluation->period . ': ' . Carbon::parse($evaluation->start_date[0])->format('M Y') . ' - ' . Carbon::parse($evaluation->end_date[1])->format('M Y') . ')',
//        ]);
//
//        return to_route('evaluations.index')->with('meta', [
//          'status' => true,
//          'title' => 'Berhasil menghapus penilaian',
//          'message' => "Penilaian atlet '{$evaluation->athlete->full_name}' (periode " . $evaluation->period . ': ' . Carbon::parse($evaluation->start_date)->format('F Y') . ' - ' . Carbon::parse($evaluation->end_date)->format('F Y') . ') berhasil dihapus!'
//        ]);
//      } catch (Exception $e) {
//        return to_route('evaluations.index')->with('meta', [
//          'status' => false,
//          'title' => 'Gagal menghapus penilaian',
//          'message' => $e->getMessage()
//        ]);
//      }
//    }
    public function destroy(Evaluation $evaluation)
    {
      try {
        $evaluation->delete();
        
        History::create([
          'user_id' => Auth::id(),
          'content' => "Menghapus penilaian atlet '{$evaluation->athlete->user->full_name}' (periode " . $evaluation->period . ': ' . Carbon::parse($evaluation->start_date)->format('M Y') . ' - ' . Carbon::parse($evaluation->end_date)->format('M Y') . ')',
        ]);
        
        return to_route('evaluations.index')->with('meta', [
          'status' => true,
          'title' => 'Berhasil menghapus penilaian',
          'message' => "Penilaian atlet '{$evaluation->athlete->full_name}' (periode " . $evaluation->period . ': ' . Carbon::parse($evaluation->start_date)->format('F Y') . ' - ' . Carbon::parse($evaluation->end_date)->format('F Y') . ') berhasil dihapus!'
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
