import { useState } from 'react';
import { BACKGROUND_VIDEO_SRC } from '../../config';

// delay: radar süpürgəsi nöqtənin bucağından keçən anda nöqtə yanır (süpürgə dövrü 7 san).
const BLIPS = [
  { x: 62, y: 30, delay: 0.6 },
  { x: 78, y: 56, delay: 2.0 },
  { x: 55, y: 82, delay: 3.3 },
  { x: 40, y: 70, delay: 4.0 },
  { x: 30, y: 38, delay: 5.85 },
];

const TRACERS = [
  { top: 18, delay: 0, duration: 9 },
  { top: 41, delay: 3, duration: 11 },
  { top: 67, delay: 6, duration: 8 },
  { top: 84, delay: 1.5, duration: 12 },
];

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Tam ekran fon. Əsasda CSS ilə çəkilmiş radar animasiyası var.
 * Video faylı mövcuddursa və yüklənibsə, onun üstündə yumşaq şəkildə görünür.
 */
export default function BackgroundScene() {
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [motionAllowed] = useState(() => !prefersReducedMotion());

  const showVideo = motionAllowed && !videoFailed;

  return (
    <div className="scene" aria-hidden="true">
      <div className="scene-grid" />

      <div className="scene-radar">
        <div className="scene-sweep" />
        {BLIPS.map((blip) => (
          <span
            key={`${blip.x}-${blip.y}`}
            className="blip"
            style={{ left: `${blip.x}%`, top: `${blip.y}%`, animationDelay: `${blip.delay}s` }}
          />
        ))}
      </div>

      <div className="scene-tracers">
        {TRACERS.map((tracer) => (
          <i
            key={tracer.top}
            style={{ top: `${tracer.top}%`, animationDelay: `${tracer.delay}s`, animationDuration: `${tracer.duration}s` }}
          />
        ))}
      </div>

      {showVideo && (
        <video
          className={`scene-video${videoReady ? ' is-ready' : ''}`}
          src={BACKGROUND_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
        />
      )}

      <div className="scene-shade" />
    </div>
  );
}