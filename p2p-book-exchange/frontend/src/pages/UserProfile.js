import React from "react";
import UserProfileCard from "../components/UserProfileCard";

const UserProfilesPage = () => {
  const profiles = [
    { name: "Alice", bio: "Book lover and aspiring writer", booksShared: 12 },
    { name: "Bob", bio: "Sci-fi enthusiast and tech geek", booksShared: 8 },
  ];

  return (
    <div>
      <h2>User Profiles</h2>
      {profiles.map((profile, index) => (
        <UserProfileCard key={index} {...profile} />
      ))}
    </div>
  );
};

export default UserProfilesPage;
