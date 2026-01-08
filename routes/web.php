<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('product',[ProductController::class,'index'])->name('product.index');
    Route::post('/product',[ProductController::class,'Store'])->name('product.store');
    Route::get('/product/create', [ProductController::class, 'create'])->name('product.create');
});

require __DIR__.'/settings.php';
