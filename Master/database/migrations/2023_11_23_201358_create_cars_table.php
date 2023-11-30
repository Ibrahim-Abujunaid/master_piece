<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->foreignId('location_id')->unsigned()->references('id')->on('locations')->onDelete('cascade');
            $table->string('img');
            $table->string('car_license');
            $table->string('description');
            $table->float('price_day');
            $table->year('model');
            $table->boolean('withDriver')->default(false);
            $table->boolean('availability')->default(true);
            $table->boolean('status')->default(false);//is approved by admin?
            $table->foreignId('brand_id')->unsigned()->references('id')->on('brands')->onDelete('cascade');
            $table->foreignId('owner_id')->unsigned()->references('id')->on('users')->onDelete('cascade');
            $table->enum('gear', ['manual','automatic']);
            $table->enum('transmission', ['electric','hypered','gas']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cars');
    }
};
