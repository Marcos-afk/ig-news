import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { createClient } from '../../services/prismic';
import styles from './styles.module.scss';
import { PostsProps } from './types/PostsProps';

const Posts = ({ posts, messageError }: PostsProps) => {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>
      {messageError ? (
        <h1>{messageError}</h1>
      ) : (
        <main className={styles.container}>
          <div className={styles.posts}>
            {posts.map((post) => (
              <Link href={`/posts/preview/${post.slug}`} key={post.slug}>
                <a>
                  <time>{post.updatedAt}</time>
                  <strong>{post.title}</strong>
                  <p>{post.excerpt}</p>
                </a>
              </Link>
            ))}
          </div>
        </main>
      )}
    </>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient();
  let posts = [];
  let messageError = '';

  try {
    const response = await client.getAllByType('publication', {
      pageSize: 100,
    });

    posts = response.map((post) => {
      return {
        slug: post.uid,
        title: post.data.title,
        excerpt: post.data.content.find((content) => content.type === 'paragraph')?.text ?? '',
        updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      };
    });
  } catch (error) {
    messageError = error.message;
  }

  return {
    props: {
      posts,
      messageError,
    },
    revalidate: 60 * 60 * 24, // 24 horas,
  };
};
