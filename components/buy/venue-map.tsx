// // components/VenueMap.tsx
// import { useState, useEffect } from 'react'
// import { createClient } from '@/utils/supabase/client'
// import styles from './VenueMap.module.css'

// interface Seat {
//   id: string
//   section_id: string
//   row: string
//   number: string
//   seat_id: string
//   status: 'available' | 'reserved' | 'sold' | 'blocked'
// }

// interface Section {
//   id: string
//   name: string
//   section_id: string
//   price: number
//   color: string
// }

// interface VenueMapProps {
//   eventId: string
//   onSeatSelect: (seat: Seat) => void
// }

// export default function VenueMap({ eventId, onSeatSelect }: VenueMapProps) {
//   const [svgMap, setSvgMap] = useState<string>('')
//   const [sections, setSections] = useState<Section[]>([])
//   const [seats, setSeats] = useState<Seat[]>([])
//   const [selectedSeats, setSelectedSeats] = useState<string[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function fetchVenueData() {
//       const supabase = createClient()
//       try {
//         setLoading(true)

//         // Primero obtenemos los datos del evento para saber el venue_id
//         const { data: eventData, error: eventError } = await supabase
//           .from('events')
//           .select('venue_id')
//           .eq('id', eventId)
//           .single()

//         if (eventError) throw eventError

//         // Obtenemos el mapa SVG del recinto
//         const { data: venueData, error: venueError } = await supabase
//           .from('venues')
//           .select('svg_map')
//           .eq('id', eventData.venue_id)
//           .single()

//         if (venueError) throw venueError

//         // Obtenemos las secciones del recinto
//         const { data: sectionsData, error: sectionsError } = await supabase
//           .from('sections')
//           .select('*')
//           .eq('venue_id', eventData.venue_id)

//         if (sectionsError) throw sectionsError

//         // Obtenemos los asientos y su estado para este evento específico
//         const { data: seatsData, error: seatsError } = await supabase
//           .from('seats')
//           .select(
//             `
//             id,
//             section_id,
//             row,
//             number,
//             seat_id,
//             event_seats!inner(status)
//           `
//           )
//           .eq('event_seats.event_id', eventId)

//         if (seatsError) throw seatsError

//         // Transformamos los datos a la estructura que necesitamos
//         const processedSeats = seatsData.map((seat) => ({
//           ...seat,
//           status: seat.event_seats[0]?.status || 'available'
//         }))

//         setSvgMap(venueData.svg_map)
//         setSections(sectionsData)
//         setSeats(processedSeats)
//       } catch (error) {
//         console.error('Error fetching venue data:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchVenueData()
//   }, [eventId])

//   useEffect(() => {
//     if (!svgMap) return

//     // Una vez que el SVG está cargado, necesitamos hacerlo interactivo
//     const container = document.getElementById('venue-map-container')
//     if (container) {
//       container.innerHTML = svgMap

//       // Colorear las secciones según sus precios/categorías
//       sections.forEach((section) => {
//         const sectionEl = document.getElementById(section.section_id)
//         if (sectionEl) {
//           sectionEl.style.fill = section.color
//           sectionEl.dataset.price = section.price.toString()
//           sectionEl.dataset.name = section.name
//         }
//       })

//       // Configurar los asientos según su estado
//       seats.forEach((seat) => {
//         const seatEl = document.getElementById(seat.seat_id)
//         if (seatEl) {
//           seatEl.classList.add(styles[seat.status])
//           seatEl.dataset.id = seat.id
//           seatEl.dataset.row = seat.row
//           seatEl.dataset.number = seat.number
//           seatEl.dataset.status = seat.status

//           // Solo hacemos clic en asientos disponibles
//           if (seat.status === 'available') {
//             seatEl.addEventListener('click', () => handleSeatClick(seat))
//           }
//         }
//       })
//     }
//   }, [svgMap, sections, seats])

//   const handleSeatClick = (seat: Seat) => {
//     if (seat.status !== 'available') return

//     // Toggle selección
//     setSelectedSeats((prev) => {
//       const isSelected = prev.includes(seat.id)
//       if (isSelected) {
//         return prev.filter((id) => id !== seat.id)
//       } else {
//         return [...prev, seat.id]
//       }
//     })

//     // También actualizamos el estilo visual
//     const seatEl = document.getElementById(seat.seat_id)
//     if (seatEl) {
//       seatEl.classList.toggle(styles.selected)
//     }

//     // Notificar al componente padre
//     onSeatSelect(seat)
//   }

//   if (loading) return <div>Cargando mapa del recinto...</div>

//   return (
//     <div className={styles.mapContainer}>
//       <div className={styles.legendContainer}>
//         {sections.map((section) => (
//           <div key={section.id} className={styles.legendItem}>
//             <div
//               className={styles.colorBox}
//               style={{ backgroundColor: section.color }}></div>
//             <div>
//               {section.name} - ${section.price}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className={styles.statusLegend}>
//         <div className={styles.legendItem}>
//           <div className={`${styles.seatSample} ${styles.available}`}></div>
//           <div>Disponible</div>
//         </div>
//         <div className={styles.legendItem}>
//           <div className={`${styles.seatSample} ${styles.selected}`}></div>
//           <div>Seleccionado</div>
//         </div>
//         <div className={styles.legendItem}>
//           <div className={`${styles.seatSample} ${styles.reserved}`}></div>
//           <div>Reservado</div>
//         </div>
//         <div className={styles.legendItem}>
//           <div className={`${styles.seatSample} ${styles.sold}`}></div>
//           <div>Vendido</div>
//         </div>
//       </div>

//       <div id='venue-map-container' className={styles.venueMap}></div>

//       {selectedSeats.length > 0 && (
//         <div className={styles.selectedSeatsInfo}>
//           <h3>Asientos seleccionados: {selectedSeats.length}</h3>
//           <ul>
//             {selectedSeats.map((seatId) => {
//               const seat = seats.find((s) => s.id === seatId)
//               const section = sections.find((s) => s.id === seat?.section_id)
//               return seat && section ? (
//                 <li key={seatId}>
//                   {section.name} - Fila {seat.row}, Asiento {seat.number} - $
//                   {section.price}
//                 </li>
//               ) : null
//             })}
//           </ul>
//           <div className={styles.total}>
//             Total: $
//             {selectedSeats.reduce((sum, seatId) => {
//               const seat = seats.find((s) => s.id === seatId)
//               const section = sections.find((s) => s.id === seat?.section_id)
//               return sum + (section?.price || 0)
//             }, 0)}
//           </div>
//           <button className={styles.checkoutButton}>
//             Continuar con la compra
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }
