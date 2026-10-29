import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tweets: [],
}

const tweetSlice = createSlice({
    name: "tweets",
    initialState,
    reducers: {
        setTweets: (state, action) => {
            state.tweets = action.payload;
        },
        addTweet: (state, action) => {
            state.tweets.unshift(action.payload)
        },
        editTweet: (state, action) => {
            state.tweets =  state.tweets.map((tweet) => tweet.$id === action.payload.$id ? action.payload : tweet)
        },
        deleteTweet: (state, action) => {
            state.tweets = state.tweets.filter((tweet) => tweet.$id !== action.payload)
        }
    }
})

export const { setTweets, addTweet, editTweet, deleteTweet } = tweetSlice.actions;
export default tweetSlice.reducer;