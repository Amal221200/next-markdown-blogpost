import fs from 'fs'
import matter from 'gray-matter'
import { marked } from 'marked'
import Link from 'next/link'
import path from 'path'

const blog = ({ frontMatter: { title, date, cover_image }, content, slug }) => {
    return (
        <>
            <Link href='/'>
                <a className="btn btn-back">Go Back</a>
            </Link>
            <div className="card card-page">
                <h1 className="post-title">{title}</h1>
                <div className="post-date">{date}</div>
                <img src={cover_image} />
                <div dangerouslySetInnerHTML={{__html: marked(content)}}></div>
            </div>
        </>
    )
}

export default blog

export const getStaticPaths = async () => {
    const files = fs.readdirSync(path.join('posts'))
    const paths = files.map(filename => ({
        params: { slug: filename.replace('.md', '') }
    }))

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const { slug } = context.params
    const markDownWithMeta = fs.readFileSync(path.join('posts', `${slug}.md`), 'utf-8')
    const { data: frontMatter, content } = matter(markDownWithMeta)

    // console.log(data)
    return {
        props: {
            frontMatter,
            slug,
            content
        }
    }
}