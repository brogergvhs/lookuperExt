import Link from 'next/link';
import Layout from '@/components/Layout';

export default IndexPage = () => {
  return (
    <Layout>
      <div>
        Main page
        <Link href="/second">Second page</Link>
      </div>
    </Layout>
  );
};