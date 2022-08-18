import { GetStaticPaths, GetStaticProps } from 'next';
import { createClient } from '../../../services/prismic';
import { RichText } from 'prismic-dom';
import { PostProps } from '../types/PostProps';
import Head from 'next/head';
import styles from '../post.module.scss';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const PostPreview = ({ post, messageError }: PostProps) => {
  const { data: Session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (Session && Session.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [Session, router, post]);

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
            <div
              className={`${styles.postContent} ${styles.previewContent}`}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className={styles.continueReading}>
              Wanna continue reading ?
              <Link href="/">
                <a>Subscribe now 🤗</a>
              </Link>
            </div>
          </article>
        </main>
      )}
    </>
  );
};

export default PostPreview;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const client = createClient();
  let post = {};
  let messageError = '';
  try {
    const response = await client.getByUID('publication', String(slug));
    post = {
      slug: response.uid,
      title: response.data.title,
      content: RichText.asHtml(response.data.content.splice(0, 3)),
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
    revalidate: 60 * 30, // 30 minutos,
  };
};
