<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(){
        $products=Product::all();
        return Inertia::render('product/Index',compact('products'));
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
    public function update(Request $request,Product $product)
    {
        $request->validate([
            'name'=>'required|string|max:255',
            'price'=>'required|numeric',
            'description'=>'nullable|string',
        ]);
        $product->update([
            'name'=>$request->input('name'),
            'price'=>$request->input('price'),
            'description'=>$request->input('description'),
        ]);
        return redirect()->route('product.index')->with('message','product updated successfully'); 
    }
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('product.index')->with('message','product deleted successfully');
    }
    public function edit(Product $product)
    {
        return inertia::render('product/Edit',compact('product'));
    }
}
