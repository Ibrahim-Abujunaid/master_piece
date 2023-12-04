<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Rent;
use App\Models\User;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cars = Car::all();
        return response()->json($cars);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $c=Car::where('owner_id',$request->owner_id)->where('withDriver', 1)->get();
        $isRentee = User::where('id', $request->owner_id)->first()->role_id;
        
        if ($isRentee != 2) {
            return response()->json(["sorry you are not a rentee you can't add acar"]);
        }elseif ($request->withDriver && $c->count() > 0) {
            return response()->json(["sorry you can't add acar with driver more than once",$c]);
            
        }else{
        $car = Car::create($request->all());
        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $extintion= $image->getClientOriginalExtension();
            $imagename = time().'.'.$extintion;
            $request->img->move(public_path('car/img'), $imagename);
            $car->img = $imagename;
        }
        if ($request->hasFile('car_license')) {
            $license = $request->file('car_license');
            $extintion= $license->getClientOriginalExtension();
            $imagename = time().'.'.$extintion;
            $request->car_license->move(public_path('car/license'), $imagename);
            $car->car_license = $imagename;
        }
            $car->update();

        return response()->json(["added",$car]);}
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function show(Car $car)
    {
        $rents=Rent::with("review")->where("car_id","=", $car->id)->get();
        return response()->json([$car, $rents]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function edit(Car $car)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Car $car)
    {
        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $extintion= $image->getClientOriginalExtension();
            $imagename = time().'.'.$extintion;
            $request->img->move(public_path('car/img'), $imagename);
            $car->img = $imagename;
        }
        if ($request->hasFile('car_license')) {
            $license = $request->file('car_license');
            $extintion= $license->getClientOriginalExtension();
            $imagename = time().'.'.$extintion;
            $request->car_license->move(public_path('car/license'), $imagename);
            $car->car_license = $imagename;
        }
        $car->update($request->all());
        return response()->json(["done",$car]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function destroy(Car $car)
    {
        $car->delete();
        return response()->json(["deleted"]);
    }
}
