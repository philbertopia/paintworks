'use client'

import { useEffect, useState } from 'react'
import './gallery-painting-carousel.css'

const slides = [
  { image: '/images/gallery-house-interior.png', alt: 'Completed warm Hudson Valley living room with painted walls and built-ins', label: 'Interior painting' },
  { image: '/images/gallery-house-exterior.png', alt: 'Completed blue-green Victorian Hudson Valley home with cream trim', label: 'Exterior painting' },
  { image: '/images/gallery-cabinet-refinishing.png', alt: 'Completed kitchen with deep blue refinished cabinets and brass hardware', label: 'Cabinet refinishing' },
  { image: '/images/gallery-completed-mural.png', alt: 'Completed hand-painted landscape mural in a Hudson Valley restaurant', label: 'Murals + custom art' },
]

export default function GalleryPaintingCarousel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 4600)
    return () => window.clearInterval(timer)
  }, [])

  return <div className="gallery-painting-carousel" aria-label="Completed Paintworks projects">
    {slides.map((slide, index) => <img className={index === active ? 'is-active' : ''} key={slide.image} src={slide.image} alt={slide.alt} aria-hidden={index !== active} />)}
    <div className="gallery-painting-carousel-caption"><span>{slides[active].label}</span><span>{String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span></div>
  </div>
}
