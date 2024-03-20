'use client'
import { FacebookIcon, FacebookShareButton } from 'react-share'

export default function FbButton ({ slug, url }: { slug: string, url: string }) {
    return (
        <FacebookShareButton
            url={`${url}/blog/${slug}`}
        >
            <FacebookIcon size={32} round />
        </FacebookShareButton>
    )
}