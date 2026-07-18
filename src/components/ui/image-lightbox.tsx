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
            "fixed top-1/2 left-1/2 z-50 w-[min(96vw,90rem)] -translate-x-1/2 -translate-y-1/2 outline-none",
            "transition duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
          )}
        >
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>
          <Dialog.Close
            render={
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:bg-white/10 hover:text-white sm:-top-2 sm:-right-12"
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
            className="mx-auto h-auto max-h-[85vh] w-auto max-w-full object-contain"
            priority
          />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
