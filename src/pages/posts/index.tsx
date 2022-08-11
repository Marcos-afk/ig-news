import Head from 'next/head';
import styles from './styles.module.scss';

const Posts = () => {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time> 10 de Janeiro de 2022</time>
            <strong>React 18 novidades</strong>
            <p>A nova atualização do React.js trouxe inúmeras mudanças</p>
          </a>
          <a href="#">
            <time> 10 de Janeiro de 2022</time>
            <strong>React 18 novidades</strong>
            <p>A nova atualização do React.js trouxe inúmeras mudanças</p>
          </a>
          <a href="#">
            <time> 10 de Janeiro de 2022</time>
            <strong>React 18 novidades</strong>
            <p>A nova atualização do React.js trouxe inúmeras mudanças</p>
          </a>
        </div>
      </main>
    </>
  );
};

export default Posts;
