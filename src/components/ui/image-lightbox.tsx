"use client";

import { Dialog } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ImageLightboxProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function ImageLightbox({
  src,
  alt,
  width,
  height,
  priority,
  sizes,
  className,
}: ImageLightboxProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="block w-full cursor-zoom-in rounded-sm outline-none transition-opacity hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-label={`${alt} 확대 보기`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className={className}
        />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-black/80 transition-opacity duration-150",
            "data-ending-style:opacity-0 data-starting-style:opacity-0",
            "supports-backdrop-filter:backdrop-blur-sm",
          )}
        />
        <Dialog.Popup
          className={cn(
            "pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-3 outline-none sm:p-4",
            "transition duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
          )}
        >
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>
          <Dialog.Close
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                className="pointer-events-auto fixed top-4 right-4 z-10 size-12 text-white hover:bg-white/10 hover:text-white [&_svg:not([class*='size-'])]:size-7"
              />
            }
          >
            <XIcon aria-hidden="true" />
            <span className="sr-only">닫기</span>
          </Dialog.Close>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="100vw"
            className="pointer-events-auto h-auto max-h-full w-auto max-w-full object-contain"
            priority
          />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
