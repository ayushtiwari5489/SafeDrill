import React, { useState } from "react";
import { 
  Play, CheckCircle2, Clock, ExternalLink, Bookmark, 
  Sparkles, Award, RotateCcw, AlertTriangle, ShieldCheck, 
  Tv, Volume2, Info, Eye
} from "lucide-react";
import { CourseVideo, VideoTimestamp } from "../types";
import confetti from "canvas-confetti";
import { playCorrectSound } from "../utils/audioEffects";

interface CourseVideoPlayerProps {
  videos: CourseVideo[];
  courseTitle: string;
  onScoreEarned?: (points: number) => void;
  onComplete?: () => void;
  alreadyCompleted?: boolean;
}

export const CourseVideoPlayer: React.FC<CourseVideoPlayerProps> = ({
  videos,
  courseTitle,
  onScoreEarned,
  onComplete,
  alreadyCompleted = false,
}) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string>(
    videos[0]?.id || ""
  );
  const [activeTimestampSeconds, setActiveTimestampSeconds] = useState<number>(0);
  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
  const [playerKey, setPlayerKey] = useState<number>(0);

  if (!videos || videos.length === 0) {
    return null;
  }

  const activeVideo =
    videos.find((v) => v.id === selectedVideoId) || videos[0];

  const handleSelectVideo = (video: CourseVideo) => {
    setSelectedVideoId(video.id);
    setActiveTimestampSeconds(0);
    setPlayerKey((k) => k + 1);
  };

  const handleJumpToTimestamp = (ts: VideoTimestamp) => {
    setActiveTimestampSeconds(ts.seconds);
    setPlayerKey((k) => k + 1);
    
    // Smooth scroll back to the top of the video player on mobile
    const playerEl = document.getElementById("course-video-embed-frame");
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const handleMarkWatched = (videoId: string) => {
    if (!watchedVideos.includes(videoId)) {
      setWatchedVideos((prev) => [...prev, videoId]);
      try {
        playCorrectSound();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // Fallback
      }
      if (onScoreEarned) {
        onScoreEarned(50);
      }
      if (onComplete) {
        onComplete();
      }
    }
  };

  const isCurrentWatched = watchedVideos.includes(activeVideo.id) || alreadyCompleted;

  // Construct YouTube nocookie embed URL
  const embedUrl = `https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?rel=0&modestbranding=1&autoplay=${
    activeTimestampSeconds > 0 ? 1 : 0
  }&start=${activeTimestampSeconds}`;

  const externalWatchUrl = `https://www.youtube.com/watch?v=${activeVideo.youtubeId}${
    activeTimestampSeconds > 0 ? `&t=${activeTimestampSeconds}s` : ""
  }`;

  return (
    <div
      id="course-video-player-component"
      className="rounded-2xl bg-slate-900 border border-slate-800 p-4 sm:p-6 shadow-xl space-y-5 text-white"
    >
      {/* Top Video Header & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1">
              <Tv className="w-3 h-3" /> Official YouTube Masterclass
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" /> {activeVideo.duration}
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            {activeVideo.title}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Verified organization: <span className="text-amber-400 font-semibold">{activeVideo.organization}</span>
          </p>
        </div>

        {/* Watch on YouTube & Mark Complete Controls */}
        <div className="flex items-center gap-2">
          <a
            href={externalWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            title="Open video in external tab on YouTube"
          >
            <ExternalLink className="w-3.5 h-3.5 text-red-400" />
            <span>Watch on YouTube</span>
          </a>

          <button
            onClick={() => handleMarkWatched(activeVideo.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isCurrentWatched
                ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/50"
                : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {isCurrentWatched ? "Watched ✓ (+50 XP)" : "Mark Watched (+50 XP)"}
          </button>
        </div>
      </div>

      {/* Multiple Video Selection Tabs */}
      {videos.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Bookmark className="w-3 h-3 text-amber-400" /> Video Playlist:
          </span>
          {videos.map((vid, idx) => {
            const isSelected = vid.id === activeVideo.id;
            const isWatched = watchedVideos.includes(vid.id);

            return (
              <button
                key={vid.id}
                onClick={() => handleSelectVideo(vid)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isSelected
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800"
                }`}
              >
                <Play className={`w-3 h-3 ${isSelected ? "fill-current" : ""}`} />
                <span>Video {idx + 1}: {vid.title.length > 28 ? vid.title.slice(0, 28) + "..." : vid.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isSelected ? "bg-slate-900/30 text-slate-950" : "bg-slate-900 text-slate-400"}`}>
                  {vid.duration}
                </span>
                {isWatched && <span className="text-emerald-400 text-[11px] font-bold">✓</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Responsive Video Player Iframe Container */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-slate-700/80 shadow-2xl">
        <iframe
          key={`${activeVideo.id}-${playerKey}-${activeTimestampSeconds}`}
          id="course-video-embed-frame"
          src={embedUrl}
          title={activeVideo.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />

        {/* Fallback Overlay for slow network / iframe restrictions */}
        <noscript>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-white p-4 text-center">
            <p className="text-sm font-bold mb-2">Watch on YouTube:</p>
            <a
              href={externalWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-red-600 rounded-xl font-bold text-xs flex items-center gap-1.5 text-white"
            >
              <Play className="w-4 h-4 fill-current" /> Play Video
            </a>
          </div>
        </noscript>
      </div>

      {/* Video Description & Learning Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-1">
        {/* Left 2 Cols: Description + Chapters */}
        <div className="lg:col-span-2 space-y-3">
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {activeVideo.description}
          </p>

          {/* Interactive Chapter / Timestamp Bookmarks */}
          {activeVideo.keyTimestamps && activeVideo.keyTimestamps.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-amber-400" /> Interactive Chapter Bookmarks (Tap to Jump):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeVideo.keyTimestamps.map((ts, idx) => {
                  const isActive = activeTimestampSeconds === ts.seconds;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleJumpToTimestamp(ts)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all text-xs group ${
                        isActive
                          ? "bg-amber-500/20 border-amber-500/60 text-amber-300 ring-1 ring-amber-500/40"
                          : "bg-slate-950 hover:bg-slate-800/90 border-slate-800 text-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-extrabold bg-slate-900 border border-slate-700 text-amber-400 group-hover:border-amber-400/50">
                          {ts.time}
                        </span>
                        <span className="font-semibold text-xs text-slate-300 group-hover:text-white">
                          {ts.label}
                        </span>
                      </div>
                      <Play className="w-3 h-3 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Instructor Observation Callout */}
        <div className="space-y-3">
          {activeVideo.instructorTip && (
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs space-y-1.5">
              <div className="font-black text-amber-400 flex items-center gap-1.5 uppercase text-[11px]">
                <Eye className="w-3.5 h-3.5" /> What to Watch For:
              </div>
              <p className="text-amber-200/90 leading-relaxed">
                {activeVideo.instructorTip}
              </p>
            </div>
          )}

          {activeVideo.learningObjectives && activeVideo.learningObjectives.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="font-black text-slate-300 uppercase text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Key Skills Demonstrated:
              </div>
              <ul className="space-y-1.5 text-slate-300">
                {activeVideo.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px]">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Step Navigation Bar */}
      {onComplete && (
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
          <span className="text-xs text-slate-400">
            Step 2 of 7 in the {courseTitle} curriculum.
          </span>

          <button
            onClick={() => {
              handleMarkWatched(activeVideo.id);
              onComplete();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20"
          >
            <span>Complete Video & Next: Protocol Guidelines</span>
            <span className="text-sm">→</span>
          </button>
        </div>
      )}
    </div>
  );
};
