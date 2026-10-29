import { useSelector, useDispatch } from 'react-redux'
import { Trash2 } from 'lucide-react'
import databaseService from '../appwrite/database'
import storageService from '../appwrite/storage'
import { deleteTweet } from '../store/tweetSlice'

export default function TweetCard({ $id, content, featuredImage, userId, $createdAt }) {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.auth.userData)

    // Check if the logged-in user created this tweet
    const isAuthor = userData && userId ? userData.$id === userId : false

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this tweet?')
        if (!confirmed) return

        try {
            // 1. Delete image file from Appwrite Storage if attached
            if (featuredImage) {
                await storageService.deleteFile(featuredImage)
            }

            // 2. Delete document from Appwrite Database
            const success = await databaseService.deleteTweet($id)

            // 3. Filter out from Redux RAM cache
            if (success) {
                dispatch(deleteTweet($id))
            }
        } catch (error) {
            console.log('TweetCard :: handleDelete :: error', error)
        }
    }

    // Format creation timestamp
    const formattedDate = $createdAt
        ? new Date($createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
          })
        : ''

    return (
        <article className="border-b border-slate-800 p-4 hover:bg-slate-950/50 transition-colors bg-black text-white">
            <div className="flex gap-3">
                {/* User Avatar */}
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-sky-400 shrink-0">
                    {userId ? userId.substring(0, 2).toUpperCase() : 'U'}
                </div>

                <div className="flex-1 min-w-0">
                    {/* Header Details */}
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 truncate">
                            <span className="font-bold text-white hover:underline cursor-pointer truncate">
                                User_{userId ? userId.substring(0, 5) : 'Anon'}
                            </span>
                            <span className="text-slate-500 text-sm truncate">
                                @user_{userId ? userId.substring(0, 5) : 'anon'}
                            </span>
                            <span className="text-slate-500 text-sm">·</span>
                            <span className="text-slate-500 text-sm hover:underline cursor-pointer">
                                {formattedDate}
                            </span>
                        </div>

                        {/* Delete Action (Author Only) */}
                        {isAuthor && (
                            <button
                                onClick={handleDelete}
                                className="p-1.5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                                title="Delete Tweet"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Tweet Content Text */}
                    <p className="text-slate-100 text-[15px] leading-relaxed wrap-break-word whitespace-pre-wrap mb-3">
                        {content}
                    </p>

                    {/* Media Attachment Preview */}
                    {featuredImage && (
                        <div className="rounded-2xl overflow-hidden border border-slate-800 my-3 max-h-96">
                            <img
                                src={storageService.getFilePreview(featuredImage)}
                                alt="Tweet Attachment"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>
        </article>
    )
}