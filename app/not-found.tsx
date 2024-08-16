import React from 'react';
import clsx from 'clsx';
import { Wrapper } from '@/shared/components/Wrapper';
import Link from 'next/link';

const NotFoundPage: React.FC = () => {
  return (
    <Wrapper>
      <section className={clsx('page_404 py-10 bg-white font-serif')}>
        <div className={clsx('container mx-auto')}>
          <div className={clsx('flex justify-center items-center')}>
            <div className={clsx('text-center')}>
              <div
                className={clsx(
                  'four_zero_four_bg flex justify-center items-center'
                )}
              >
                <h1 className={clsx('text-8xl font-bold')}>404</h1>
              </div>
              <div className={clsx('contant_box_404 mt-[-3rem]')}>
                <h3 className={clsx('text-4xl font-semibold mb-4')}>
                  Look like you're lost
                </h3>
                <p className={clsx('text-lg mb-6')}>
                  The page you are looking for is not available!
                              </p>
                              <Link href="/"  className={clsx(
                    'link_404 text-white bg-green-600 py-2 px-4 rounded hover:bg-green-700'
                  )}>Go to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default NotFoundPage;
