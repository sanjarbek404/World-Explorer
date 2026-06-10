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
      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 text-blue-600 dark:text-blue-400 font-medium rounded-xl transition-colors focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/50"
      aria-label="Ulashish"
      title="Ulashish"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-500" />
          <span className="text-green-500">Nusxalandi</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          <span>Ulashish</span>
        </>
      )}
    </button>
  );
}
