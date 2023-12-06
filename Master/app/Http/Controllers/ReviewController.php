<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Car;
use App\Models\Rent;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
       $reviews = Review::all();
       return response()->json($reviews);
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
        $rent_id = $request->rent_id;
        $rent= Rent::find($rent_id);
        if ($rent->end<Carbon::now()) {
            $review = Review::create($request->all());
            return response()->json([$review]);

        }else {
            return response()->json([ 'sorry you only can leave review after your rent duration is finished']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // return response()->json($id);

        $car= Car::where("id", $id)->first();
        // $car= Car::where("id", $request->car_id)->first();
        // $::with("rent");, 'user.*','car.*'
        // $reviews = Review::select('review.*', 'rent.*')
        //     
        //     // ->join('user', 'user.id', '=', 'rent.user_id')
        //     // ->join('properties', 'properties.id', '=', 'bookings.property_id')
        //     ->where('rent.car_id',  $car)//->with('users','cars')//->where('','=', $car)->orderBy(
        //     // ->where('properties.lessor_id', '=', $user->id),'','',
        //     ->get();
            $reviews = Review::join('rents', 'rents.id', '=', 'reviews.rent_id')
                ->join('users', 'users.id', '=', 'rents.user_id')
                ->select('users.name','rents.start','rents.end','reviews.rating','reviews.comment')
                ->where('rents.car_id', $id)->orderBy("reviews.created_at","desc")
                ->get();
        
                // foreach ($reviews as $review) {
                //     $review->user_name ='fff'; // Access user name through relationship
                // },$car
        return response()->json(compact('car','reviews'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function destroy(Review $review)
    {
        $review->delete();
        return response()->json(["deleted"]);
    }
}
