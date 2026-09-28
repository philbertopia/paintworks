'use client'

import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../components/ui/sheet'
import { Slider } from '../components/ui/slider'

const work = [
  { n: '01', title: 'Warm light, considered color', meta: 'KINGSTON / INTERIOR', cls: 'work-one' },
  { n: '02', title: 'The room between rooms', meta: 'WOODSTOCK / COLOR + PAINT', cls: 'work-two' },
  { n: '03', title: 'A little more red', meta: 'RHINEBECK / DETAIL', cls: 'work-three' },
  { n: '04', title: 'Made by hand', meta: 'HUDSON VALLEY / MURAL STUDY', cls: 'work-four' },
  { n: '05', title: 'A little off the wall', meta: 'KINGSTON / CREATIVE OFFICE', cls: 'work-five' },
  { n: '06', title: 'Rooms for looking', meta: 'HUDSON VALLEY / ART INSTALLATION', cls: 'work-six' },
]

const services = [
  'Interior painting',
  'Exterior painting',
  'Power washing',
  'Cabinet refinishing',
  'Wallpaper',
  'Decorative finishes',
  'Surface preparation',
  'Murals + custom art',
  'Color consultation',
  'Art installation',
  'Furniture refinishing',
  'Spray finishing',
]

const serviceDetails = [
  { name: 'Interior painting', image: '/images/service-interior-painting.png', alt: 'Warmly finished Hudson Valley living room with painted walls and trim', description: 'Thoughtful wall, ceiling, trim, and room-by-room color work with clean lines and a finish that feels at home in the architecture.' },
  { name: 'Exterior painting', image: '/images/service-exterior-painting.png', alt: 'Freshly painted Hudson Valley home exterior with porch and shutters', description: 'Durable exterior color and careful trim work that protects the house while sharpening its character from the road.' },
  { name: 'Power washing', image: '/images/service-power-washing.png', alt: 'Pressure washing cleaning a weathered exterior siding surface', description: 'A careful clean that removes built-up dirt and organic growth so the next finish has a sound, prepared surface.' },
  { name: 'Cabinet refinishing', image: '/images/service-cabinet-refinishing.png', alt: 'Smooth deep green refinished kitchen cabinets with brass hardware', description: 'A refined new surface for kitchens, built-ins, and millwork—sprayed or hand-finished for a durable, furniture-like result.' },
  { name: 'Wallpaper', image: '/images/service-wallpaper.png', alt: 'Craftsperson aligning botanical wallpaper over painted wainscoting', description: 'Measured, aligned installation that makes pattern feel intentional across walls, corners, outlets, and trim.' },
  { name: 'Decorative finishes', image: '/images/service-decorative-finishes.png', alt: 'Layered mineral decorative plaster finish on a wall', description: 'Limewash, plaster, glazes, and layered texture that give a surface depth, movement, and a distinctly handmade quality.' },
  { name: 'Surface preparation', image: '/images/service-surface-preparation.png', alt: 'Wall being patched, sanded, and prepared for a new finish', description: 'The unglamorous work that makes everything else last: patching, sanding, caulking, priming, and getting the surface right.' },
  { name: 'Murals + custom art', image: '/images/service-murals-custom-art.png', alt: 'Colorful botanical hand-painted mural with abstract shapes', description: 'Site-specific murals, hand-painted graphics, and decorative artwork designed around a room, a business, or a very particular idea.' },
  { name: 'Color consultation', image: '/images/service-color-consultation.png', alt: 'Paint color cards and material samples arranged on a wood table', description: 'A practical color conversation grounded in architecture, light, materials, furniture, and how the rooms connect.' },
  { name: 'Art installation', image: '/images/service-art-installation.png', alt: 'Framed landscape artwork carefully installed above a wood credenza', description: 'Sourcing, placement, framing, and careful hanging so artwork feels considered, balanced, and at home in the room.' },
  { name: 'Furniture refinishing', image: '/images/service-furniture-refinishing.png', alt: 'Vintage dresser refinished in a deep blue-green with brass pulls', description: 'New life for treasured furniture through color, repair, surface work, and finishes that respect the piece’s age and form.' },
  { name: 'Spray finishing', image: '/images/service-spray-finishing.png', alt: 'Smooth spray-finished architectural cabinet panel in a workshop', description: 'A smooth, even finish for doors, cabinetry, furniture, and architectural panels where precision and consistency matter.' },
]

const colorOptions = [
  { name: 'Plaster', hex: '#d7c9b5', note: 'A warm neutral. Use it to soften contrast and let art, wood, or strong accents lead.' },
  { name: 'Oxide', hex: '#a85237', note: 'An earthy warm. Great for making a room feel grounded, intimate, and a little unexpected.' },
  { name: 'Moss', hex: '#78836d', note: 'A muted green. It connects interiors to the landscape and plays well with natural materials.' },
  { name: 'Wine', hex: '#612e32', note: 'A deep value. Use it on a smaller wall or built-in to create depth without going black.' },
  { name: 'Dust', hex: '#c4bbae', note: 'A quiet grey-beige. It shifts with the light and creates a calm backdrop for layered rooms.' },
  { name: 'Ochre', hex: '#bf8e3e', note: 'A sunlit accent. A little goes a long way on a door, ceiling, niche, or piece of furniture.' },
  { name: 'Ink', hex: '#262c2c', note: 'A soft black. Use it for punctuation, rhythm, and architectural details.' },
  { name: 'Cobalt', hex: '#365a70', note: 'A focused cool. It brings energy to warm neutrals and makes a small accent feel intentional.' },
  { name: 'Blush', hex: '#d99992', note: 'A softened red. Pair it with umber or olive for warmth without sweetness.' },
  { name: 'Butter', hex: '#e8c85a', note: 'A clear yellow. It lifts a shadowy room and makes dark colors feel more playful.' },
  { name: 'Chalk', hex: '#f1eee5', note: 'A clean light. Use it to give stronger colors breathing room and keep a palette from feeling heavy.' },
  { name: 'Terracotta', hex: '#c86a4b', note: 'A mineral orange. It adds age, heat, and a handmade quality to contemporary spaces.' },
  { name: 'Brick', hex: '#a84232', note: 'A grounded red with architectural weight. Strong on a door, dining room, or built-in.' },
  { name: 'Marigold', hex: '#e2a72f', note: 'A clear golden yellow that makes quiet rooms feel optimistic and alive.' },
  { name: 'Poppy', hex: '#e34d3b', note: 'A direct, energetic red. Use it as a small, deliberate moment rather than a blanket.' },
  { name: 'Juniper', hex: '#3e6255', note: 'A deep botanical green that supports wood, stone, brass, and collected objects.' },
  { name: 'Sea Glass', hex: '#91b5ad', note: 'A softened blue-green that brings lightness to trim, bathrooms, and sunny rooms.' },
  { name: 'Lavender', hex: '#a59bb8', note: 'A dusty violet that makes ochre, umber, and warm whites feel more sophisticated.' },
  { name: 'Dusk', hex: '#6c7180', note: 'A moody blue-grey for rooms that need atmosphere without heavy contrast.' },
  { name: 'Bone', hex: '#d8cdbb', note: 'A mineral neutral that bridges warm wood, painted color, and imperfect historic surfaces.' },
]

const galleryArtwork = [
  { image: '/images/artwork-geometric-navy-rose.png', alt: 'Original geometric abstract painting in navy, rose, cream, and ochre', label: 'Available artwork / geometric study' },
  { image: '/images/artwork-blush-mixed-media.png', alt: 'Original blush pink and umber mixed-media painting', label: 'Available artwork / blush + umber' },
  { image: '/images/artwork-soft-landscape.png', alt: 'Original gestural landscape painting in sage, blue, clay, and lavender', label: 'Available artwork / soft landscape' },
]

const galleryServices = ['Art sourcing + curation', 'Art consultation', 'Framing + presentation', 'Fine art installation', 'Specialty installation', 'Interior decoration', 'Furniture + cabinet resurfacing and restoration']

