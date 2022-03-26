import React, { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";
import { updateUser } from "../../redux/actions/userActions";
function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(name, email, lastName, location);
    try {
      const updatedUser = await authService.updateUser({
        name,
        email,
        lastName,
        location,
      });
      // console.log(updatedUser.data.user);
      dispatch(updateUser(updatedUser.data.user));
      localStorage.setItem("user", JSON.stringify(updatedUser.data.user));
      toast.success("updated");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <section className="max-w-5xl mx-auto text-center">
      <div className="shadow-lg shadow-black overflow-hidden rounded-md mt-20 bg-gray-200 w-1/3 mx-auto p-5">
        <form onSubmit={onSubmit} className="space-y-5">
          <h1> Profile</h1>
          <div>
            <input
              type="text"
              className="w-full h-10 rounded-md p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              className="w-full h-10 rounded-md p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              className="w-full h-10 rounded-md p-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              className="w-full h-10 rounded-md p-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="w-full mx-auto">
            <Button variant="contained" className="!w-full" type="submit">
              Save changes
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;
