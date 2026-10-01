'use client'

import { useEffect, useState } from 'react'
import './gallery-backdrop.css'
import './gallery-mobile.css'

const paintings = [
  '/images/artwork-geometric-navy-rose.png',
  '/images/artwork-blush-mixed-media.png',
  '/images/artwork-soft-landscape.png',
  '/images/landscape-river-valley.png',
  '/images/landscape-wide-river.png',
  '/images/landscape-autumn-valley.png',
  '/images/artwork-golden-retriever.png',
  '/images/artwork-black-white-cat.png',
]

export default function GalleryBackdrop() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % paintings.length), 4200)
    return () => window.clearInterval(timer)
  }, [])

  return <>
    <div className="gallery-intro-slides" aria-hidden="true">
      {paintings.map((image, index) => <img className={index === active ? 'active' : ''} src={image} alt="" key={image} />)}
    </div>
    <div className="gallery-intro-overlay" aria-hidden="true" />
  </>
}
