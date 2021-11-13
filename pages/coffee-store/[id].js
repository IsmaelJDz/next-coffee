import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import cn from 'classnames';

import { fetchCoffeeStore } from '../../lib/coffe-stores';

import styles from '../../styles/coffee-store.module.css';

export async function getStaticProps(staticProps) {
  const coffeeStore = await fetchCoffeeStore();
  const params = staticProps.params;

  return {
    props: {
      coffeeStore: coffeeStore.find(coffeeStore => {
        return coffeeStore.id.toString() === params.id;
      }),
    },
  };
}

export async function getStaticPaths() {
  const coffeeStore = await fetchCoffeeStore();

  return {
    paths: coffeeStore.map(coffeeStore => {
      return {
        params: {
          id: coffeeStore.id.toString(),
        },
      };
    }),
    fallback: true,
  };
}

const CoffeeStore = ({ coffeeStore }) => {
  const { location, name, imgUrl } = coffeeStore;

  const router = useRouter();

  if (router.isFallback) {
    // isFallback is true when the page is loading
    return <div>Loading...</div>;
  }

  const handleUpVoteButton = () => {
    console.log('Upvoted');
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/' scroll={false}>
              <a>Back Home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}> {name} </h1>
          </div>
          <Image
            src={
              imgUrl ||
              'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'
            }
            alt={name}
            width={600}
            height={360}
            className={styles.storeImg}
          />
        </div>
        <div className={cn('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/places.svg'
              width='24'
              height='24'
              alt='icon'
            />
            <p className={styles.text}> {location.address} </p>
          </div>
          {location.neighbourhood && (
            <div className={styles.iconWrapper}>
              <Image
                src='/static/icons/nearMe.svg'
                width='24'
                height='24'
                alt='icon'
              />
              <p className={styles.text}>
                {' '}
                {location.neighbourhood}{' '}
              </p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/star.svg'
              width='24'
              height='24'
              alt='icon'
            />
            <p className={styles.text}> 1 </p>
          </div>

          <button
            className={styles.upvoteButton}
            onClick={handleUpVoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
