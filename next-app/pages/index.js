import Link from 'next/link';

const IndexPage = () => {
  return (
    <div>
      Main page
      <Link href="/second">Second page</Link>
    </div>
  );
};

export default IndexPage;