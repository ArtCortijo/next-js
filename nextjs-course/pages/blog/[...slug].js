// Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets. For example:
// pages/post/[...slug].js matches /post/a, but also /post/a/b, /post/a/b/c and so on.}
import { useRouter } from 'next/router';

function BlogPostsPage() {
    const router = useRouter();
    console.log(router.query);

    return (
        <div>
            <h1>The Blog Post</h1>
        </div>
    )
}

export default BlogPostsPage;