<?php

use App\Http\Controllers\Api\AdministrativeController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Doctor\AppointmentsController;
use App\Http\Controllers\Api\Doctor\DoctorController;
use App\Http\Controllers\Api\Doctor\DoctorNotificationController;
use App\Http\Controllers\Api\Doctor\ProcessController;
use App\Http\Controllers\Api\Reception\BookingController;
use App\Http\Controllers\Api\Reception\ReceptionController;
use App\Http\Controllers\Api\Reception\PatientController;
use App\Http\Controllers\Api\SpecialtiesController;
use App\Notifications\SendCreateNewBookingNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::group(['middleware' => 'api', 'prefix' => 'auth'], function () {
    Route::post('create-user', [AuthController::class, 'createUser']);
    Route::post('login', [AuthController::class, 'login']);
});
Route::group(['middleware' => 'auth:api'], function () {
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('profile', [AuthController::class, 'profile']);
});


// Route::group(['middleware' => 'auth:api'], function () {
Route::resource('specialties', SpecialtiesController::class)->only([
    'store', 'index', 'destroy', 'update'
]);
// });

Route::group(['prefix' => 'doctor'], function () {
    Route::get('/', [DoctorController::class, 'doctors']);
    Route::patch('/update/{id}', [DoctorController::class, 'update']);
    Route::delete('/delete/{id}', [DoctorController::class, 'delete']);
});

Route::group(['middleware' => 'auth:api', 'prefix' => 'appointments'], function () {
    Route::post('/create', [AppointmentsController::class, 'createAppointments']);
    Route::get('/', [AppointmentsController::class, 'getAppointments']);
    Route::get('/doctor', [AppointmentsController::class, 'doctorAppointment']);
    Route::delete('/delete/{id}', [AppointmentsController::class, 'deleteAppointment']);
});


// patient queuebased on day
// Route::get('/patients-queue', [DoctorsController::class, 'patientsQueue']);


Route::group(['prefix' => 'administratives'], function () {
    Route::get('/', [AdministrativeController::class, 'administratives']);
    Route::patch('/update/administrative/{id}', [AdministrativeController::class, 'update']);
    Route::delete('/delete/{id}', [AdministrativeController::class, 'delete']);
})->middleware('auth:api');;



Route::group(['prefix' => 'patients'], function () {
    Route::post('/create', [PatientController::class, 'addPatient']);
    Route::get('/', [PatientController::class, 'showPatients']);
    Route::get('/{id}', [PatientController::class, 'getPatientById']);
    Route::patch('/update/{id}', [PatientController::class, 'updatePatient']);
    Route::delete('/delete/{id}', [PatientController::class, 'deletePatient']);
})->middleware('auth:api');;

Route::group(['prefix' => 'doctor-process'], function () {
    Route::get('/patients-queue', [ProcessController::class, 'patientsQueue']);
    Route::patch('/booking-done', [ReceptionController::class, 'bookingDone']);
})->middleware('auth:api');;

Route::group(['prefix' => 'doctor-notifications'], function () {
    Route::get('/new-booking', [DoctorNotificationController::class, 'newBooking']);
    Route::post('/read-booking/{id}', [DoctorNotificationController::class, 'readBookin']);
})->middleware('auth:api');;


Route::group(['prefix' => 'booking'], function () {
    Route::post('/create', [BookingController::class, 'create']);
    Route::get('/', [BookingController::class, 'booking']);
    Route::get('/search', [BookingController::class, 'search']);
    Route::delete('delete/{id}', [BookingController::class, 'delete']);
})->middleware('auth:api');;


Route::group(['prefix' => 'reception-process'], function () {
    Route::post('/transfer-patient-to-doctor', [ReceptionController::class, 'transferPatientToDoctor']);
})
->middleware('auth:api');


// Route::group(['prefix' => 'reports'], function () {
//      Route::post('booking', [ReportsController::class, 'booking']);
// });
