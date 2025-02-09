"use client";

import { userValidation } from "@/utils/UserValidation";
import { useState } from "react";

export default function Home() {
  const [errors, setErrors] = useState<any>({
    firstName: [""],
    lastName: [""],
    email: [""],
    phone: [""],
    address: [""],
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    const validation = userValidation.safeParse(data);
    if (!validation.success) {
      console.log(validation.error.flatten().fieldErrors);
      setErrors(validation.error?.flatten().fieldErrors);
      return;
    }
  };
  return (
    <div className=" p-10 rounded-xl bg-teal-400 min-w-[500px]">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className=" relative grid grid-cols-[100px,auto] gap-4 items-center">
          <label htmlFor="firstName" className="font-medium">
            First Name :
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="p-1.5 rounded bg-gray-200 text-gray-700 outline-none focus:ring-teal-600 ring-2"
          />
          <p className="absolute top-[105%] right-2 text-xs text-orange-600">
            {errors?.firstName?.length ? errors.firstName[0] : ""}
          </p>
        </div>
        <div className="relative grid grid-cols-[100px,auto] gap-4 items-center">
          <label htmlFor="firstName" className="font-medium">
            Last Name :
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="p-1.5 rounded bg-gray-200 text-gray-700 outline-none focus:ring-teal-600 ring-2"
          />
          <p className="absolute top-[105%] right-2 text-xs text-orange-600">
            {errors?.lastName?.length ? errors.lastName[0] : ""}
          </p>
        </div>
        <div className="relative grid grid-cols-[100px,auto] gap-4 items-center">
          <label htmlFor="email" className="font-medium">
            Email :
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="p-1.5 rounded bg-gray-200 text-gray-700 outline-none focus:ring-teal-600 ring-2"
          />
          <p className="absolute top-[105%] right-2 text-xs text-orange-600">
            {errors?.email?.length ? errors.email[0] : ""}
          </p>
        </div>
        <div className="relative grid grid-cols-[100px,auto] gap-4 items-center">
          <label htmlFor="phone" className="font-medium">
            Phone :
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="p-1.5 rounded bg-gray-200 text-gray-700 outline-none focus:ring-teal-600 ring-2"
          />
          <p className="absolute top-[105%] right-2 text-xs text-orange-600">
            {errors?.phone?.length ? errors.phone[0] : ""}
          </p>
        </div>
        <div className=" relative grid grid-cols-[100px,auto] gap-4 items-center">
          <label htmlFor="address" className="font-medium">
            Address :
          </label>
          <textarea
            name="address"
            id="address"
            className="p-1.5 rounded bg-gray-200 text-gray-700 outline-none focus:ring-teal-600 ring-2"
          />
          <p className="absolute top-[105%] right-2 text-xs text-orange-600">
            {errors?.address?.length ? errors.address[0] : ""}
          </p>
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            type="submit"
            className="p-3 py-1.5 rounded-lg bg-white ring-2 ring-teal-500 text-teal-500 font-medium hover:scale-110 duration-150"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
