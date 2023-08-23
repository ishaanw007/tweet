import React, { useEffect, useState } from "react";

export default function Friends() {
  const [users, setUsers] = useState([]);
  const handleFollow = async (userId) => {
    console.log("kkkkk");

    const host = "http://localhost:5000";

    try {
      const response = await fetch(`${host}/api/auth/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ targetUserId: userId }),
      });
      if (response.ok) {
        // Update the UI. Example: set a "followed" flag on the user
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (userId) => {
    const host = "http://localhost:5000";

    try {
      const response = await fetch(`${host}/api/auth/unfollow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ targetUserId: userId }),
      });
      if (response.ok) {
        // Update the UI. Example: unset a "followed" flag on the user
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  useEffect(() => {
    (async () => {
      const host = "http://localhost:5000";

      try {
        const response = await fetch(`${host}/api/auth/getallusers`, {
          // Change endpoint if needed
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json = await response.json();
        setUsers(json);
      } catch (error) {
        console.error("There was a problem fetching user data:", error);
      }
    })();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>
          <div className="row mt-3">
            <div className="col-4">
              <span>{user.name}</span>
            </div>
            <div className="col-4">
              <button className="mx-5" onClick={() => handleFollow(user._id)}>
                Follow
              </button>
            </div>
            <div className="col-4">
              <button className="mx-5" onClick={() => handleUnfollow(user._id)}>
                Unfollow
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
