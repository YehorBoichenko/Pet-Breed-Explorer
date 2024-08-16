import clsx from 'clsx';
import React from 'react';
import Image from 'next/image';
interface Props {
  imageUrl: string;
  title: string;
  isDog: boolean;
  className?: string;
  temperament: string;
  origin: string;
  name: string;
}
export const Card: React.FC<Props> = ({
  title,
  imageUrl,
  isDog,
  className,
  origin,
  temperament,
  name,
}) => {
  return (
<div
  className={clsx(
    className,
    'relative rounded-3xl ring-1 cursor-pointer ring-gray-200 min-h-[500px] bg-gray-800',
    isDog ? 'text-secondary' : 'text-primary'
  )}
>
      {origin && (
        <span className="absolute top-4 right-3 py-1 px-2 bg-[rgb(7,65,115)] text-white rounded-2xl">
          {origin}
        </span>
      )}
      <Image
        className="h-[368px] w-full object-cover rounded-lg mb-4"
        src={imageUrl}
        width={0}
        height={0}
        sizes="100vw"
        alt={title || ''}
                placeholder="blur"
    blurDataURL={isDog ? "/images/doggie.jpg" : "/images/cat.jpg"}

      />
      <div className="p-3">
        <p className="text-center font-bold text-xl mb-2">{name}</p>
        <p className="text-center italic">{temperament}</p>
      </div>
    </div>
  );
};
