import invariant from "tiny-invariant";
import { marked } from 'marked'
import { json } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getPost } from '../../models/post.server'

type LoaderData = {
  title: string
  html: string
}

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params
  invariant(slug, 'slug is required')

  const post = await getPost(slug)
  invariant(post, `post not found: ${slug}`)

  const html = marked(post?.markdown)

  return json({ title: post.title, html })
}

export default function PostRoute() {
  const { html, title } = useLoaderData() as LoaderData

  return (
    <main className="mx-auto max-w-4x1">
      <h1 className="my-6 bordder-b-2 text-center text-3x1">
        {title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  )
}