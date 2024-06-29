<?php
  
  namespace App\Http\Controllers;
  
  use App\Models\History;
  use Exception;
  use Illuminate\Http\RedirectResponse;
  use Illuminate\Http\Request;
  use Illuminate\Support\Facades\Auth;
  use Illuminate\Support\Facades\Redirect;
  use Illuminate\Support\Facades\Storage;
  use Inertia\Inertia;
  use Inertia\Response;
  
  class ProfileController extends Controller
  {
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
      $authedUser = Auth::user();
      $authedUser->avatar = str_contains($authedUser->avatar, 'https') ? $authedUser->avatar : ($authedUser->avatar ? asset('storage/' . $authedUser->avatar) : null);
      
      if ($authedUser->role === 'Ne-Waza' || $authedUser->role === 'Fighting') {
        $authedUser->load('athlete');
      }
      
      return Inertia::render('Profile/Edit', [
        'meta' => session('meta'),
        'auth' => ['user' => $authedUser],
        'unread_histories' => History::where('is_read', false)->get(),
      ]);
    }
    
    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
      try {
        $user = $request->user();
        
        
        if ($request->hasFile('avatar')) {
          $avatar = $request->file('avatar');
          
          if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
          }
          
          $user->update([
            'avatar' => $avatar->store('avatars', 'public'),
          ]);
        }
        
        $user->update([
          'full_name' => $request->full_name,
          'email' => $request->email,
        ]);
        
        History::create([
          'user_id' => Auth::id(),
          'content' => 'Mengubah profil',
        ]);
        
        return Redirect::to('/profile')->with('meta', [
          'status' => true,
          'title' => 'Berhasil memperbarui profil',
          'message' => 'Profil Anda berhasil diperbarui!'
        ]);
      } catch (Exception $e) {
        return Redirect::back()->with('meta', [
          'status' => false,
          'title' => 'Gagal memperbarui profil',
          'message' => $e->getMessage()
        ]);
        
      }
    }
    
    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
      $request->validate([
        'password' => ['required', 'current_password'],
      ]);
      
      $user = $request->user();
      
      Auth::logout();
      
      $user->delete();
      
      $request->session()->invalidate();
      $request->session()->regenerateToken();
      
      return Redirect::to('/');
    }
  }
