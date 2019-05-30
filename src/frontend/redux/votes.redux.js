import { actionsFactory, reducerFactory, gettersFactory } from './creators/factory';

const context = 'votes';

let loadVotePostURL = filters => `/api/posts/${filters.postId}/vote`;
let upvotePostURL = filters => `/api/posts/${filters.postId}/upvote`;
let downvotePostURL = filters => `/api/posts/${filters.postId}/downvote`;
let unvotePostURL = filters => `/api/posts/${filters.postId}/unvote`;

let actions = actionsFactory({
  context,
  buildURLs: {
    loadOneURLs: [loadVotePostURL, upvotePostURL, downvotePostURL],
    removeOneURLs: [unvotePostURL],
  },
});

let getters = gettersFactory({ context });

export const getVote = getters.getOneById;
export const getVoteByFilters = getters.getByFilters;
export const getVoteLoadingState = getters.getLoadingState;

export const loadVote = actions.load[0];
export const upvotePost = actions.load[1];
export const downvotePost = actions.load[2];

export const unvotePost = actions.remove[0];

export const votes = reducerFactory({ context });