const brandPalettes = {
  'Benjamin Moore': [
    { name: 'White Dove', hex: '#e9e4d6', note: 'A soft, livable white for walls, trim, and light-filled rooms.' },
    { name: 'Hale Navy', hex: '#405267', note: 'A deep blue that gives cabinetry, built-ins, and rooms a strong anchor.' },
    { name: 'First Light', hex: '#e4b9b3', note: 'A gentle blush that warms a room without becoming sugary.' },
    { name: 'Wrought Iron', hex: '#414347', note: 'A near-black grey for architectural punctuation and contrast.' },
  ],
  'Sherwin-Williams': [
    { name: 'Alabaster', hex: '#e8e2d2', note: 'A warm white that keeps a room calm and approachable.' },
    { name: 'Naval', hex: '#3c4a5d', note: 'A saturated navy for depth, millwork, and dramatic small spaces.' },
    { name: 'Redend Point', hex: '#b99483', note: 'A grounded blush-beige that sits beautifully with wood and stone.' },
    { name: 'Tricorn Black', hex: '#2e3030', note: 'A confident soft black for doors, trim, and graphic contrast.' },
  ],
  'Farrow & Ball': [
    { name: 'School House White', hex: '#e9e2d2', note: 'A relaxed off-white with a little warmth and age.' },
    { name: 'Hague Blue', hex: '#3f5360', note: 'A deep blue-green with a collected, enveloping feeling.' },
    { name: 'India Yellow', hex: '#d59d32', note: 'A rich ochre that brings light and character to a room.' },
    { name: 'Railings', hex: '#303537', note: 'A blue-black that feels softer and more complex than flat black.' },
  ],
  'Behr': [
    { name: 'Swiss Coffee', hex: '#e7e0d0', note: 'A warm neutral that works as a flexible whole-home backdrop.' },
    { name: 'Hidden Gem', hex: '#647b72', note: 'A smoky jade that brings depth while staying connected to nature.' },
    { name: 'Canyon Dusk', hex: '#a97868', note: 'A mineral rose-brown that makes a room feel settled and tactile.' },
    { name: 'Cracked Pepper', hex: '#393a38', note: 'A charcoal accent for doors, cabinetry, and graphic details.' },
  ],
  'PPG': [
    { name: 'Imagine', hex: '#d2c5a8', note: 'A warm, softened neutral for calm rooms and natural materials.' },
    { name: 'Ivy League', hex: '#526a57', note: 'A leafy green that adds atmosphere without becoming loud.' },
    { name: 'Night Watch', hex: '#3f5550', note: 'A deep green-blue that creates quiet drama and depth.' },
    { name: 'Black Flame', hex: '#303337', note: 'A blue-leaning black that adds structure to a palette.' },
  ],
} as const

type StudioColor = { name: string; hex: string; note: string }

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.defaultMuted = true
    const startPlay = () => {
      video.muted = true
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error: unknown) => {
            const isAbort = error instanceof Error && error.name === 'AbortError'
            if (!isAbort) {
              setIsPlaying(false)
            }
          })
      }
    }
    startPlay()

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      if (video.ended) video.currentTime = 0
      video.muted = true
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error: unknown) => {
            const isAbort = error instanceof Error && error.name === 'AbortError'
            if (!isAbort) {
              console.warn('Video playback prevented:', error)
            }
          })
      }
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="hero-video-wrapper" onClick={togglePlay} title="Click to play / pause video">
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
         poster="/images/mural-umber-geometric.png"
        onCanPlay={(e) => {
          const v = e.currentTarget
          v.muted = true
          v.play().catch(() => {})
        }}
      >
         <source src="/videos/mural-painting.mp4" type="video/mp4" />
         <source src="/videos/mural-painting.webm" type="video/webm" />
      </video>
      <div className="video-overlay-gradient" />
      <div className="video-badge">
        <span className="live-dot" />
        <span>Craft in motion · Hudson Valley</span>
      </div>
      <button
        type="button"
        className="video-toggle-btn"
        onClick={(e) => {
          e.stopPropagation()
          togglePlay()
        }}
        aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
      >
        {isPlaying ? '⏸ Pause' : '▶ Play'}
       </button>
     </div>
   )
}

function ColorStudio() {
  const [brand, setBrand] = useState<keyof typeof brandPalettes>('Benjamin Moore')
  const [selected, setSelected] = useState<StudioColor>(brandPalettes['Benjamin Moore'][0])
  const [palette, setPalette] = useState<StudioColor[]>([brandPalettes['Benjamin Moore'][0], brandPalettes['Benjamin Moore'][1]])
  const [wallColor, setWallColor] = useState('#d7c9b5')
  const [trimColor, setTrimColor] = useState('#262c2c')
  const [ceilingColor, setCeilingColor] = useState('#f1eee5')
  const [roomImage, setRoomImage] = useState<string | null>(null)
  const [light, setLight] = useState<'day' | 'evening'>('day')
  const [width, setWidth] = useState(12)
  const [height, setHeight] = useState(10)
  const chooseColor = (color: StudioColor) => { setSelected(color); setWallColor(color.hex) }
  const addColor = (color: StudioColor) => setPalette((current) => current.some((item) => item.hex === color.hex) ? current : [...current, color])
  const upload = (event: React.ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) setRoomImage(URL.createObjectURL(file)) }
  const gallons = Math.max(1, Math.ceil((width * height * 2) / 350))
  const visibleColors = brandPalettes[brand]
  return <section className="color-studio" id="color"><div className="studio-intro"><div className="section-label">Color / Consultation + design</div><h2>COLOR IS PART<br />OF THE <i>ARCHITECTURE.</i></h2><p className="studio-lead">A practical color lab for rooms, houses, and the way they connect.</p><p>Upload a room, test a wall color, build a palette, and bring the conversation to Philip before you commit to gallons of paint.</p><div className="studio-links"><a href="https://www.sherwin-williams.com/homeowners/inspiration/color-selection-tools" target="_blank" rel="noreferrer">Sherwin-Williams visualizer ↗</a><a href="https://www.benjaminmoore.com/en-us/color-portfolio-paint-matching-app" target="_blank" rel="noreferrer">Benjamin Moore Color Portfolio ↗</a><a href="https://www.behr.com/pro/colors/paint/visualizer" target="_blank" rel="noreferrer">Behr visualizer ↗</a><a href="https://www.ppgpaints.com/color/color-tools/visualizer" target="_blank" rel="noreferrer">PPG visualizer ↗</a></div></div><div className="studio-tool"><div className={`room-preview ${light}`}><div className="room-image" style={roomImage ? { backgroundImage: `url(${roomImage})` } : undefined}><div className="room-wall" style={{ backgroundColor: wallColor }}></div><div className="room-trim" style={{ backgroundColor: trimColor }}></div><div className="room-ceiling" style={{ backgroundColor: ceilingColor }}></div><div className="room-demo-window"><span>preview wall</span></div></div><div className="room-tag">{roomImage ? 'your room / preview' : 'sample room / preview'}</div></div><div className="studio-controls"><div className="control-heading"><span>01 / See it in a room</span><label className="upload-button">Upload your room<input type="file" accept="image/*" onChange={upload} /></label></div><p className="studio-disclaimer">Preview colors are directional. Light, sheen, surface, and your screen will change the final result.</p><div className="zone-controls"><label>Wall<input type="color" value={wallColor} onChange={(e) => setWallColor(e.target.value)} /></label><label>Trim<input type="color" value={trimColor} onChange={(e) => setTrimColor(e.target.value)} /></label><label>Ceiling<input type="color" value={ceilingColor} onChange={(e) => setCeilingColor(e.target.value)} /></label></div><div className="light-controls"><span>Light study</span><button className={light === 'day' ? 'active' : ''} onClick={() => setLight('day')} type="button">Day</button><button className={light === 'evening' ? 'active' : ''} onClick={() => setLight('evening')} type="button">Evening</button></div></div></div><div className="studio-palette"><div className="palette-header"><div><span className="section-label">02 / Build a palette</span><h3>Find the relationship.</h3></div><select value={brand} onChange={(e) => { const next = e.target.value as keyof typeof brandPalettes; setBrand(next); chooseColor(brandPalettes[next][0]) }} aria-label="Choose a paint brand"><option>Benjamin Moore</option><option>Sherwin-Williams</option><option>Farrow & Ball</option><option>Behr</option><option>PPG</option></select></div><div className="brand-note">{brand} reference colors / verify on the brand’s own site and with physical samples</div><div className="studio-swatches">{visibleColors.map((color) => <button type="button" key={color.name} className={selected.hex === color.hex ? 'selected' : ''} style={{ backgroundColor: color.hex }} onClick={() => chooseColor(color)}><span>{color.name}</span></button>)}</div><div className="selected-color"><div className="selected-chip" style={{ backgroundColor: selected.hex }}></div><div><span className="section-label">Selected color</span><strong>{selected.name}</strong><p>{selected.note}</p></div><button type="button" className="add-palette" onClick={() => addColor(selected)}>+ Add to palette</button></div><div className="built-palette"><span className="section-label">Your palette / click a chip to remove</span><div>{palette.map((color) => <button type="button" key={color.hex} style={{ backgroundColor: color.hex }} onClick={() => setPalette((current) => current.filter((item) => item.hex !== color.hex))}>{color.name} ×</button>)}</div></div></div><div className="studio-theory"><div><span className="section-label">03 / A little color theory</span><h3>Good palettes have a point of view.</h3></div><div className="theory-grid"><article><b>Temperature</b><p>Warm colors advance and gather a room. Cool colors recede and create air.</p></article><article><b>Value</b><p>Light and dark relationships create rhythm. A ceiling does not have to be white.</p></article><article><b>Contrast</b><p>Use one strong note, then let quieter colors support it from room to room.</p></article></div></div><div className="studio-estimator"><div><span className="section-label">04 / Quick estimate</span><h3>How much surface?</h3></div><label>Room width (ft)<input type="number" min="1" value={width} onChange={(e) => setWidth(Number(e.target.value))} /></label><label>Room length (ft)<input type="number" min="1" value={height} onChange={(e) => setHeight(Number(e.target.value))} /></label><strong>About {gallons} gal<span>two coats / walls only</span></strong><a className="button dark" href="#contact">Send this palette to Philip <span>↗</span></a></div></section>
}

