import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';

const Search = () => {
  const { suggestedusers } = useSelector((store) => store.auth);
  const [query, setQuery] = useState("");

  // Filter users based on input query
  const filteredUsers = suggestedusers.filter((user) =>
    user.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Search Users</h1>

      <input
        type="text"
        placeholder="Search by username..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="mt-6 space-y-4">
        {query.length > 0 && filteredUsers.length === 0 && (
          <p className="text-center text-gray-500">No users found.</p>
        )}

        {filteredUsers.map((user) => (
          <Link
            key={user._id}
            to={`/profile/${user._id}`}
            className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-md transition"
          >
            <Avatar>
              <AvatarImage src={user.profilePicture} alt="profile" />
              <AvatarFallback>
                {user.username?.charAt(0)?.toUpperCase() || "X"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{user.username}</h2>
              <p className="text-sm text-gray-500">{user.bio || "No bio"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
