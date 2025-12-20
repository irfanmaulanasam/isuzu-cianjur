const TYPE_LABELS = {
  article: "Artikel",
  promo: "Promo",
  event: "Event",
  product: "Produk",
};

function mapOpenGraphType(type) {
  if (type === "product") return "product.item";
  return "article";
}

export function buildBaseMetadata({
  content,
  type = "article",
  fallbackTitle = "Konten",
  fallbackDescription = "Baca informasi selengkapnya di Bahana Isuzu Cianjur.",
  explicitTitle,
  openGraphOverride = {},
}) {
  const titleFromContent = content?.title || content?.name || content?.headline;

  const baseTitle =
    explicitTitle ||
    (titleFromContent
      ? `${titleFromContent} - ${TYPE_LABELS[type] || "Konten"}`
      : fallbackTitle);

  const baseDescription =
    content?.excerpt ||
    content?.shortDescription ||
    content?.description ||
    fallbackDescription;

  const imageFromContent =
    content?.thumbnail || content?.image || content?.ogImage;

  return {
    title: baseTitle,
    description: baseDescription,
    openGraph: {
      title: baseTitle,
      description: baseDescription,
      type: mapOpenGraphType(type),
      images: imageFromContent ? [imageFromContent] : ["/og-default.jpg"],
      ...(content?.date && { publishedTime: content.date }),
      ...(type === "event" && content?.eventDate && {
        startTime: content.eventDate,
      }),
      ...(type === "event" && content?.location && {
        location: content.location,
      }),
      ...openGraphOverride,
    },
    twitter: {
      card: "summary_large_image",
      title: baseTitle,
      description: baseDescription,
      images: imageFromContent ? [imageFromContent] : ["/og-default.jpg"],
    },
  };
}

export function generateArticleMetadata({ content }) {
  return buildBaseMetadata({
    content,
    type: "article",
    fallbackTitle: "Artikel Isuzu Bahana Cianjur",
    fallbackDescription:
      "Berita terbaru tentang Isuzu Euro 4 di Cianjur.",
  });
}

export function generateProductMetadata({ content }) {
  return buildBaseMetadata({
    content,
    type: "product",
    fallbackTitle: "Produk Isuzu | Bahana Isuzu Cianjur",
    fallbackDescription:
      "Lihat detail produk Isuzu resmi Euro 4 di Bahana Isuzu Cianjur.",
  });
}