type BeforeAfterSliderProps = {
  label?: string
  title?: ReactNode
  intro?: string
  beforeSrc?: string
  beforeAlt?: string
  afterSrc?: string
  afterAlt?: string
  beforeLabel?: string
  afterLabel?: string
  rangeId?: string
}

function BeforeAfterSlider({
  label = 'Surface Transformation / Historic Exterior',
  title = <>PREPARATION IS <i>THE FINISH.</i></>,
  intro = 'Drag the divider to compare the level of meticulous preparation and hand-cut trim on an 1800s Hudson Valley home.',
  beforeSrc = '/images/painting-process-detail.png',
  beforeAlt = 'Hand cutting clean lines along interior trim',
  afterSrc = '/images/upstate-exterior-repaint.png',
  afterAlt = 'Completed upstate home repaint with olive shutters',
  beforeLabel = '01 / Process & Prep',
  afterLabel = '02 / Architectural Finish',
  rangeId = 'ba-range',
}: BeforeAfterSliderProps = {}) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPosition(percent)
  }

  return (
    <div className="before-after-container">
      <div className="section-label">{label}</div>
      <h3>{title}</h3>
      <p className="ba-intro">{intro}</p>
      <div
        className="ba-stage"
        ref={containerRef}
        onMouseMove={(e) => {
          if (e.buttons === 1) handleMove(e.clientX)
        }}
        onTouchMove={(e) => {
          if (e.touches[0]) handleMove(e.touches[0].clientX)
        }}
        onClick={(e) => handleMove(e.clientX)}
      >
        <img
          src={afterSrc}
          alt={afterAlt}
          className="ba-img ba-after"
        />
        <div className="ba-before-clip" style={{ width: `${position}%` }}>
          <img
            src={beforeSrc}
            alt={beforeAlt}
            className="ba-img ba-before"
          />
        </div>
        <div className="ba-divider" style={{ left: `${position}%` }}>
          <div className="ba-handle">
            <span>‹ ›</span>
          </div>
        </div>
        <div className="ba-tag ba-tag-before" style={{ opacity: position > 16 ? 1 : 0 }}>
          {beforeLabel}
        </div>
        <div className="ba-tag ba-tag-after" style={{ opacity: position < 84 ? 1 : 0 }}>
          {afterLabel}
        </div>
      </div>
      <div className="ba-slider-control">
        <label htmlFor={rangeId}>Slide comparison: {Math.round(position)}%</label>
        <Slider
          id={rangeId}
          min={0}
          max={100}
          step={1}
          value={[position]}
          onValueChange={([next]) => setPosition(next ?? position)}
          aria-label="Comparison slider between the process and finished mural"
        />
      </div>
    </div>
  )
}

function ArtGallerySection() {
  return <section className="art-gallery section-pad" id="gallery">
    <div className="section-label">04 / Art gallery + services</div>
    <div className="art-gallery-intro">
      <div><h2>A ROOM<br />FOR <i>GOOD ART.</i></h2><p className="lead">A working gallery for Philip Hardy’s art and the artists of the Hudson Valley.</p></div>
      <div><p>Hudson Valley Paintworks is a place to discover, live with, and install art. We share Philip’s work alongside artists from across the Hudson Valley, with thoughtful guidance for choosing what belongs in a room.</p><a className="button dark" href="/gallery">View the gallery <span>↗</span></a></div>
    </div>
    <div className="art-gallery-grid">{galleryArtwork.map((item, index) => <figure className={index === 0 ? 'art-gallery-feature' : ''} key={item.image}><img src={item.image} alt={item.alt} /><figcaption>{item.label}</figcaption></figure>)}</div>
    <div className="art-gallery-services"><div className="art-services-copy"><h3>From the first<br /><i>yes</i> to the last nail.</h3><p>We help the room and the artwork speak to one another—from the first conversation and the right frame to the final careful installation.</p><a className="arrow-link" href="#contact">Plan something beautiful <span>↗</span></a></div><div className="art-service-list">{galleryServices.map((service, index) => <div key={service}><span>{String(index + 1).padStart(2, '0')}</span><strong>{service}</strong><b>↗</b></div>)}</div></div>
  </section>
}

const processSlides = [
  { image: '/images/process-consultation.png', alt: 'Painter and homeowner reviewing color samples and project plans', label: '01 / Tell me about the project' },
  { image: '/images/artist-home-tree-mural.png', alt: 'Painter and client considering a hand-painted tree mural in a home', label: '02 / On-site consultation' },
  { image: '/images/artist-geometric-mural.png', alt: 'Geometric mural study with layered color and texture', label: '03 / Color + scope' },
  { image: '/images/painting-process-detail.png', alt: 'Painter cutting a clean line along interior trim', label: '04 / Preparation' },
  { image: '/images/artist-studio-hand.png', alt: 'Artist painting a textured panel in the studio', label: '05 / Painting / installation' },
  { image: '/images/upstate-exterior-repaint.png', alt: 'Finished Hudson Valley home with painted trim', label: '06 / Final walkthrough' },
]

const muralSlides = [
  { image: '/images/mural-pink-botanical.png', alt: 'Pink botanical hand-painted mural' },
  { image: '/images/mural-forest-landscape.png', alt: 'Forest landscape hand-painted mural' },
  { image: '/images/mural-birds.png', alt: 'Birds and branches hand-painted mural' },
  { image: '/images/mural-cats.png', alt: 'Cartoon cat hand-painted mural' },
]

function MuralBackground() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % muralSlides.length)
    }, 6000)
    return () => window.clearInterval(timer)
  }, [])

  return <div className="mural-slides" aria-hidden="true">
    {muralSlides.map((slide, index) => <img className={index === activeSlide ? 'active' : ''} style={{ opacity: index === activeSlide ? 1 : 0 }} src={slide.image} alt="" key={slide.image} />)}
  </div>
}

function ProcessCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const slide = processSlides[activeSlide]
  const move = (direction: number) => setActiveSlide((current) => (current + direction + processSlides.length) % processSlides.length)

  useEffect(() => {
    const timer = window.setInterval(() => move(1), 5200)
    return () => window.clearInterval(timer)
  }, [])

  return <div className="process-carousel" aria-label="Project process images">
    <div className="process-carousel-image">
      <img src={slide.image} alt={slide.alt} key={slide.image} />
      <div className="process-carousel-label">{slide.label}</div>
      <div className="process-carousel-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous process image">←</button>
        <span>{String(activeSlide + 1).padStart(2, '0')} / {String(processSlides.length).padStart(2, '0')}</span>
        <button type="button" onClick={() => move(1)} aria-label="Next process image">→</button>
      </div>
    </div>
    <div className="process-carousel-dots" aria-label="Choose process image">
      {processSlides.map((item, index) => <button type="button" key={item.image} className={index === activeSlide ? 'active' : ''} onClick={() => setActiveSlide(index)} aria-label={`Show process image ${index + 1}`} />)}
    </div>
  </div>
}

const artistCarouselSlides = [
  { image: '/images/completed-interior-painting.png', alt: 'Completed warm living room with butter-yellow walls and blue built-ins', label: 'Interior painting / finished room' },
  { image: '/images/completed-victorian-exterior.png', alt: 'Completed sage-green Victorian home with cream trim', label: 'Exterior painting / finished home' },
  { image: '/images/completed-botanical-bird-mural.png', alt: 'Completed botanical and bird mural in a finished restaurant dining room', label: 'Murals + custom art / finished mural' },
  { image: '/images/completed-decorative-finish.png', alt: 'Completed clay and blush decorative wall finish with an arch motif', label: 'Decorative finishes / completed detail' },
  { image: '/images/completed-cabinet-refinishing.png', alt: 'Completed kitchen with deep cobalt blue refinished cabinetry', label: 'Cabinet refinishing / finished kitchen' },
]

function ArtistImageCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const move = (direction: number) => setActiveSlide((current) => (current + direction + artistCarouselSlides.length) % artistCarouselSlides.length)

  useEffect(() => {
    const timer = window.setInterval(() => move(1), 5200)
    return () => window.clearInterval(timer)
  }, [])

  return <figure className="artist-image-feature artist-feature-carousel">
    <div className="artist-feature-slides">
      {artistCarouselSlides.map((slide, index) => <img className={index === activeSlide ? 'active' : ''} style={{ opacity: index === activeSlide ? 1 : 0 }} src={slide.image} alt={slide.alt} key={slide.image} />)}
    </div>
    <div className="artist-feature-controls">
      <button type="button" onClick={() => move(-1)} aria-label="Previous artist image">&#8592;</button>
      <span>{String(activeSlide + 1).padStart(2, '0')} / {String(artistCarouselSlides.length).padStart(2, '0')}</span>
      <button type="button" onClick={() => move(1)} aria-label="Next artist image">&#8594;</button>
    </div>
    <figcaption>{artistCarouselSlides[activeSlide].label}</figcaption>
  </figure>
}

function ServicesShowcase() {
  const [activeService, setActiveService] = useState(0)
  const [expandedService, setExpandedService] = useState<number | null>(null)
  const service = serviceDetails[activeService]

  useEffect(() => {
    const timer = window.setInterval(() => setActiveService((current) => (current + 1) % serviceDetails.length), 6000)
    return () => window.clearInterval(timer)
  }, [])

  return <div className="services-showcase">
    <div className="services-feature">
      <img src={service.image} alt={service.alt} key={service.image} />
      <div className="services-feature-caption"><span>{String(activeService + 1).padStart(2, '0')} / {String(serviceDetails.length).padStart(2, '0')}</span><strong>{service.name}</strong></div>
      <div className="services-feature-controls">
        <button type="button" onClick={() => setActiveService((activeService - 1 + serviceDetails.length) % serviceDetails.length)} aria-label="Previous service">←</button>
        <button type="button" onClick={() => setActiveService((activeService + 1) % serviceDetails.length)} aria-label="Next service">→</button>
      </div>
    </div>
    <div className="service-list" aria-label="Services">
      {serviceDetails.map((item, index) => <div className={`service-row ${index === expandedService ? 'active' : ''}`} key={item.name}>
        <button type="button" onClick={() => setExpandedService((current) => current === index ? null : index)} aria-expanded={index === expandedService}>
          <span>{String(index + 1).padStart(2, '0')}</span><strong>{item.name}</strong><b>↗</b>
        </button>
        {index === expandedService && <p>{item.description}</p>}
      </div>)}
    </div>
  </div>
}

const heroSlides = [
  { image: '/images/hero-mural-pink-botanical.png', alt: 'Finished abstract botanical wall mural in ochre, pink, rust, and olive' },
  { image: '/images/hero-mural-forest-landscape.png', alt: 'Finished hand-painted forest landscape mural' },
  { image: '/images/hero-mural-geometric.png', alt: 'Finished geometric wall mural in cobalt, coral, moss, and butter yellow' },
  { image: '/images/hero-mural-birds.png', alt: 'Finished hand-painted birds and branches mural' },
  { image: '/images/hero-mural-cats.png', alt: 'Finished playful hand-painted cartoon cat mural' },
  { image: '/images/hero-mural-soft-landscape.png', alt: 'Finished soft abstract landscape mural in lavender and peach' },
]

