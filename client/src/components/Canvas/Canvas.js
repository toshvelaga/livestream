import React, { useEffect, createRef } from 'react'

const Canvas = ({ videoRef, width, height }) => {
  const canvasRef = createRef(null)

  useEffect(() => {
    if (canvasRef.current && videoRef.current) {
      const interval = setInterval(() => {
        const ctx = canvasRef.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, 250, 188)
      }, 60)
      return () => clearInterval(interval)
    }
  })

  return <canvas ref={canvasRef} width={width} height={height} />
}

export default Canvas
