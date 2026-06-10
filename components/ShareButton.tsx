'use client';

import { Share2, Link as LinkIcon, Check } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';

interface ShareButtonProps {
  countryName: string;
}

export default function ShareButton({ countryName }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: `${countryName} | WorldExplorer`,
      text: `${countryName} haqida qiziqarli ma'lumotlarni ko'ring!`,
      url: url,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled or error
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Nusxalashda xatolik yuz berdi:', err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className={clsx(
        "p-3.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/40 shadow-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 group",
        copied && "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
      )}
      aria-label="Ulashish"
      title="Ulashish"
    >
      {copied ? (
        <Check className="w-6 h-6 text-green-500 scale-110 transition-transform" />
      ) : (
        <Share2 className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
      )}
    </button>
  );
}
