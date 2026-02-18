
import React from 'react';

// Added React.FC to SkeletonBase to resolve TypeScript error when using the 'key' prop in list mapping
export const SkeletonBase: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg ${className}`}></div>
);

export const ServiceCardSkeleton = () => (
  <div className="rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-6 md:p-10 h-full bg-white dark:bg-slate-900/60">
    <div className="flex items-start justify-between mb-8">
      <div className="space-y-3 flex-1">
        <SkeletonBase className="h-8 w-3/4" />
        <SkeletonBase className="h-4 w-1/2" />
      </div>
      <SkeletonBase className="w-14 h-14 rounded-2xl shrink-0" />
    </div>
    <div className="space-y-4 mb-8">
      <SkeletonBase className="h-24 w-full rounded-[2rem]" />
      <SkeletonBase className="h-12 w-full rounded-2xl" />
      <SkeletonBase className="h-12 w-full rounded-2xl" />
    </div>
    <SkeletonBase className="h-16 w-full rounded-2xl" />
  </div>
);

export const TestimonialSkeleton = () => (
  <div className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 bg-white dark:bg-slate-900/60 h-full">
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-4">
        <SkeletonBase className="w-12 h-12 rounded-2xl" />
        <div className="space-y-2">
          <SkeletonBase className="h-4 w-20" />
          <SkeletonBase className="h-3 w-16" />
        </div>
      </div>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <SkeletonBase key={i} className="w-3 h-3 rounded-full" />
        ))}
      </div>
    </div>
    <div className="space-y-3">
      <SkeletonBase className="h-4 w-full" />
      <SkeletonBase className="h-4 w-5/6" />
      <SkeletonBase className="h-4 w-2/3" />
    </div>
    <div className="mt-6 pt-6 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
      <SkeletonBase className="h-3 w-12" />
      <SkeletonBase className="h-5 w-24 rounded-full" />
    </div>
  </div>
);
