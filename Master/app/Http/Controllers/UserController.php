<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request){
        $r=$request->role_id;
        if(!empty($r)){
            $users=User::where("role_id",$r)
            ->select('name','img','users.phone','users.email')->get();
        }else{
        $users = User::where('role_id','!=',1) 
        ->join('roles','roles.id','=','users.role_id')
        ->select('users.name','users.img','roles.name as role','users.phone','users.email')->get();
        }
        return response()->json($users);
    }
    /**
     * Show the form for creating the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        abort(404);
    }

    /**
     * Store the newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::create($request->all());
        return response()->json($user);
    }

    /**
     * Display the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {        
        $user=User::join('roles','roles.id','=','users.role_id')
        ->select('users.name','users.img','roles.name as role','users.phone','users.email')
        ->where('users.id',$id)->get();
        return response()->json($user);
    }

    /**
     * Show the form for editing the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {
        //
    }

    /**
     * Update the resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request , $id)
    {
        $user = User::findOrFail($id);
        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $extintion= $image->getClientOriginalExtension();
            $imagename = time().'.'.$extintion;
            $request->img->move(public_path('user'), $imagename);
            $user->img = $imagename;
        }
        $user->update($request->all());
    }

    /**
     * Remove the resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json("user deleted");
    }
}
