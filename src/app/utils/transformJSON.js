// utils/postTransformer.js

/**
 * Transforms a raw post object into a simplified version for display.
 * @param {Object} rawPost - The original post object.
 * @param {number} rawPost.userId
 * @param {number} rawPost.postId
 * @param {string} rawPost.postTitle
 * @param {string} rawPost.postBody
 * @returns {Object} A new object with `id` and `title` properties.
 */
export function transformPost(rawPost) {
  return {
    id: rawPost.postId, // Renaming postId to id
    title: rawPost.postTitle, // Keeping postTitle as title
  };
}

/**
 * Transforms an array of raw post objects.
 * @param {Array<Object>} rawPosts - An array of original post objects.
 * @returns {Array<Object>} An array of transformed post objects.
 */
export function transformPostsArray(rawPosts) {
  if (!Array.isArray(rawPosts)) {
    console.error("Input is not an array:", rawPosts);
    return []; // Return empty array or throw error
  }
  return rawPosts.map(transformPost);
}
