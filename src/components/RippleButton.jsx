"use client"

import { forwardRef, useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

/**
 * RippleButton — a Material-Design-style ripple interaction, adapted from the
 * motion-material-design-ripple component. Renders a plain <motion.button> so
 * it can carry any existing className (e.g. "btn-primary") and still show a
 * ripple on click/tap/keyboard activation. Visual styling (color, size,
 * radius) stays with the className passed in; this component only adds the
 * ripple layer and the pointer/keyboard handlers that drive it.
 */
const RippleButton = forwardRef(function RippleButton(
  { className = '', onClick, children, rippleColor = 'rgba(255,255,255,0.45)', ...rest },
  forwardedRef
) {
  const [ripples, setRipples] = useState([])
  const nextId = useRef(0)
  const localRef = useRef(null)

  const setRefs = useCallback(
    (node) => {
      localRef.current = node
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
    },
    [forwardedRef]
  )

  const addRipple = useCallback((clientX, clientY) => {
    const node = localRef.current
    if (!node) return
    const box = node.getBoundingClientRect()
    const x = clientX - box.left
    const y = clientY - box.top
    const farthestX = Math.max(x, box.width - x)
    const farthestY = Math.max(y, box.height - y)
    const size = Math.sqrt(farthestX * farthestX + farthestY * farthestY) * 2
    const id = ++nextId.current
    setRipples((current) => [...current, { id, x, y, size }])
  }, [])

  const popRipple = useCallback(() => {
    setRipples((current) => (current.length ? current.slice(0, current.length - 1) : current))
  }, [])

  const onPointerDown = useCallback(
    (event) => {
      if (event.isPrimary) addRipple(event.clientX, event.clientY)
    },
    [addRipple]
  )

  const onKeyDown = useCallback(
    (event) => {
      if (event.repeat) return
      if (event.key !== ' ' && event.key !== 'Enter') return
      const node = localRef.current
      if (!node) return
      const box = node.getBoundingClientRect()
      addRipple(box.left + box.width / 2, box.top + box.height / 2)
    },
    [addRipple]
  )

  const onKeyUp = useCallback(
    (event) => {
      if (event.key === ' ' || event.key === 'Enter') popRipple()
    },
    [popRipple]
  )

  return (
    <motion.button
      ref={setRefs}
      type="button"
      className={`ripple-button ${className}`}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={popRipple}
      onPointerCancel={popRipple}
      onPointerLeave={popRipple}
      onBlur={popRipple}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: 'linear' }}
      {...rest}
    >
      {children}
      <span className="ripple-container" aria-hidden="true">
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="ripple"
              style={{
                width: ripple.size,
                height: ripple.size,
                left: ripple.x - ripple.size / 2,
                top: ripple.y - ripple.size / 2,
                background: rippleColor
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>
      </span>
    </motion.button>
  )
})

export default RippleButton
