import axios from "axios";
import { getCookie } from "@/utils/hook/useCookies";
import { prefix } from "./constant";
import {
  UserLoginParams,
  CreatePatientDetails,
  CreateSpecialtyType,
  PatientBookingParams,
  PatientsBookingDetails,
  UserDetails,
  AddDoctorParams,
  AppointmentsParam,
  AppointmentsDetails,
  BookingNotificationsDetails,
  TransferToDoctorParams,
  DoctorReportParams,
} from "./types";
import { prefix } from "./constant";

const API_URL_DEV = import.meta.env.VITE_API_URL_DEV;
const API = axios.create({
  baseURL: API_URL_DEV,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  async (config) => {
    const token = getCookie("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login



//  speciality

// get employees as doctor

export const getUserAsDoctorAPI = () => API.get<UserDetails[]>(`/${prefix.DOCTORS}`);

export const updateUserasDoctorAPI = (id: number, data: AddDoctorParams) =>
  API.patch(`/${prefix.DOCTORS}/update/doctor/${id}`, data);

export const deleteUserasDoctorAPI = (id: number) => API.delete(`/${prefix.DOCTORS}/delete/doctor/${id}`);

// Administratives




// patient api

export const addPatientAPI = (data: CreatePatientDetails) =>
  API.post(`${prefix.RECEPTION}/add/patient`, data);

export const getPatientAPI = () => API.get(`${prefix.RECEPTION}/patients`);

// export const getPatientByIdAPI = (id: number) =>
//   API.get(`${prefix.RECEPTION}/patient/${id}`);

// doctors
export const getDoctorsAPI = () => API.get(`${prefix.DOCTORS}`);

export const getDoctorsAppointmentsAPI = () => API.get(`${prefix.DOCTORS}/get/appointments`);
// doctors patients-queue
export const getPatientsQueuetoDoctorAPI = () => API.get(`${prefix.DOCTORS}/patients-queue`);
export const getCurrentPatientsToDoctorAPI = () => API.get(`${prefix.DOCTORS}/current-patients`);

//Appointments

export const addDoctorAppointmentsAPI = (id: number, data: AppointmentsParam) =>
  API.post(`${prefix.DOCTORS}/create/${id}/appointments`, data);

export const getDoctorAppointmentsByIdAPI = (id: number) =>
  API.get<AppointmentsDetails>(`${prefix.DOCTORS}/get-by/${id}/appointment`);

export const deleteAppointmentsByIdAPI = (id: number) =>
  API.delete(`${prefix.DOCTORS}/delete/${id}/appointment`);

export const addPatientBookingAPI = (data: PatientBookingParams) =>
  API.post(`${prefix.BOOKINGS}/add/patient/booking`, data);

export const getPatientBookingAPI = (currentPage: number) =>
  API.get<PatientsBookingDetails>(`${prefix.BOOKINGS}?page=${currentPage}`);

export const getPatientBookingSearchAPI = (query: string) =>
  API.get(`${prefix.BOOKINGS}/booking/search?query=${query}`);

// export const unreadBookingNotificationsAPI = () =>
//   API.get<BookingNotificationsDetails>(`${prefix.NOTIFICATIONS}/unread/booking/patients-notifications`);

export const bookingNotificationsAPI = () =>
  API.get<BookingNotificationsDetails>(`${prefix.NOTIFICATIONS}/booking/patients-notifications`);

export const readBookingNotificationsAPI = (id: string) =>
  API.post(`${prefix.NOTIFICATIONS}/read/booking/patients-notifications/${id}`);

///booking/patients-notifications

// process

export const processTransferToDoctorAPI = (data: TransferToDoctorParams) =>
  API.post(`/process/transfer-to-doctor`, data);

export const bookingFinishedAPI = (data: DoctorReportParams) =>
  API.patch(`/process/booking-finished-done`, data);
