<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Brand;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Brand::create([
            'name' => 'Toyota',
        ]);

        Brand::create([
            'name' => 'Honda',
        ]);

        Brand::create([
            'name' => 'Ford',
        ]);

        Brand::create([
            'name' => 'Chevrolet',
        ]);

        Brand::create([
            'name' => 'Ram',
        ]);
    
    }
}
