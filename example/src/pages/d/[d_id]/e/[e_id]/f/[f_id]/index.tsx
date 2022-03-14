import { MainLayout } from '@shesha/reactjs';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();

  return (
    <MainLayout title={router?.asPath}>
      <h1>The route is:</h1>
      <div>
        <pre>{JSON.stringify(router, null, 2)}</pre>
      </div>
    </MainLayout>
  );
};

export default Page;
