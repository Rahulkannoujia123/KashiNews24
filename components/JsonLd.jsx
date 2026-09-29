import React from 'react';

export function JsonLd({ data, id = 'jsonld' }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export function createWebPageSchema({ url, name, description, type = 'WebPage' }) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Kashi Live News 24',
      url: 'https://kashi-livenews24.vercel.app'
    },
    inLanguage: 'hi-IN',
    publisher: {
      '@type': 'Organization',
      name: 'Kashi Live News 24',
      url: 'https://kashi-livenews24.vercel.app'
    }
  };
}

export function createBreadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {})
    }))
  };
}
