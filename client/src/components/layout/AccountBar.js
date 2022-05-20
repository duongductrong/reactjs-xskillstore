import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function AccountBar() {
  const { auth } = useAuth();

  return (
    <div className="account-bar">
      <ul class="account-bar__options">
        <li class="account-bar__options__element">
          <NavLink to={"/"}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="box-open"
              class="svg-inline--fa fa-box-open fa-w-20 account-bar__options__element__icon"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                fill="currentColor"
                d="M425.7 256c-16.9 0-32.8-9-41.4-23.4L320 126l-64.2 106.6c-8.7 14.5-24.6 23.5-41.5 23.5-4.5 0-9-.6-13.3-1.9L64 215v178c0 14.7 10 27.5 24.2 31l216.2 54.1c10.2 2.5 20.9 2.5 31 0L551.8 424c14.2-3.6 24.2-16.4 24.2-31V215l-137 39.1c-4.3 1.3-8.8 1.9-13.3 1.9zm212.6-112.2L586.8 41c-3.1-6.2-9.8-9.8-16.7-8.9L320 64l91.7 152.1c3.8 6.3 11.4 9.3 18.5 7.3l197.9-56.5c9.9-2.9 14.7-13.9 10.2-23.1zM53.2 41L1.7 143.8c-4.6 9.2.3 20.2 10.1 23l197.9 56.5c7.1 2 14.7-1 18.5-7.3L320 64 69.8 32.1c-6.9-.8-13.5 2.7-16.6 8.9z"
              ></path>
            </svg>
            Đơn hàng của bạn
          </NavLink>
        </li>

        <li class="account-bar__options__element">
          <NavLink to={"/user/my-account"}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="user"
              class="svg-inline--fa fa-user fa-w-14 account-bar__options__element__icon"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
              ></path>
            </svg>
            {auth.username || ""}
          </NavLink>
        </li>

        {auth.permission === "admin" && (
          <li class="account-bar__options__element">
            <NavLink to={"/management-site"}>Quản trị viên</NavLink>
          </li>
        )}

        <li class="account-bar__options__element">
          <NavLink to={"/"}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="sign-out-alt"
              class="svg-inline--fa fa-sign-out-alt fa-w-16 account-bar__options__element__icon"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
              ></path>
            </svg>
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AccountBar;
