<?php
  
  namespace App\Http\Controllers;
  
  use App\Models\Criteria;
  use App\Models\Evaluation;
  use App\Models\Exercise;
  use App\Models\ExerciseEvaluation;
  use Exception;
  use Illuminate\Http\Request;
  use Illuminate\Support\Facades\Auth;
  
  class EvaluationController extends Controller
  {
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
      if ($request->query('user')) {
        dd($request->query('user') ? 'ada' : 'tidak ada');
      }
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Evaluation/Index', [
//        'athletes' => ExerciseEvaluation::with('exercise.athlete')
//          ->get()
//          ->map(function ($exerciseEvaluation) {
//            $exerciseEvaluation->exercise->athlete->avatar = str_contains($exerciseEvaluation->exercise->athlete->avatar, 'https') ? $exerciseEvaluation->exercise->athlete->avatar : ($exerciseEvaluation->exercise->athlete->avatar ? asset('storage/' . $exerciseEvaluation->exercise->athlete->avatar) : null);
//            return $exerciseEvaluation->exercise->athlete;
//          })
//          ->unique('id')
//          ->values(),
        'evaluations' => ExerciseEvaluation::with('exercise.athlete')->get(),
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
        $exercise_evaluation = ExerciseEvaluation::create([
          'exercise_id' => $request->exercise_id,
          'note' => $request->note,
        ]);
        
        foreach ($request->evaluations as $evaluation) {
          Evaluation::create([
            'athlete_id' => $request->exercise_evaluation->exercise->athlete_id,
            'exercise_evaluation_id' => $exercise_evaluation->id,
            'sub_sub_criteria_id' => $evaluation['sub_sub_criteria_id'],
            'value' => $evaluation['value'],
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
      
      return Inertia('Evaluation/Create', [
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'exercises' => Exercise::with('athlete')->doesntHave('exerciseEvaluation')->get()->map(function ($exercise) {
          $exercise->athlete->avatar = str_contains($exercise->athlete->avatar, 'https') ? $exercise->athlete->avatar : ($exercise->athlete->avatar ? asset('storage/' . $exercise->athlete->avatar) : null);
          return $exercise;
        }),
        'criterias' => Criteria::with(['subCriterias.subSubCriterias'])->get()
      ]);
    }
    
    /**
     * Display the specified resource.
     */
    public function show(ExerciseEvaluation $exerciseEvaluation)
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Evaluation/Show', [
        'exercise_evaluation' => $exerciseEvaluation->load(['exercise.athlete', 'evaluations.subSubCriteria']),
        'exercises' => Exercise::with('athlete')->doesntHave('exerciseEvaluation')->get()->map(function ($exercise) {
          $exercise->athlete->avatar = str_contains($exercise->athlete->avatar, 'https') ? $exercise->athlete->avatar : ($exercise->athlete->avatar ? asset('storage/' . $exercise->athlete->avatar) : null);
          return $exercise;
        }),
        'criterias' => Criteria::with(['subCriterias.subSubCriterias'])->get(),
        'evaluations' => $exerciseEvaluation->evaluations,
        'meta' => session('meta'),
        'auth' => ['user' => Auth::user()]
      ]);
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExerciseEvaluation $exerciseEvaluation)
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('Evaluation/Edit', [
        'exercise_evaluation' => $exerciseEvaluation->load(['exercise.athlete', 'evaluations.subSubCriteria']),
        'exercises' => Exercise::with('athlete')->doesntHave('exerciseEvaluation')->get()->map(function ($exercise) {
          $exercise->athlete->avatar = str_contains($exercise->athlete->avatar, 'https') ? $exercise->athlete->avatar : ($exercise->athlete->avatar ? asset('storage/' . $exercise->athlete->avatar) : null);
          return $exercise;
        }),
        'criterias' => Criteria::with(['subCriterias.subSubCriterias'])->get(),
        'evaluations' => $exerciseEvaluation->evaluations,
        'meta' => session('meta'),
        'auth' => ['user' => Auth::user()]
      ]);
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(ExerciseEvaluation $exerciseEvaluation)
    {
      try {
        $exerciseEvaluation->update([
          'note' => request('note'),
        ]);
        
        $exerciseEvaluation->evaluations()->delete();
        
        foreach (request('evaluations') as $evaluation) {
          Evaluation::create([
            'exercise_evaluation_id' => $exerciseEvaluation->id,
            'sub_sub_criteria_id' => $evaluation['sub_sub_criteria_id'],
            'value' => $evaluation['value'],
          ]);
        }
        
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
