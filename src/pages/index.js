// src/pages/index.js
import Head from 'next/head';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import HowItWorks from '@/components/HowItWorks';
import Trust from '@/components/Trust';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>HunarConnect - Your Skill, Your Profile, Your Price</title>
        <meta
          name="description"
          content="The Digital Identity for India's Skilled Workforce."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <main>
  <Hero />
  <Problem />
  <Solution />
  <HowItWorks />
  <Trust />
  <Footer />

</main>
    </>
  );
}