import React, { useEffect, useState } from "react";

export default function Timeline() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    (async () => {
      const host = "http://localhost:5000";

      try {
        const response = await fetch(`${host}/api/notes/tweets`, {
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
        setTweets(json);
      } catch (error) {
        console.error("There was a problem fetching user data:", error);
      }
    })();
  }, []);
  return (
    <div>
      {tweets.map((tweet) => (
        <div key={tweet._id}>
          <div className="row mt-3">
            <div className="col-4">
              <span>{tweet.title}</span> <br />
              <span>{tweet.info}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