function HeroStill() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 6000)
    return () => window.clearInterval(timer)
  }, [])

  return <div className="hero-still" aria-label="Rotating selection of finished hand-painted murals">
    <div className="hero-still-slides">
      {heroSlides.map((slide, index) => <img className={index === activeSlide ? 'active' : ''} style={{ opacity: index === activeSlide ? 1 : 0 }} src={slide.image} alt={slide.alt} key={slide.image} />)}
    </div>
    <div className="hero-still-overlay" />
    <div className="hero-still-credit">HAND-PAINTED / HUDSON VALLEY</div>
  </div>
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [formError, setFormError] = useState('')
  const [activeColor, setActiveColor] = useState(0)
  const [customColor, setCustomColor] = useState('#bf8e3e')
  const [palette, setPalette] = useState<number[]>([0, 2, 5])
  const [projectMessage, setProjectMessage] = useState('')

  const addToPalette = (index: number) =>
    setPalette((current) => (current.includes(index) ? current : [...current, index]))
  const removeFromPalette = (index: number) =>
    setPalette((current) => current.filter((item) => item !== index))

  const attachPaletteToMessage = () => {
    const paletteNames = palette
      .map((idx) => (idx === -1 ? `Custom (${customColor})` : colorOptions[idx]?.name))
      .filter(Boolean)
      .join(', ')
    const addition = `Interested in working with palette: ${paletteNames}.`
    setProjectMessage((current) => (current ? `${current}\n\n${addition}` : addition))
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setFormError('')
    try {
      const formData = new FormData(e.currentTarget)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Something went wrong.')
      setSent(true)
      e.currentTarget.reset()
      setProjectMessage('')
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : 'Please try again or send your inquiry through the contact form.'
      )
      setFormError(error instanceof Error ? error.message : 'Please try again or send your inquiry through the contact form.')
    } finally {
      setSending(false)
    }
  }

  /*
    <main>
      <header className="site-header">
        <a className="logo" href="#top">
          HARDY PAINTWORKS
          <span>FINE PAINTING & DESIGN</span>
        </a>
        <nav className="desktop-nav">
          <a href="#work">Work</a>
          <a href="#services">Painting</a>
          <a href="#color">Color + Design</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-phone" href="tel:+15188474071">
          Call for a free estimate · 1 518 847 4071
        </a>
        <a className="header-cta" href="#contact">
          Get an estimate <span>↗</span>
        </a>
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </header>
  */
  return <main>
    {false && <>
    <header className="site-header">
      <a className="logo" href="#top">HARDY PAINTWORKS<span>FINE PAINTING & DESIGN</span></a>
      <nav><a href="#work">Work</a><a href="#services">Painting</a><a href="#color">Color + Design</a></nav>
      <a className="header-phone" href="tel:+15188474071">Call for a free estimate · 1 518 847 4071</a><a className="header-cta" href="#contact">Get an estimate <span>↗</span></a>
    </header>
    <section className="hero" id="top">
      <div className="hero-copy"><p className="eyebrow">Hudson Valley / New York</p><h1><span className="headline-color">COLOR</span><br /><em className="headline-should">SHOULD <b>DO</b></em><br /><span className="headline-something">SOMETHING.</span></h1><p className="hero-intro">Fine painting, decorative finishes, murals, color design and artistic services throughout the Hudson Valley.</p><div className="hero-actions"><a className="button dark" href="#contact">Get a free estimate <span>↗</span></a><a className="call-link" href="tel:+15188474071">Call 1 518 847 4071 <span>↗</span></a><a className="text-link" href="#work">View the work <span>↓</span></a></div></div>
      <div className="hero-image image-texture"></div>
    </section>

      {mobileMenuOpen && (
        <div className="mobile-drawer" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <span className="logo">HARDY PAINTWORKS</span>
              <button type="button" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                ✕
              </button>
            </div>
            <div className="mobile-nav-links">
              <a href="#work" onClick={() => setMobileMenuOpen(false)}>
                01 / Selected Work
              </a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)}>
                02 / Painting Services
              </a>
              <a href="#color" onClick={() => setMobileMenuOpen(false)}>
                03 / Color Consultation
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                04 / Request an Estimate
              </a>
            </div>
            <div className="mobile-drawer-footer">
              <a className="button dark" href="tel:+15188474071">
                Call 1 518 847 4071 ↗
              </a>
              <a className="button light" href="#contact" onClick={() => setMobileMenuOpen(false)}>
                Send an inquiry ↗
              </a>
            </div>
          </div>
        </div>
      )}
    <section className="intro section-pad"><div className="section-label">01 / Hardy Paintworks</div><div className="maker-grid"><div className="maker-copy"><h2>PAINTING<br /><i>BY A</i><br />PAINTER.</h2><p className="lead">Hardy Paintworks is led by Philip Hardy, a professionally trained artist with a Master of Fine Arts.</p><p>Philip brings an artist’s understanding of color, composition, materials, proportion and surface to residential and commercial painting. That means more than a clean coat of paint—it means thoughtful decisions about what a room can become.</p><p>Every project combines careful preparation, clear communication, and a finish made to live with.</p><a className="arrow-link" href="#about">Meet Philip <span>↗</span></a></div></div><div className="maker-process"><div className="process-image"><img src="/images/painting-process-detail.png" alt="Painter cutting a clean line along trim in a warm upstate interior" /></div></div></section>

    </>}

      <header className="site-header site-header-overlay">
        <a className="logo" href="#top"><span className="logo-region">HUDSON VALLEY</span> PAINTWORKS<span>FINE PAINTING & DESIGN</span></a>
        <nav className="desktop-nav"><a href="#work">Work</a><a href="#services">Painting</a><a href="#gallery">Gallery</a><a href="#color">Color + Design</a><a href="#contact">Contact</a></nav>
        <a className="header-phone" href="tel:+15188474071">Call for a free estimate · 1 518 847 4071</a>
        <a className="header-cta" href="#contact">Get a free estimate <span>↗</span></a>
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button type="button" variant="outline" size="icon" className="mobile-menu-btn" aria-label="Open navigation menu">
              <Menu size={20} strokeWidth={1.5} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="ui-sheet-brand"><span>HUDSON VALLEY</span> PAINTWORKS</div>
            <nav className="ui-sheet-links">
              <SheetClose asChild><a href="#work">01 / Selected work</a></SheetClose>
              <SheetClose asChild><a href="#services">02 / Painting services</a></SheetClose>
              <SheetClose asChild><a href="#gallery">03 / Art gallery</a></SheetClose>
              <SheetClose asChild><a href="#contact">04 / Request an estimate</a></SheetClose>
            </nav>
            <div className="ui-sheet-actions">
              <SheetClose asChild><a className="button dark" href="#contact">Get a free estimate <ArrowUpRight size={16} /></a></SheetClose>
              <a className="ui-sheet-phone" href="tel:+15188474071">Call 1 518 847 4071</a>
            </div>
          </SheetContent>
        </Sheet>
      </header>
      {mobileMenuOpen && <div className="mobile-drawer" onClick={() => setMobileMenuOpen(false)}><div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}><div className="mobile-drawer-header"><span className="logo">HARDY PAINTWORKS</span><button type="button" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">×</button></div><nav className="mobile-nav-links"><a href="#work" onClick={() => setMobileMenuOpen(false)}>01 / Selected work</a><a href="#services" onClick={() => setMobileMenuOpen(false)}>02 / Painting services</a><a href="#gallery" onClick={() => setMobileMenuOpen(false)}>03 / Art gallery</a><a href="#color" onClick={() => setMobileMenuOpen(false)}>04 / Color + design</a><a href="#contact" onClick={() => setMobileMenuOpen(false)}>05 / Request an estimate</a></nav><a className="button dark" href="tel:+15188474071">Call 1 518 847 4071 ↗</a></div></div>}
      <section className="hero" id="top">
        <div className="hero-copy">
          <h1 className="hero-title">
            <span className="headline-color">COLOR</span>
            <br />
            <em className="headline-should">
              SHOULD <b>DO</b>
            </em>
            <br />
            <span className="headline-something">SOMETHING.</span>
          </h1>
          <p className="hero-intro">
            Fine residential & commercial painting, decorative finishes, murals, and architectural color design throughout the Hudson Valley.
          </p>
          <div className="hero-actions">
            <a className="button dark" href="#contact">
              Get a free estimate <span>↗</span>
            </a>
            <a className="call-link" href="tel:+15188474071">
              Call 1 518 847 4071 <span>↗</span>
            </a>
            <a className="text-link" href="#work">
              View the work <span>↓</span>
            </a>
          </div>
        </div>
        <HeroStill />
      </section>
    {false && <>
    <section className="work section-pad" id="work"><div className="section-top"><div className="section-label">Selected work / A working archive</div><a className="arrow-link" href="#contact">Start a project <span>↗</span></a></div><h2>GOOD WORK<br /><i>LEAVES A MARK.</i></h2><p className="archive-intro">Interiors, exteriors, details, and the occasional idea that begins on a wall. A growing record of color, preparation, and finish.</p><div className="work-grid">{work.map((item) => <article className={`work-card ${item.cls}`} key={item.n}><div className="work-image"><span>{item.n}</span></div><p>{item.meta}</p><h3>{item.title}</h3></article>)}</div><div className="exterior-gallery"><div className="gallery-grid"><div className="gallery-main"><img src="/images/upstate-exterior-repaint.png" alt="Cream upstate home with olive shutters and a covered porch" /></div><div><img src="/images/upstate-exterior-angle.png" alt="Side angle of the same upstate home and porch" /></div><div><img src="/images/upstate-exterior-angle-two.png" alt="Another garden angle of the same upstate home" /></div><div><img src="/images/upstate-exterior-detail.png" alt="Close detail of the same home's porch trim and oxblood door" /></div><div><img src="/images/upstate-exterior-closeup.png" alt="Close-up of cream clapboard siding and olive shutter" /></div></div><div className="gallery-caption"><p>HUDSON VALLEY / EXTERIOR PAINTING / ARCHIVE STUDY</p><h3>Quiet on the outside</h3></div></div></section>

    </>}
      <section className="intro section-pad" id="intro">
        <div className="lava-blobs" aria-hidden="true">
          <span className="lava-blob lava-blob-one" />
          <span className="lava-blob lava-blob-two" />
          <span className="lava-blob lava-blob-three" />
          <span className="lava-blob lava-blob-four" />
          <span className="lava-blob lava-blob-five" />
          <span className="lava-blob lava-blob-six" />
          <span className="lava-blob lava-blob-seven" />
          <span className="lava-blob lava-blob-eight" />
          <span className="lava-blob lava-blob-nine" />
          <span className="lava-blob lava-blob-ten" />
          <span className="lava-blob lava-blob-eleven" />
          <span className="lava-blob lava-blob-twelve" />
          <span className="lava-blob lava-rise-one" />
          <span className="lava-blob lava-rise-two" />
          <span className="lava-blob lava-rise-three" />
          <span className="lava-blob lava-rise-four" />
          <span className="lava-blob lava-edge-one" />
          <span className="lava-blob lava-edge-two" />
          <span className="lava-blob lava-edge-three" />
          <span className="lava-blob lava-edge-four" />
          <span className="lava-blob lava-edge-five" />
          <span className="lava-blob lava-edge-six" />
          <span className="lava-blob lava-edge-seven" />
          <span className="lava-blob lava-edge-eight" />
          <span className="lava-blob lava-field-one" />
          <span className="lava-blob lava-field-two" />
          <span className="lava-blob lava-field-three" />
          <span className="lava-blob lava-field-four" />
          <span className="lava-blob lava-field-five" />
          <span className="lava-blob lava-field-six" />
          <span className="lava-blob lava-field-seven" />
          <span className="lava-blob lava-field-eight" />
          <span className="lava-blob lava-field-nine" />
          <span className="lava-blob lava-field-ten" />
          <span className="lava-blob lava-field-eleven" />
          <span className="lava-blob lava-field-twelve" />
          <span className="lava-blob lava-edge-nine" />
          <span className="lava-blob lava-edge-ten" />
          <span className="lava-blob lava-edge-eleven" />
          <span className="lava-blob lava-edge-twelve" />
          <span className="lava-blob lava-edge-thirteen" />
          <span className="lava-blob lava-edge-fourteen" />
          <span className="lava-blob lava-edge-fifteen" />
          <span className="lava-blob lava-edge-sixteen" />
          <span className="lava-blob lava-edge-seventeen" />
          <span className="lava-blob lava-edge-eighteen" />
          <span className="lava-blob lava-edge-nineteen" />
          <span className="lava-blob lava-edge-twenty" />
          <div className="lava-extra-blobs">
            <span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
            <span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
            <span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
          </div>
          <div className="lava-hundred" aria-hidden="true">
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
          </div>
          <div className="lava-big-field" aria-hidden="true">
            <b /><b /><b /><b /><b /><b /><b /><b /><b /><b />
            <b /><b /><b /><b /><b /><b /><b /><b /><b /><b />
          </div>
          <div className="lava-large-field" aria-hidden="true">
            <b /><b /><b /><b /><b /><b /><b /><b /><b /><b />
            <b /><b /><b /><b /><b /><b /><b /><b /><b /><b />
          </div>
          <div className="lava-giant-field" aria-hidden="true">
            <b /><b /><b /><b /><b /><b /><b /><b /><b /><b /><b /><b /><b /><b /><b /><b />
          </div>
        </div>
        <div className="maker-grid">
          <div className="maker-copy">
            <div className="artist-section-logo" aria-label="Hudson Valley Paintworks">
              <span>HUDSON VALLEY</span>
              PAINTWORKS
            </div>
            <h2>
              PAINTING
              <br />
              <i>BY A</i>
              <br />
              PAINTER.
            </h2>
            <p className="lead">
              Hudson Valley Paintworks is led by Philip Hardy, a painter and professionally trained artist with a Master of Fine Arts.
            </p>
            <p>
              Philip brings an artist’s understanding of color, composition, materials, proportion, and surface to residential and commercial painting. That means more than a clean coat of paint—it means thoughtful decisions about what a room can become.
            </p>
            <p>
              Every project combines careful preparation, clear communication, and a finish made to live with.
            </p>
            <p>
              The work is careful, tactile, and made by hand—from the first color study to the final brushstroke. A beautiful finish is part of how a room becomes itself.
            </p>
            <p>
              We hire artists, take pride in the craft, and treat every surface as an opportunity to make something beautiful. Painting is an artform to us—we enjoy practicing it throughout the Hudson Valley.
            </p>
            <a className="arrow-link" href="#contact">
              Discuss your project <span>↗</span>
            </a>
          </div>
        </div>
        <div className="maker-process artist-image-grid">
          <ArtistImageCarousel />
          <figure><img src="/images/artist-studio-hand.png" alt="Artist's hand painting a textured panel in the studio" /><figcaption>In the studio / touch and texture</figcaption></figure>
          <figure><img src="/images/art-in-the-home.png" alt="Artwork and a hand-painted wall finish in a warm home" /><figcaption>Art in the home / lived with beautifully</figcaption></figure>
          <figure className="artist-image-mural"><img src="/images/artist-home-tree-mural.png" alt="Hand-painted tree mural spanning the wall of a warm Hudson Valley home" /><figcaption>Made for living / a mural at home</figcaption></figure>
        </div>
        <div className="artist-image-note">Painting as living beautifully.</div>
       </section>
      <ArtGallerySection />
    {false && <>
    <section className="services section-pad" id="services"><div className="section-label">02 / What we do</div><div className="services-grid"><h2>FROM WHITE WALLS<br /><i>TO WEIRD</i><br />IDEAS.</h2><div className="service-list">{services.map((s, i) => <div className="service-row" key={s}><span>0{i + 1}</span><strong>{s}</strong><b>↗</b></div>)}</div></div></section>
    <div className="services-transition"><img src="/images/services-transition-mural.png" alt="Abstract hand-painted wall mural in warm pink, umber, ochre, and navy tones" /></div>
    <section className="color-resources" id="color"><div className="section-label">Color / Explore further</div><h2>KEEP<br /><i>LOOKING.</i></h2><p>Use these official color visualizers to explore rooms, palettes, and paint options before bringing your ideas to Hardy Paintworks.</p><div className="resource-links"><a href="https://www.sherwin-williams.com/homeowners/inspiration/color-selection-tools" target="_blank" rel="noreferrer"><span>01</span><strong>Sherwin-Williams ColorSnap</strong><b>↗</b></a><a href="https://www.benjaminmoore.com/en-us/color-portfolio-paint-matching-app" target="_blank" rel="noreferrer"><span>02</span><strong>Benjamin Moore Color Portfolio</strong><b>↗</b></a><a href="https://www.behr.com/pro/colors/paint/visualizer" target="_blank" rel="noreferrer"><span>03</span><strong>Behr Color Visualizer</strong><b>↗</b></a><a href="https://www.ppgpaints.com/color/color-tools/visualizer" target="_blank" rel="noreferrer"><span>04</span><strong>PPG Color Visualizer</strong><b>↗</b></a></div><a className="button dark" href="#contact">Talk through your colors with Philip <span>↗</span></a></section>

    </>}
      <section className="work section-pad" id="work">
        <div className="section-top">
          <div className="section-label">Selected work / A working archive</div>
          <a className="arrow-link" href="#contact">
            Start a project <span>↗</span>
          </a>
        </div>
        <h2>
          GOOD WORK
          <br />
          <i>LEAVES A MARK.</i>
        </h2>
        <p className="archive-intro">
          Interiors, exteriors, details, and the occasional idea that begins on a wall. A growing record of color, preparation, and finish.
        </p>
        <div className="work-grid">
          {work.map((item) => (
            <article className={`work-card ${item.cls}`} key={item.n}>
              <div className="work-image">
                <span>{item.n}</span>
              </div>
              <p>{item.meta}</p>
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
    {false && <>
    <section className="color" id="color"><div className="color-copy"><div className="section-label">Color / Consultation + design</div><h2>COLOR IS PART<br />OF THE <i>ARCHITECTURE.</i></h2><p>Choosing paint is not just choosing a swatch. Color changes the weight, rhythm, temperature and atmosphere of a room.</p><p>We develop palettes that respond to architecture, light, furniture, artwork and the way rooms connect to one another.</p><div className="color-lesson"><span className="lesson-kicker">Try a starting point</span><strong>{colorOptions[activeColor].name}</strong><p>{colorOptions[activeColor].note}</p><div className="color-tools"><label>Make it yours <input aria-label="Choose a custom color" type="color" value={customColor} onChange={(e) => setCustomColor(e.target.value)} /></label><span>{customColor.toUpperCase()}</span></div><button className="palette-add" type="button" onClick={() => addToPalette(activeColor)}>+ Add {colorOptions[activeColor].name} to palette</button></div><div className="palette-builder"><span className="lesson-kicker">Your palette / click × to remove</span><div className="palette-row">{palette.map((index, position) => index === -1 ? <button type="button" className="palette-chip" style={{ backgroundColor: customColor }} onClick={() => setPalette((current) => current.filter((_, i) => i !== position))} aria-label="Remove custom color" key={`custom-${position}`}><span>Custom</span><b>×</b></button> : <button type="button" className="palette-chip" style={{ backgroundColor: colorOptions[index].hex }} onClick={() => removeFromPalette(index)} aria-label={`Remove ${colorOptions[index].name}`} key={`${colorOptions[index].name}-${position}`}><span>{colorOptions[index].name}</span><b>×</b></button>)}</div><button className="palette-custom" type="button" onClick={() => setPalette((current) => [...current, -1])}>+ Add custom color</button></div><a className="button light" href="#contact">Talk about color <span>↗</span></a></div><div className="swatches"><div className="swatch-heading"><span>Palette study / click a color</span><i>temperature · value · contrast</i></div>{colorOptions.map((color, i) => <button type="button" className={`swatch s${i} ${activeColor === i ? 'is-active' : ''}`} style={{ backgroundColor: color.hex }} onClick={() => setActiveColor(i)} aria-label={`Explore ${color.name}`} key={color.name}><span>{color.name}</span></button>)}</div></section>

        <BeforeAfterSlider />
    </>}
    <section className="mural">
      <MuralBackground />
      <div className="section-label">Murals + custom art</div><h2>WALLS DON’T HAVE<br />TO STAY <i>WALLS.</i></h2><p>Custom murals, hand-painted graphics, decorative motifs and site-specific artwork for homes, restaurants, hospitality spaces and creative businesses.</p><a className="button light" href="#contact">Explore murals <span>↗</span></a>
    </section>

        <div className="exterior-gallery quiet-exterior-gallery">
          <div className="gallery-grid">
            <div className="gallery-main">
              <img
                src="/images/upstate-exterior-repaint.png"
                alt="Cream upstate home with olive shutters and a covered porch"
              />
            </div>
            <div>
              <img
                src="/images/upstate-exterior-angle.png"
                alt="Side angle of the same upstate home and porch"
              />
            </div>
          </div>
          <div className="gallery-caption">
            <p>HUDSON VALLEY / EXTERIOR PAINTING / ARCHIVE STUDY</p>
            <h3>Quiet on the outside</h3>
          </div>
        </div>
        <div className="exterior-gallery exterior-gallery-second">
          <div className="gallery-grid">
            <div className="gallery-main">
              <img
                src="/images/rhinebeck-victorian-exterior.png"
                alt="Restored Victorian village home painted blue-green with cream trim and a terracotta door"
              />
            </div>
          </div>
          <div className="gallery-caption">
            <p>HUDSON VALLEY / EXTERIOR PAINTING / COLOR STUDY</p>
            <h3>Color with a little history</h3>
          </div>
        </div>
        <BeforeAfterSlider
          label="Mural process / finished detail"
          title={<>FROM FIRST BRUSHSTROKE <i>TO FULL COLOR.</i></>}
          intro="Drag the divider to compare the mural installation in progress with the finished hand-painted storefront."
          beforeSrc="/images/cat-mural-process-left.png"
          beforeAlt="Painter installing the hand-painted cat mural from a scaffold"
          afterSrc="/images/upstate-exterior-farmhouse.png"
          afterAlt="Finished hand-painted cat mural on a Hudson Valley storefront"
          beforeLabel="01 / Installation in progress"
          afterLabel="02 / Installed mural"
          rangeId="cat-mural-range"
        />
        <a className="button mural-process-cta" href="#contact">Talk about a mural <span aria-hidden="true">&#8599;</span></a>
        <div className="mural-detail-grid">
          <figure>
            <img src="/images/cat-mural-detail-black-cat.png" alt="Finished black-and-white cartoon cat detail from the storefront mural" />
            <figcaption>Finished detail / black cat study</figcaption>
          </figure>
          <figure>
            <img src="/images/cat-mural-process-tools.png" alt="Mural painting tools and a partially finished cartoon-cat mural" />
            <figcaption>Process detail / tools + texture</figcaption>
          </figure>
        </div>
      </section>
    <section className="process section-pad"><div className="process-section-logo" aria-label="Hudson Valley Paintworks"><span>HUDSON VALLEY</span>PAINTWORKS</div><div className="process-title">OUR PROCESS</div><p className="process-intro">We take the time to understand what you want to live with—and make something you can feel proud of. As artists, we care about the details, the final result, and working with people who are aesthetically minded.</p><ProcessCarousel /><h2>HOW IT <i>WORKS.</i></h2><div className="process-grid">{['Tell me about the project','On-site consultation','Color + scope','Preparation','Painting / installation','Final walkthrough'].map((x, i) => <div className="process-step" key={x}><span>0{i + 1}</span><strong>{x}</strong></div>)}</div><a className="button process-cta" href="#contact">Start a project <span aria-hidden="true">&#8599;</span></a></section>

      <section className="services section-pad" id="services">
        <div className="services-heading">
          <div className="services-kicker">WHAT WE DO</div>
          <h2>FROM WHITE WALLS<br /><i>TO WEIRD</i> IDEAS.</h2>
        </div>
        <ServicesShowcase />
        <div className="services-grid">
          <h2>
            FROM WHITE WALLS
            <br />
            <i>TO WEIRD</i>
            <br />
            IDEAS.
          </h2>
          <div className="service-list">
            {services.map((s, i) => (
              <div className="service-row" key={s}>
                <span>0{i + 1}</span>
                <strong>{s}</strong>
                <b>↗</b>
              </div>
            ))}
          </div>
        </div>
      </section>
    <div className="services-transition">
      <img
        src="/images/services-transition-mural.png"
        alt="Abstract hand-painted wall mural in warm pink, umber, ochre, and navy tones"
      />
    </div>
    <section className="contact" id="contact"><div><div className="section-label">05 / Let&apos;s make a plan</div><h2>MAKE THE<br /><i>SPACE FEEL</i><br />RIGHT.</h2><p>Tell us a little about your project. Project photos are welcome.</p></div><form onSubmit={submit}>{sent ? <div className="thanks"><span>✳</span><h3>Thank you.</h3><p>Your note is in. We&apos;ll be in touch soon.</p></div> : <><label>Name<input required name="name" /></label><label>Email<input required type="email" name="email" /></label><label>Tell us about the project<textarea required name="message" rows={3} /></label><label className="photo-upload-label">Project photos (optional)<input type="file" name="photos" accept="image/jpeg,image/png,image/webp" multiple /><small>Attach up to 3 photos: JPG, PNG, or WebP only. Maximum 4 MB per photo and 10 MB total. Please do not upload documents or sensitive personal information.</small></label><input className="form-trap" tabIndex={-1} autoComplete="off" name="website" aria-hidden="true" /><button className="button light" type="submit" disabled={sending}>{sending ? 'Sending...' : <>Send inquiry <span>↗</span></>}</button>{formError && <p className="form-error" role="alert">{formError}</p>}</>}</form></section>

    <footer><a className="logo" href="#top"><span className="logo-region">HUDSON VALLEY</span> PAINTWORKS<span>FINE PAINTING & DESIGN</span></a><p>Kingston · Woodstock · Saugerties · Rhinebeck<br />Red Hook · New Paltz · Hudson Valley</p><p><a href="tel:+15188474071">Call for a free estimate<br />1 518 847 4071 ↗</a><br />© 2026 Hudson Valley Paintworks<br /><a href="#contact">Send an inquiry ↗</a></p></footer>
    <a className="sticky-cta" href="tel:+15188474071">Call for a free estimate <span>↗</span></a>
  </main>
}

/*
      <section className="color-resources">
        <div className="section-label">Color / Explore further</div>
        <h2>
          KEEP
          <br />
          <i>LOOKING.</i>
        </h2>
        <p>
          Need paint brand inspiration? Use these official color visualizers to explore palettes before bringing your ideas to Hardy Paintworks.
        </p>
        <div className="resource-links">
          <a href="https://www.sherwin-williams.com/homeowners/inspiration/color-selection-tools" target="_blank" rel="noreferrer">
            <span>01</span>
            <strong>Sherwin-Williams ColorSnap</strong>
            <b>↗</b>
          </a>
          <a href="https://www.benjaminmoore.com/en-us/color-portfolio-paint-matching-app" target="_blank" rel="noreferrer">
            <span>02</span>
            <strong>Benjamin Moore Color Portfolio</strong>
            <b>↗</b>
          </a>
          <a href="https://www.behr.com/pro/colors/paint/visualizer" target="_blank" rel="noreferrer">
            <span>03</span>
            <strong>Behr Color Visualizer</strong>
            <b>↗</b>
          </a>
          <a href="https://www.ppgpaints.com/color/color-tools/visualizer" target="_blank" rel="noreferrer">
            <span>04</span>
            <strong>PPG Color Visualizer</strong>
            <b>↗</b>
          </a>
        </div>
      </section>

      <section className="color" id="color">
        <div className="color-copy">
          <div className="section-label">Color / Consultation + design</div>
          <h2>
            COLOR IS PART
            <br />
            OF THE <i>ARCHITECTURE.</i>
          </h2>
          <p>
            Choosing paint is not just choosing a swatch. Color changes the weight, rhythm, temperature, and atmosphere of a room.
          </p>
          <p>
            We develop palettes that respond to architecture, natural light, millwork, and the way rooms connect to one another.
          </p>

          <div className="color-lesson">
            <span className="lesson-kicker">Palette Study / Starting point</span>
            <strong>{colorOptions[activeColor].name}</strong>
            <p>{colorOptions[activeColor].note}</p>
            <div className="color-tools">
              <label>
                Explore Hex
                <input
                  aria-label="Choose a custom color"
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                />
              </label>
              <span>{customColor.toUpperCase()}</span>
            </div>
            <button
              className="palette-add"
              type="button"
              onClick={() => addToPalette(activeColor)}
            >
              + Add {colorOptions[activeColor].name} to palette
            </button>
          </div>

          <div className="palette-builder">
            <span className="lesson-kicker">Your active palette / click × to remove</span>
            <div className="palette-row">
              {palette.map((index, position) =>
                index === -1 ? (
                  <button
                    type="button"
                    className="palette-chip"
                    style={{ backgroundColor: customColor }}
                    onClick={() => setPalette((current) => current.filter((_, i) => i !== position))}
                    aria-label="Remove custom color"
                    key={`custom-${position}`}
                  >
                    <span>Custom</span>
                    <b>×</b>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="palette-chip"
                    style={{ backgroundColor: colorOptions[index].hex }}
                    onClick={() => removeFromPalette(index)}
                    aria-label={`Remove ${colorOptions[index].name}`}
                    key={`${colorOptions[index].name}-${position}`}
                  >
                    <span>{colorOptions[index].name}</span>
                    <b>×</b>
                  </button>
                )
              )}
            </div>
            <div className="palette-actions">
              <button
                className="palette-custom"
                type="button"
                onClick={() => setPalette((current) => [...current, -1])}
              >
                + Add custom color
              </button>
              <button
                className="button light palette-inquire-btn"
                type="button"
                onClick={attachPaletteToMessage}
              >
                Inquire with this palette <span>↓</span>
              </button>
            </div>
          </div>
        </div>

        <div className="swatches">
          <div className="swatch-heading">
            <span>Studio Swatches / Select to examine</span>
            <i>temperature · value · contrast</i>
          </div>
          {colorOptions.map((color, i) => (
            <button
              type="button"
              className={`swatch s${i} ${activeColor === i ? 'is-active' : ''}`}
              style={{ backgroundColor: color.hex }}
              onClick={() => setActiveColor(i)}
              aria-label={`Explore ${color.name}`}
              key={color.name}
            >
              <span>{color.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mural">
        <MuralBackground />
        <div className="section-label">Murals + custom art</div>
        <h2>
          WALLS DON’T HAVE
          <br />
          TO STAY <i>WALLS.</i>
        </h2>
        <p>
          Custom murals, hand-painted graphics, decorative motifs, and site-specific artwork for homes, restaurants, hospitality spaces, and creative studios.
        </p>
        <a className="button light" href="#contact">
          Explore murals <span>↗</span>
        </a>
      </section>

      <section className="process section-pad">
        <div className="section-label">03 / Our process</div>
        <h2>
          HOW IT <i>WORKS.</i>
        </h2>
        <ProcessCarousel />
        <div className="process-grid">
          {[
            'Tell us about the project',
            'On-site consultation',
            'Color + architectural scope',
            'Surface preparation',
            'Painting / installation',
            'Final walkthrough',
          ].map((x, i) => (
            <div className="process-step" key={x}>
              <span>0{i + 1}</span>
              <strong>{x}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div>
          <div className="section-label">04 / Let’s make a plan</div>
          <h2>
            MAKE THE
            <br />
            <i>SPACE FEEL</i>
            <br />
            RIGHT.
          </h2>
          <p>
            Tell us about your home, commercial space, or project idea. We respond within 24 hours.
          </p>
          <a className="contact-phone" href="tel:+15188474071">
            1 518 847 4071 ↗
          </a>
        </div>

        <form onSubmit={submit}>
          {sent ? (
            <div className="thanks">
              <span>✳</span>
              <h3>Thank you.</h3>
              <p>Your note is in. We’ll be in touch soon.</p>
            </div>
          ) : (
            <>
              <div className="form-grid">
                <label>
                  Name *
                  <input required name="name" placeholder="Philip or Jane Smith" />
                </label>
                <label>
                  Email *
                  <input required type="email" name="email" placeholder="jane@example.com" />
                </label>
              </div>

              <div className="form-grid">
                <label>
                  Location
                  <select name="location" defaultValue="Kingston">
                    <option value="Kingston">Kingston</option>
                    <option value="Woodstock">Woodstock</option>
                    <option value="Rhinebeck">Rhinebeck</option>
                    <option value="Saugerties">Saugerties</option>
                    <option value="Red Hook">Red Hook</option>
                    <option value="New Paltz">New Paltz</option>
                    <option value="Beacon / Hudson">Beacon / Hudson</option>
                    <option value="Other Hudson Valley">Other Hudson Valley</option>
                  </select>
                </label>
                <label>
                  Service of interest
                  <select name="service" defaultValue="Interior painting">
                    <option value="Interior painting">Interior painting</option>
                    <option value="Exterior painting">Exterior painting</option>
                    <option value="Murals + custom art">Murals + custom art</option>
                    <option value="Cabinet refinishing">Cabinet refinishing</option>
                    <option value="Decorative finishes">Decorative finishes</option>
                    <option value="Color consultation">Color consultation</option>
                  </select>
                </label>
              </div>

              <label>
                Tell us about the project *
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Surface type, number of rooms, exterior scope, ideal timing..."
                  value={projectMessage}
                  onChange={(e) => setProjectMessage(e.target.value)}
                />
              </label>

              <label className="photo-upload-label">
                Project photos (optional)
                <input type="file" name="photos" accept="image/jpeg,image/png,image/webp" multiple />
                <small>Attach up to 3 photos: JPG, PNG, or WebP only. Maximum 4 MB per photo and 10 MB total. Please do not upload documents or sensitive personal information.</small>
              </label>

              <input
                className="form-trap"
                tabIndex={-1}
                autoComplete="off"
                name="website"
                aria-hidden="true"
              />

              <button className="button light" type="submit" disabled={sending}>
                {sending ? 'Sending…' : <>Send inquiry <span>↗</span></>}
              </button>

              {formError && (
                <div className="form-error-box">
                  <p className="form-error" role="alert">
                    {formError}
                  </p>
                </div>
              )}
            </>
          )}
        </form>
      </section>

      <footer>
        <a className="logo" href="#top">
          HARDY PAINTWORKS
          <span>FINE PAINTING & DESIGN</span>
        </a>
        <p>
          Kingston · Woodstock · Saugerties · Rhinebeck
          <br />
          Red Hook · New Paltz · Hudson Valley
        </p>
        <p>
          <a href="tel:+15188474071">
            Call for a free estimate
            <br />
            1 518 847 4071 ↗
          </a>
          <br />
          © 2026 Hudson Valley Paintworks
          <br />
          <a href="#contact">Send an inquiry ↗</a>
        </p>
      </footer>

      <a className="sticky-cta" href="tel:+15188474071">
        Call for a free estimate <span>↗</span>
      </a>
    </main>
  )
  }
*/
