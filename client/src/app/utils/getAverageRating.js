export function getAverageRating(comments) {
    let result = 0;
    if (comments.length) {
        for (const comment of comments) {
            result += comment.rating;
        }
        result = Math.round(result / comments.length);
    }
    return result;
}
