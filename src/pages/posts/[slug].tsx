import { GetServerSideProps } from 'next';
import { createClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';
import { PostProps } from './types/PostProps';
import Head from 'next/head';
import styles from './post.module.scss';
import { getSession } from 'next-auth/react';

const Post = ({ post, messageError }: PostProps) => {
  return (
    <>
      <Head>
        <title>{post.title ? `${post.title} | ig.news` : 'Post não encontrado'}</title>
      </Head>
      {messageError ? (
        <h1>{messageError}</h1>
      ) : (
        <main className={styles.container}>
          <article className={styles.post}>
            <h1>{post.title}</h1>
            <time>{post.updatedAt}</time>
            <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </main>
      )}
    </>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  if (!session.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { slug } = params;
  const client = createClient();
  let post = {};
  let messageError = '';
  try {
    const response = await client.getByUID('publication', String(slug));
    post = {
      slug: response.uid,
      title: response.data.title,
      content: RichText.asHtml(response.data.content),
      updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  } catch (error) {
    messageError = error.message;
  }

  return {
    props: {
      post,
      messageError,
    },
  };
};
