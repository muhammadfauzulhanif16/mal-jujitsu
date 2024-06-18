<?php
  
  namespace App\Http\Controllers\Auth;
  
  use App\Events\UserLoggedIn;
  use App\Http\Controllers\Controller;
  use App\Http\Requests\Auth\LoginRequest;
  use Exception;
  use Illuminate\Http\RedirectResponse;
  use Illuminate\Http\Request;
  use Illuminate\Support\Facades\Auth;
  use Inertia\Inertia;
  use Inertia\Response;
  
  class AuthenticatedSessionController extends Controller
  {
    /**
     * Display the login view.
     */
    public function create(): Response
    {
      return Inertia::render('Auth/Login', [
        'meta' => session('meta'),
      ]);
    }
    
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
      try {
        $request->authenticate();
        
        $request->session()->regenerate();
        
        $user = Auth::user();
        
        if ($user) {
          return to_route('dashboard')->with('meta', [
            'status' => true,
            'title' => 'Berhasil masuk akun',
            'message' => 'Selamat datang kembali, ' . $user->full_name . '!'
          ]);
        } else {
          throw new Exception('Alamat surel / kata sandi salah.');
        }
      } catch (Exception $e) {
        return to_route('login')->with('meta', [
          'status' => false,
          'title' => 'Gagal masuk akun',
          'message' => $e->getMessage()
        ]);
      }
    }
    
    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
      Auth::guard('web')->logout();
      
      $request->session()->invalidate();
      
      $request->session()->regenerateToken();
      
      return redirect('/');
    }
  }
