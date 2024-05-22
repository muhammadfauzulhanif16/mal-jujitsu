<?php
  
  namespace App\Http\Controllers;
  
  use App\Http\Requests\StoreAthleteRequest;
  use App\Http\Requests\UpdateAthleteRequest;
  use App\Models\Athlete;
  
  class AthleteController extends Controller
  {
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      return Inertia('Athletes/Index', [
//        'athletes' => Athletes::all()
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
    public function store(StoreAthleteRequest $request)
    {
      //
    }
    
    /**
     * Display the specified resource.
     */
    public function show(Athlete $athlete)
    {
      //
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Athlete $athlete)
    {
      //
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAthleteRequest $request, Athlete $athlete)
    {
      //
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Athlete $athlete)
    {
      //
    }
  }
