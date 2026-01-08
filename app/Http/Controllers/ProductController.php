<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(){
        return Inertia::render('product/Index',[]);
    }

    public function create()
    {
        return Inertia::render('product/Create');
    }
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required|string|max:255',
            'price'=>'required|numeric',
            'description'=>'nullable|string',
        ]);
        Product::create($request->all());
        return redirect()->route('product.index')->with('message','product created success');
    }
}
