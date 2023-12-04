<?php

namespace App\Http\Controllers;

use App\Models\Rent;
use Illuminate\Http\Request;
use DateTime;

class RentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rents = Rent::all();
        return response()->json($rents);
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
        // $rent = Rent::all();
        $car=$request->car_id;
        $startDate = $request->start;
        $endDate = $request->end;
    
    $overlappingBookings = Rent::where('car_id', $car)
    ->where(function ($query) use ($startDate, $endDate) {
        $query->where(function ($q) use ($startDate, $endDate) {
            $q->where('start', '>=', $startDate)
                ->where('start', '<', $endDate);
        })->orWhere(function ($q) use ($startDate, $endDate) {
            $q->where('end', '>', $startDate)
                ->where('end', '<=', $endDate);
        })->orWhere(function ($q) use ($startDate, $endDate) {
            $q->where('start', '<=', $startDate)
                ->where('end', '>=', $endDate);
        });
    })->get();
    
    if ($overlappingBookings->isNotEmpty()) {
        return response()->json( ['The selected dates are already booked. Please select different dates.']);
    } else {
        $datetime1=new DateTime($startDate);
        $datetime2=new DateTime($endDate);
        $interval = $datetime1->diff($datetime2);
        $days = $interval->format('%a');
        $booking = Rent::with('car')->find($car);
        $oneDayPrice = $booking->car->price_day;
        $total=($days+1)*$oneDayPrice;
        $rent = new Rent();
        $rent->start= $startDate;
        $rent->end= $endDate;
        $rent->car_id = $car;
        $rent->user_id = $request->user_id;
        $rent->total_price = $total;
        $rent->save();
        return response()->json($rent);
    }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Rent  $rent
     * @return \Illuminate\Http\Response
     */
    public function show(Rent $rent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Rent  $rent
     * @return \Illuminate\Http\Response
     */
    public function edit(Rent $rent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Rent  $rent
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rent $rent)
    {
        
        $rent->update($request->all());
        return response()->json($rent);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Rent  $rent
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rent $rent)
    {
        $rent->delete();
        return response()->json('done');
    }
}
