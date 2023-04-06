import React from 'react'
import { useRouter } from 'next/router'
const ImageId = () => {
    const router = useRouter()

    const { blog_slug, image_id } = router.query
    return (
        <div>
            this is image {blog_slug} of {image_id}
        </div>
    )
}

export default ImageId
