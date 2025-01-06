"use client";

import { setIsAuthenticated, setUser } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";

const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.user));
      dispatch(setIsAuthenticated(true));
    }
  }, [data]);

  const logoutHandler = () => {
    signOut();
  };

  return (
    <nav className="navbar sticky-top py-2">
      <div className="container">
        <div className="col-6 col-lg-3 p-0">
          <div className="navbar-brand p-0">
            <h3 className="mb-0">La Fuente Motel</h3>
          </div>
        </div>

        <div className="col-6 col-lg-3 mt-md-0 text-end">
          {user ? (
            <div className="ml-4 dropdown d-line">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded={"false"}
              >
                <figure className="avatar avatar-nav">
                  <Image
                    src={user?.avatar?.url || "/images/default_avatar.jpg"}
                    alt={`${user.name}`}
                    className="rounded-circle placeholder-glow"
                    width={50}
                    height={50}
                  />
                </figure>
                <span className="placeholder-glow ps-1 fw-bold fs-6 text-capitalize">
                  {user.name}
                </span>
              </button>

              <div
                className="dropdown-menu w-100"
                aria-labelledby={"dropdownMenuButton1"}
              >
                {user.role === "admin" && (
                  <Link href="/admin/dashboard" className="dropdown-item">
                    Dashboard
                  </Link>
                )}
                <Link href="/bookings/me" className="dropdown-item">
                  My Bookings
                </Link>
                <Link href="/me/update" className="dropdown-item">
                  Profile
                </Link>
                <Link
                  href="/"
                  className="dropdown-item text-danger"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <>
              {data === undefined && (
                <div className="placeholder-glow">
                  <figure className="avatar avatar-nv placeholder bg-secondary"></figure>
                  <span className="placeholder w-25 bg-secondary ms-2"></span>
                </div>
              )}
              {data === null && (
                <Link
                  href="/login"
                  className="btn btn-danger px-4 text-white login-header-btn float-right"
                >
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <span>Login</span>
                    <i className="fa-solid fa-user"></i>
                  </div>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
