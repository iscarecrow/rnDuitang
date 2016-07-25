import * as types from '../constants/ActionTypes';

const initialState = {
  albumFavoriteCount:0,
  albumLikeCount:0,
  articleCommentCount:0,
  articleFavoriteCount:0,
  articleLikeCount:0,
  blogCommentCount:0,
  blogForwardCount:0,
  blogLikeCount:0,
  letterCount:0,
  letterCountText: 0,
  messagegCount:0,
  recommendFriendCount:0,
  recommendFriendCountText:0,
  topicCommentLikeCount:0,
  topicCommentReplyCount:0,
  topicCommentCount:0,
    // 评论数
  allCommentCount:0,
  // 赞/收藏数
  allFavoriteCount:0,
  // 好友
  allRcommendFriendCount:0
};

export default function unreadCountData(state = initialState, action) {
  switch (action.type) {
    case types.SET_UNREAD_COUNT:
      let letter_count_text = action.data.letter_count || 0;
      let article_favorite_count = action.data.article_favorite_count || 0;
      let album_favorite_count = action.data.album_favorite_count ||0;
      let recommend_friend_count_text = action.data.recommend_friend_count;
      let allCommentCount = action.data.blog_comment_count + action.data.topic_comment_count + action.data.topic_comment_reply_count + action.data.article_comment_count;

      let allFavoriteCount = action.data.blog_like_count + action.data.blog_forward_count + album_favorite_count +action.data.album_like_count +action.data.topic_comment_like_count + action.data.article_like_count + article_favorite_count;

      if (action.data.letter_count > 99) {
        letter_count_text = '99+'; 
      }
      if (action.data.recommend_friend_count > 99) {
        recommend_friend_count_text = '99+';
      }

      return Object.assign({}, state, {
        allCommentCount:allCommentCount,
        allFavoriteCount:allFavoriteCount,
        allRcommendFriendCount: action.data.recommend_friend_count,
        albumFavoriteCount:action.data.album_favorite_count,
        albumLikeCount:action.data.album_like_count,
        articleCommentCount:action.data.article_comment_count,
        articleFavoriteCount:action.data.article_favorite_count,
        articleLikeCount:action.data.article_like_count,
        blogCommentCount:action.data.blog_comment_count,
        blogForwardCount:action.data.blog_forward_count,
        blogLikeCount:action.data.blog_like_count,
        letterCount:action.data.letter_count,
        letterCountText:letter_count_text,
        recommendFriendCount:action.data.recommend_friend_count,
        recommendFriendCountText: recommend_friend_count_text,
        topicCommentLikeCount:action.data.topic_comment_like_count,
        topicCommentReplyCount:action.data.topic_comment_reply_count,
        topicCommentCount:action.data.topic_comment_count 
      });
    default:
      return state;
  } 
}