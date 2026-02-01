import { motion } from 'framer-motion'
import { useEffect, useRef, useState, useMemo } from 'react'

interface AnimatedTextProps {
  text?: string
  delay?: number
  className?: string
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  threshold?: number
  rootMargin?: string
  animationFrom?: Record<string, any>
  animationTo?: Record<string, any>[]
  easing?: (t: number) => number
  onAnimationComplete?: () => void
  stepDuration?: number
  startImmediately?: boolean
}

const buildKeyframes = (from: Record<string, any>, steps: Record<string, any>[]) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))])

  const keyframes: Record<string, any[]> = {}
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])]
  })
  return keyframes
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  startImmediately = false
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('')
  const [inView, setInView] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const completionCallbackRef = useRef<(() => void) | undefined>(onAnimationComplete)
  const hasCalledComplete = useRef(false)

  useEffect(() => {
    console.log(`[AnimatedText] useEffect triggered - startImmediately: ${startImmediately}, shouldAnimate: ${shouldAnimate}`)

    if (observerRef.current) {
      console.log(`[AnimatedText] Cleaning up existing IntersectionObserver`)
      observerRef.current.disconnect()
      observerRef.current = null
    }

    if (startImmediately) {
      console.log(`[AnimatedText] ✅ startImmediately is TRUE - Starting animation in 100ms`)
      const timer = setTimeout(() => {
        console.log(`[AnimatedText] 🚀 Starting animation NOW (startImmediately=true)`)
        setInView(true)
        setShouldAnimate(true)
      }, 100)
      return () => {
        console.log(`[AnimatedText] Cleaning up startImmediately timer`)
        clearTimeout(timer)
      }
    }
    if (!startImmediately) {
      console.log(`[AnimatedText] ⏳ startImmediately is FALSE - Setting up IntersectionObserver (waiting for startImmediately to become true)`)
      const timer = setTimeout(() => {
        if (!ref.current || startImmediately) {
          console.log(`[AnimatedText] Skipping observer setup - ref.current: ${!!ref.current}, startImmediately: ${startImmediately}`)
          return
        }
        console.log(`[AnimatedText] Creating IntersectionObserver`)
        const observer = new IntersectionObserver(
          ([entry]) => {
            console.log(`[AnimatedText] IntersectionObserver triggered - isIntersecting: ${entry.isIntersecting}, startImmediately: ${startImmediately}`)
    
    
            if (entry.isIntersecting && !startImmediately) {
              console.log(`[AnimatedText] ⚠️ WARNING: IntersectionObserver trying to start animation, but startImmediately is false - IGNORING`)
      
              if (ref.current) {
                observer.unobserve(ref.current)
              }
            }
          },
          { threshold, rootMargin }
        )
        observerRef.current = observer
        if (ref.current) {
          observer.observe(ref.current)
          console.log(`[AnimatedText] IntersectionObserver observing element`)
        }
      }, 100)

      return () => {
        console.log(`[AnimatedText] Cleaning up IntersectionObserver setup timer`)
        clearTimeout(timer)
        if (observerRef.current) {
          observerRef.current.disconnect()
          observerRef.current = null
        }
      }
    }
  }, [threshold, rootMargin, startImmediately])

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { opacity: 0, y: -10 } : { opacity: 0, y: 10 },
    [direction]
  )

  const defaultTo = useMemo(
    () => [
      {
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { opacity: 1, y: 0 }
    ],
    [direction]
  )

  const fromSnapshot = animationFrom ?? defaultFrom
  const toSnapshots = animationTo ?? defaultTo

  const stepCount = toSnapshots.length + 1
  const totalDuration = stepDuration * (stepCount - 1)
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)))


  useEffect(() => {
    completionCallbackRef.current = onAnimationComplete
    hasCalledComplete.current = false
  }, [onAnimationComplete])


  useEffect(() => {
    if (shouldAnimate) {
      hasCalledComplete.current = false
    }
  }, [shouldAnimate])


  useEffect(() => {
    if (!shouldAnimate || !completionCallbackRef.current || hasCalledComplete.current) return

    const lastElementIndex = elements.length - 1
    const lastElementDelay = (lastElementIndex * delay) / 1000
    const totalTime = (lastElementDelay + totalDuration) * 1000 + 200

    const fallbackTimer = setTimeout(() => {
      if (completionCallbackRef.current && !hasCalledComplete.current) {
        hasCalledComplete.current = true
        completionCallbackRef.current()
      }
    }, totalTime)

    return () => clearTimeout(fallbackTimer)
  }, [shouldAnimate, elements.length, delay, totalDuration])

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots)

        const spanTransition: any = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000
        }
        spanTransition.ease = easing

        const handleComplete = () => {
          if (index === elements.length - 1 && completionCallbackRef.current && !hasCalledComplete.current) {
            console.log(`[AnimatedText] ✅ Last element (index ${index}) animation completed, calling completion callback`)
            hasCalledComplete.current = true

            setTimeout(() => {
              if (completionCallbackRef.current) {
                console.log(`[AnimatedText] 📞 Executing completion callback`)
                completionCallbackRef.current()
              }
            }, 50)
          }
        }

        return (
          <motion.span
            className="inline-block will-change-[transform,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={shouldAnimate ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? handleComplete : undefined}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        )
      })}
    </p>
  )
}

export default AnimatedText
