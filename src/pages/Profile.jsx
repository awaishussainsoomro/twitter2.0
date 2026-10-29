import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Query } from "appwrite";
import databaseService from "../appwrite/database";
import TweetCard from "../components/TweetCard";

export default function Profile() {
  const { username } = useParams();
  const currentUser = useSelector((state) => state.auth.userData);
  const [userTweets, setUserTweets] = useState([]);

  const targetUserId = currentUser?.$id;

  const [loading, setLoading] = useState(Boolean(targetUserId));

  useEffect(() => {
    if (!targetUserId) return;

    let isMounted = true;

    databaseService
      .getTweets([
        Query.equal("status", "active"),
        Query.equal("userId", targetUserId),
        Query.orderDesc("$createdAt"),
      ])
      .then((data) => {
        if (isMounted && data?.documents) {
          setUserTweets(data.documents);
        }
      })
      .catch((err) => console.log("Profile :: getTweets :: error", err))
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [targetUserId]);

  return (
        <div className="min-h-screen border-r border-slate-800 bg-black text-white">
            {/* Profile Header */}
            <header className="border-b border-slate-800 p-6 bg-slate-950/40">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center font-bold text-2xl text-sky-400">
                        {currentUser?.name ? currentUser.name[0].toUpperCase() : "U"}
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">{currentUser?.name || "User Profile"}</h1>
                        <p className="text-slate-500 text-sm">@{currentUser?.email || username}</p>
                    </div>
                </div>
                <div className="text-slate-400 text-sm">
                    <span>{userTweets.length} Tweets</span>
                </div>
            </header>

            {/* Profile Tweets Timeline */}
            <section>
                <div className="border-b border-slate-800 px-4 py-3 bg-black">
                    <h2 className="font-bold text-slate-200">Tweets</h2>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-slate-500">
                        Loading your tweets...
                    </div>
                ) : userTweets.length > 0 ? (
                    userTweets.map((tweet) => (
                        <TweetCard key={tweet.$id} {...tweet} />
                    ))
                ) : (
                    <div className="p-8 text-center text-slate-500">
                        You haven't posted any tweets yet.
                    </div>
                )}
            </section>
        </div>
    );
}