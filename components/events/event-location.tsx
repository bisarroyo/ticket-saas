// type Props = {
//   location: string
// }

import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'

export default function EventLocation() {
  const position = { lat: 53.54992, lng: 10.00678 }
  return (
    <div className='w-full h-auto rounded-b-xl overflow-hidden'>
      <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY!}>
        <Map defaultCenter={position} defaultZoom={10} mapId='DEMO_MAP_ID'>
          <AdvancedMarker position={position} />
        </Map>
      </APIProvider>
    </div>
  )
}
