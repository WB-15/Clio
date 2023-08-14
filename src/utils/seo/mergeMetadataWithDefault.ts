import { DEFAULT_METADATA } from '@/constants'

type IMetadata = {
  title?: string
  description?: string
  ogImage?: string
}

const mergeImages = (baseImage: any, ogImageUrl: string) => {
  if (baseImage) {
    return Array.isArray(baseImage)
      ? [{ ...baseImage[0], url: ogImageUrl }, ...baseImage.slice(1)]
      : { ...baseImage, url: ogImageUrl }
  }

  return { url: ogImageUrl }
}

export const mergeMetadataWithDefault = ({
  title,
  description,
  ogImage,
}: IMetadata) => {
  const {
    title: baseTitle,
    description: baseDescription,
    openGraph,
    twitter,
  } = DEFAULT_METADATA

  return {
    ...DEFAULT_METADATA,
    title: title || baseTitle,
    description: description || baseDescription,
    openGraph: {
      ...openGraph,
      title: title || openGraph?.title,
      description: description || openGraph?.description,
      images: ogImage
        ? mergeImages(openGraph?.images, ogImage)
        : openGraph?.images,
    },
    twitter: {
      ...twitter,
      title: title || twitter?.title,
      description: description || twitter?.description,
      images: ogImage ? mergeImages(twitter?.images, ogImage) : twitter?.images,
    },
  }
}
