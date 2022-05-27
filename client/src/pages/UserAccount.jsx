import React from "react";
import Input from "../components/element/Form/Input";
import Store from "../components/layout/Common/Store";
import LayoutMedium from "../components/layout/LayoutMedium";
import useAuth from "../hooks/useAuth";

import AvatarResource from '../images/avatar.jpeg';

function UserAccount() {
  const { auth } = useAuth();

  return (
    <Store>
      <LayoutMedium>
        <div className="user-account">
          <div className="user-account__avatar">
            <img
              src={AvatarResource}
              alt="avatar"
            />
          </div>

          <div className="col">
            <small style={{ display: "block" }}> Họ người dùng </small>
            <Input placeholder="Họ người dùng" value={auth.firstname} />
          </div>

          <div className="col">
            <small style={{ display: "block" }}> Tên người dùng </small>
            <Input placeholder="Tên người dùng" value={auth.lastname} />
          </div>

          <div className="col">
            <small style={{ display: "block" }}> Tên tài khoản </small>
            <Input placeholder="Tên tài khoản" value={auth.username} disabled />
          </div>
        </div>
      </LayoutMedium>
    </Store>
  );
}

export default UserAccount;
