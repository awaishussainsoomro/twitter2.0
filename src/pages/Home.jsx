import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import databaseService from '../appwrite/database'
import { setTweets } from '../store/tweetSlice'
import PostTweet from '../components/post-tweet/PostTweet'
import TweetCard from '../components/TweetCard'

export default function Home() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const tweets = useSelector((state) => state.tweet.tweets)

    useEffect(() => {
        databaseService
            .getTweets()
            .then((data) => {
                if (data && data.documents) {
                    dispatch(setTweets(data.documents))
                }
            })
            .catch((error) => {
                console.log('Home :: getTweets :: error', error)
            })
            .finally(() => setLoading(false))
    }, [dispatch])

    return (
        <div className="min-h-screen border-r border-slate-800 bg-black text-white">
            {/* Sticky Timeline Header */}
            <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold">Home</h1>
            </header>

            {/* Top Compose Box */}
            <PostTweet />

            {/* Scrollable Timeline Stream */}
            <section>
                {loading ? (
                    <div className="p-8 text-center text-slate-500">
                        Loading timeline...
                    </div>
                ) : tweets && tweets.length > 0 ? (
                    tweets.map((tweet) => (
                        <TweetCard key={tweet.$id} {...tweet} />
                    ))
                ) : (
                    <div className="p-8 text-center text-slate-500">
                        No tweets yet. Post something above to get started!
                    </div>
                )}
            </section>
        </div>
    )
}