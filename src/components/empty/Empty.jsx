import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
const Empty = () => {
  return (
    <div>
      <Player
                        autoplay
                        loop
                        src="images/empty.json"
                        style={{ height: '150px', width: '150px' }}
                        >
                    </Player>
    </div>
  )
}

export default Empty
