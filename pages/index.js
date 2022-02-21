import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import matter from 'gray-matter'
import Post from '../components/Post'
import { sortByDate } from '../utils'

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>
      <div className="posts">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  // Getting all the posts form posts
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map(filename => {
    // Getting slug
    const slug = filename.replace('.md', '')

    // Getting frontmatter
    const markDownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const { data: frontmatter } = matter(markDownWithMeta)
    // console.log(frontMatter)

    return {
      slug,
      frontmatter
    }
  })


  return {
    props: {
      posts: posts.sort(sortByDate)
    }
  }
}