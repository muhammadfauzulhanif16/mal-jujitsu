<?php
  
  namespace App\Http\Controllers;
  
  use App\Models\History;
  use Illuminate\Support\Facades\Auth;
  
  class HistoryController extends Controller
  {
    public function index()
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      return Inertia('History/Index', [
        'histories' => History::with('user')->latest()->get()->map(function ($history) {
          $history['avatar'] = str_contains($history->user->avatar, 'https') ? $history->user->avatar : ($history->user->avatar ? asset('storage/' . $history->user->avatar) : null);
          return $history;
        }),
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'unread_histories' => History::where('is_read', false)->get(),
      ]);
    }
    
    public function update($id)
    {
      $history = History::find($id);
      $history->update(['is_read' => true]);
      
      return redirect()->route('histories.index');
    }
  }
